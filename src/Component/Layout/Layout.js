import React, {Component} from 'react';
import Index from '../Index/Index';
import NavHeader from '../NavHeader/NavHeader';
import TreeHouse from '../TreeHouse/TreeHouse';
import PreTree from '../TreeHouse/PreTree';
import axios from 'axios';

class Layout extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: null,
            userTrees: []
        }
        this.setUser = this.setUser.bind(this);
        this.searchForTrees = this.searchForTrees.bind(this);
        this.addToUserTrees = this.addToUserTrees.bind(this);
    }

    //Keeping user in layout component to manage components
    setUser = (user) => {
        this.setState({
            loggedInUser: user
        })
        this.searchForTrees(user.email);
    }

    //Search and update userTrees
    searchForTrees = (email) => {
        axios.get('http://localhost:8080/searchForTrees', 
        {params: {userEmail: email}} )
        .then(response => {

            //Set array with found TH IDs
            const trees = response.data
            this.setState({
                userTrees: trees
            })
        })
    }

    addToUserTrees = (tree) => {
        this.setState({
            userTrees: [...this.state.userTrees, tree]
        })
    }

    render () {
        //Send user to Index by default
        let route = (<Index /> )

        //If user is logged in but has no THs
        if (this.state.loggedInUser !== null && this.state.userTrees.length === 0) {
            route = (<PreTree loggedInUser={this.state.loggedInUser} addToUserTrees={this.addToUserTrees} />)
        }

        //If user is logged in and has a TH
        if (this.state.loggedInUser !== null && this.state.userTrees.length !== 0) {
            route = (<TreeHouse loggedInUser={this.state.loggedInUser} userTrees={this.state.userTrees} searchForTrees={this.searchForTrees} />)
        }

        return (
            //What's currently being displayed
            <React.Fragment>
                <NavHeader loggedInUser={this.state.loggedInUser} setUser={this.setUser} />
                {route}
            </React.Fragment>
        )
    }
}
export default Layout;
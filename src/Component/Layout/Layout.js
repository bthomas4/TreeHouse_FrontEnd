import React, {Component} from 'react';
import {Route} from 'react-router-dom';
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
    }

    //Keeping user in layout component to manage components
    setUser = (user) => {
        this.setState({
            loggedInUser: user
        })

        //See if user has any TreeHouses
        //Return treeID, genID, and maybe name
        axios.get('http:localhost:8080/searchForTrees', loggedInUser.email)
        .then(response => {

            //Set array with found TH IDs
            this.setState({
                userTrees: response.data
            })
            console.log(userTrees)
        })
    }

    render () {
        //Send user to Index by default
        let route = (<Index /> )

        //If user is logged in but has no THs
        if (this.state.loggedInUser != null && this.state.userTrees === null) {
            route = (<PreTree loggedInUser={this.state.loggedInUser} />)
        }

        //If user is logged in and has a TH
        if (this.state.loggedInUser != null && this.state.userTrees != null) {
            route = (<TreeHouse loggedInUser={this.state.loggedInUser} userTrees={this.state.userTrees} />)
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
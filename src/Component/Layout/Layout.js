import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Index from '../Index/Index';
import NavHeader from '../NavHeader/NavHeader';
import TreeHouse from '../TreeHouse/TreeHouse';
import PreTree from '../TreeHouse/PreTree';

class Layout extends Component {
    
    constructor(props) {
        super(props);
        this.state = {loggedInUser: null}
        this.setUser = this.setUser.bind(this);
    }

    //Update root components state by adding user to the layout component
    setUser = (user) => {
        this.setState({
            loggedInUser: user
        })
    }

    render () {
        // {/* <Route exact path="/" component={Index} /> */}
        let route = (<Index loggedInUser={this.state.loggedInUser} /> )

        //If user is logged in but has no TreeHouse
        // if (this.state.loggedInUser.somethingHereToCheckIfTheUserHasTreeHouses === null) {
        //     routes = (
        //         <React.Fragment>
        //             <Route exact path="/" component={PreTree} />
        //         </React.Fragment>
        //     )
        // }

        //If user is logged in and belongs to a TreeHouse
        //add logic to see if user has any THs
        if (this.state.loggedInUser != null) {
            route = (<PreTree loggedInUser={this.state.loggedInUser} />)
        }

        return (
            //This is what's currently being displayed
            <React.Fragment>
                <NavHeader loggedInUser={this.state.loggedInUser} setUser={this.setUser} />
                {route}
            </React.Fragment>
        )
    }
}
export default Layout;
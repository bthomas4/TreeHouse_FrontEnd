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
            messages: [],
            userTrees: [] }
        this.setUser = this.setUser.bind(this);
        this.getMessagesForUser = this.getMessagesForUser.bind(this);
        this.searchForTrees = this.searchForTrees.bind(this);
        this.addToUserTrees = this.addToUserTrees.bind(this);
        this.acceptTreeInvitation = this.acceptTreeInvitation.bind(this);
        this.removeMessage = this.removeMessage.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    //Logout everything
    logOut() {
        this.setState({
            loggedInUser: null,
            message: [],
            userTrees: []
        })
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

    //Get all messages for a user
    getMessagesForUser() {
        let user = null;
        if (this.state.loggedInUser !== null) {
            user = {
                email: this.state.loggedInUser.email }}

        axios.post('http://localhost:8080/getMessagesForUser', user)
        .then(response => {
            const msgs = response.data
            this.setState({
                messages: msgs
            })
        })
    }

    //Accept a invitation to a new TreeHouse
    acceptTreeInvitation = (treeID, messageID) => {
        const personTreeHouse = {
            personEmail: this.state.loggedInUser.email,
            treeHouseID: treeID }

        axios.post('http://localhost:8080/acceptInvitation', personTreeHouse)
        .then(response => {
            this.searchForTrees(this.state.loggedInUser.email);
        })
        this.removeMessage(messageID);
    }

    //Remove a message from DB and local array (decline invite/request)
    removeMessage = (messageID) => {
        axios.get('http://localhost:8080/removeMessage', {params: {id: messageID}})
        .then(response => {
            let newMsgs = [...this.state.messages];
            let index = newMsgs.findIndex(message => message.messageID === messageID);
            newMsgs.splice(index, 1);

            this.setState({
                messages: newMsgs
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
            route = (<PreTree logOut={this.logOut} removeMessage={this.removeMessage} acceptTreeInvitation={this.acceptTreeInvitation} getMessagesForUser={this.getMessagesForUser} messages={this.state.messages} loggedInUser={this.state.loggedInUser} addToUserTrees={this.addToUserTrees} />)
        }

        //If user is logged in and has a TH
        if (this.state.loggedInUser !== null && this.state.userTrees.length > 0) {
            route = (<TreeHouse logOut={this.logOut} removeMessage={this.removeMessage} acceptTreeInvitation={this.acceptTreeInvitation} getMessagesForUser={this.getMessagesForUser} messages={this.state.messages} loggedInUser={this.state.loggedInUser} userTrees={this.state.userTrees} searchForTrees={this.searchForTrees} />)
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
import React, {Component} from 'react';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import Messages from '../SideBar/Messages';
import Generations from '../Generations/Generations';
import {Modal} from 'react-bootstrap';
import MyCarousel from '../Carousel/MyCarousel';

class TreeHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            messages: [] }
        this.getMembersFromTreeHouse = this.getMembersFromTreeHouse.bind(this);
        this.getMessagesForUser = this.getMessagesForUser.bind(this);
        this.acceptTreeInvitation = this.acceptTreeInvitation.bind(this);
        this.acceptRelationRequest = this.acceptRelationRequest.bind(this);
        this.removeMessage - this.removeMessage.bind(this);
    }

    //Get all members of a TreeHouse
    getMembersFromTreeHouse = (tree) => {
        //Make a call to get all Users in the given TH
        axios.post('http://localhost:8080/getAllTreeMembers', tree)
        .then(response => {
            const members = response.data
            this.setState({
                members: members
            })
        })
    }

    //Get all messages for a user
    getMessagesForUser() {
        const user = {
            email: this.props.loggedInUser.email }

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
            personEmail: this.props.loggedInUser.email,
            treeHouseID: treeID }

        axios.post('http://localhost:8080/acceptInvitation', personTreeHouse)
        .then(response => {
            this.props.searchForTrees(this.props.loggedInUser.email);
        })
        this.removeMessage(messageID);
    }

    //Accept a relation request
    acceptRelationRequest() {
    //     axios.post('http://localhost:8080/acceptRelationRequest', SOMEOBJECTTOSEND)
    //     .then(response => {
            
    //     })
    //     //will need to recall update getMembersFromTreeHouse(pass the tree here) to show updated values;
    }

    //Decline a tree invitation
    //Decline a relation request
    //Remove a message from DB and local array
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

    //Load TH and messages
    componentDidMount() { 
        //Fetch TH members
        this.getMembersFromTreeHouse(this.props.userTrees[0])  
        
        //Load messages for the user
        this.getMessagesForUser()
    }

    render() {
        return (
            <div className="treeHouse">

                <SideBar userTrees={this.props.userTrees}  loggedInUser={this.props.loggedInUser} getMembersFromTreeHouse={this.getMembersFromTreeHouse} />,
                <Messages messages={this.state.messages} acceptTreeInvitation={this.acceptTreeInvitation} loggedInUser={this.props.loggedInUser} />,
                {/* <MyCarousel />, */}
                <Generations members={this.state.members} getMembersFromTreeHouse={this.getMembersFromTreeHouse} />
                
            </div>
        ) 
    }
}

export default TreeHouse;
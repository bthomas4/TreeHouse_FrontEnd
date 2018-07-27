import React, {Component} from 'react';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import Messages from '../SideBar/Messages';
import Generations from '../Generations/Generations';
import MyCarousel from '../Carousel/MyCarousel';

class TreeHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            messages: [],
            currentTree: '' }
        this.getMembersFromTreeHouse = this.getMembersFromTreeHouse.bind(this);
        this.getMessagesForUser = this.getMessagesForUser.bind(this);
        this.submitInvitation = this.submitInvitation.bind(this);
        this.submitRelation = this.submitRelation.bind(this);
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
                members: members,
                currentTree: tree
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

    //Submit Invitation form
    submitInvitation(inviteUserToTreeHouse) {
        axios.post('http://localhost:8080/inviteUserToTreeHouse', inviteUserToTreeHouse)
        .then(response => {
            console.log('message sent')
        })
    }

    //Submit Relation form
    submitRelation(message) {
        axios.post('http://localhost:8080/requestRelation', message)
        .then(response => {
            console.log('Message sent');
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

    //Accept a relation request
    acceptRelationRequest = (message) => {
        console.log('accept relation called');
        axios.post('http://localhost:8080/acceptRelation', message)
        .then(response => {
        })
        console.log('remove message')
        this.removeMessage(message.messageID);
        console.log('get members from tree')
        this.getMembersFromTreeHouse(this.state.currentTree);
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
                <SideBar userTrees={this.props.userTrees} loggedInUser={this.props.loggedInUser} getMembersFromTreeHouse={this.getMembersFromTreeHouse} submitInvitation={this.submitInvitation} />,
                <Messages messages={this.state.messages} acceptTreeInvitation={this.acceptTreeInvitation} acceptRelationRequest={this.acceptRelationRequest} loggedInUser={this.props.loggedInUser} removeMessage={this.removeMessage} />,
                {/* <MyCarousel />, */}
                <Generations loggedInUser={this.props.loggedInUser} submitRelation={this.submitRelation} currentTree={this.state.currentTree} members={this.state.members} />
                
            </div>
        ) 
    }
}

export default TreeHouse;
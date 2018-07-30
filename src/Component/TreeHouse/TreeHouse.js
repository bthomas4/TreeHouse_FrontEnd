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
            currentTree: '' }
        this.getMembersFromTreeHouse = this.getMembersFromTreeHouse.bind(this);
        this.submitInvitation = this.submitInvitation.bind(this);
        this.submitRelation = this.submitRelation.bind(this);
        this.acceptRelationRequest = this.acceptRelationRequest.bind(this);
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
    

    //Accept a relation request
    acceptRelationRequest = (message) => {
        axios.post('http://localhost:8080/acceptRelation', message)
        .then(response => {
            this.getMembersFromTreeHouse(this.state.currentTree);
        })
        this.props.removeMessage(message.messageID);
    }

    //Load TH and messages
    componentDidMount() { 
        //Fetch TH members
        this.getMembersFromTreeHouse(this.props.userTrees[0])  
        //Load messages for the user
        this.props.getMessagesForUser()
    }

    render() {
        return (
            <div className="treeHouse">
                <SideBar userTrees={this.props.userTrees} loggedInUser={this.props.loggedInUser} getMembersFromTreeHouse={this.getMembersFromTreeHouse} submitInvitation={this.submitInvitation} />,
                <Messages messages={this.props.messages} acceptTreeInvitation={this.props.acceptTreeInvitation} acceptRelationRequest={this.acceptRelationRequest} loggedInUser={this.props.loggedInUser} removeMessage={this.props.removeMessage} />,
                {/* <MyCarousel />, */}
                <Generations loggedInUser={this.props.loggedInUser} submitRelation={this.submitRelation} currentTree={this.state.currentTree} members={this.state.members} />
                
            </div>
        ) 
    }
}

export default TreeHouse;
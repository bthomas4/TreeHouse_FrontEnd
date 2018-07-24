import React, {Component} from 'react';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import Messages from '../SideBar/Messages';
import Generations from '../Generations/Generations';
import {Modal, Tab, Tabs} from 'react-bootstrap';
import MyCarousel from '../Carousel/MyCarousel';

class TreeHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            messages: [],
            userToPreview: null,
            openProfile: false }
        this.getMembersFromTreeHouse = this.getMembersFromTreeHouse.bind(this);
        this.getMessagesForUser = this.getMessagesForUser.bind(this);
        this.handleOpenProfile = this.handleOpenProfile.bind(this);
        this.handleCloseProfile = this.handleCloseProfile.bind(this);
        this.acceptTreeInvitation = this.acceptTreeInvitation.bind(this);
    }

    //Close a member's story
    handleCloseProfile() {
        this.setState({
            openProfile: !this.state.openProfile
        })
    }

    //Open a member's story
    handleOpenProfile = (user) => {

        //called from a Generation card View button
        //needs to load the selected person's profile info

        this.setState({
            openProfile: !this.state.openProfile,
            userToPreview: user
        })
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

                <Modal show={this.state.openProfile} onHide={this.handleCloseProfile} >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.loggedInUser.firstName}</Modal.Title>
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="TreeHouse">
                                <p>What TreeHouse aims to do</p>
                            </Tab>
                            <Tab eventKey={2} title="Tutorial">
                                <p>{this.props.loggedInUser.email}</p>
                            </Tab>
                            <Tab eventKey={3} title="Pro Tips">
                                {this.props.userTrees.map((tree, index) => {
                                    return (
                                        <p key={index}>{tree.treeHouseName}</p>
                                    )
                                })}
                            </Tab>
                        </Tabs>
                    </Modal.Header>
                </Modal>  

                <Modal show={this.state.openRelationship} onHide={this.handleCloseRelationship} >

                </Modal>
            </div>
        ) 
    }
}

export default TreeHouse;
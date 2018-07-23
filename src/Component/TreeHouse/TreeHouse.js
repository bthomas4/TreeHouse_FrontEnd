import React, {Component} from 'react';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import Generations from '../Generations/Generations';
import {Modal, Form, Button, FormControl, FormGroup, ControlLabel, Tab, Tabs} from 'react-bootstrap';
import MyCarousel from '../Carousel/MyCarousel';

class TreeHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            messages: [],
            userToPreview: null,
            openRelationship: false,
            openProfile: false }
        this.getMembersFromTreeHouse = this.getMembersFromTreeHouse.bind(this);
        this.getMessagesForUser = this.getMessagesForUser.bind(this);
        this.handleOpenProfile = this.handleOpenProfile.bind(this);
        this.handleOpenRelationship = this.handleOpenRelationship.bind(this);
        this.handleCloseProfile = this.handleCloseProfile.bind(this);
        this.handleCloseRelationship = this.handleCloseRelationship.bind(this);
    }

    handleCloseProfile() {
        this.setState({
            openProfile: !this.state.openProfile
        })
    }

    handleCloseRelationship() {
        this.setState({
            openRelationship: !this.state.openRelationship
        })
    }





    handleOpenProfile = (user) => {

        //called from a Generation card View button
        //needs to load the selected person's profile info

        this.setState({
            openProfile: !this.state.openProfile
        })
    }

    handleOpenRelationship = () => {

        //called from a gen Card button
        //open the setRelationship form modal

        this.setState({
            openRelationship: !this.state.openRelationship
        })
    }





    //Get member's of a TH
    getMembersFromTreeHouse = (tree) => {
        console.log(tree)
       
        //Make a call to get all Users in the given TH
        axios.post('http://localhost:8080/getAllTreeMembers', tree)
        .then(response => {
            const members = response.data
            this.setState({
                members: members
            })
            console.log(members);
        })
    }

    getMessagesForUser() {
        //Make axios call to get all Messages for the loggedInUser
        const user = {email: this.props.loggedInUser.email}

        axios.post('http://localhost:8080/getMessagesForUser', user)
        .then(response => {
            const msgs = response.data
            this.setState({
                messages: msgs
            })
            console.log(msgs)
        })
    }

     //Load a TreeHouse
     componentDidMount() { 
        //Fetch TH members
        // this.getMembersFromTreeHouse(this.props.userTrees[0])  
        
        //Load messages for the user
        this.getMessagesForUser()
    }

    render() {

        return (
            <div className="treeHouse">
                <SideBar userTrees={this.props.userTrees} messages={this.state.messages} loggedInUser={this.props.loggedInUser} getMembersFromTreeHouse={this.getMembersFromTreeHouse} />,
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
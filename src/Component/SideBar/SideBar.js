import React, {Component} from 'react';
import def from '../../images/defaultUserPic.png';
import {ButtonToolbar, ListGroup, ListGroupItem, Modal, Form, FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem} from 'react-bootstrap';
import axios from 'axios';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownTree: props.userTrees[0],
            invitationMenuTree: props.userTrees[0],
            openSendInvitationForm: false,
            openInvitation: false,
            openRelation: false,
            currentMessage: '',
            inviteeFirstName: '',
            inviteeLastName: '',
            inviteeEmail: '' }
        this.openSendInvitationPressed = this.openSendInvitationPressed.bind(this);
        this.handleOpenMessage = this.handleOpenMessage.bind(this);
        this.submitSendInvitation = this.submitSendInvitation.bind(this);
        this.invitationMenuItemValueChange = this.invitationMenuItemValueChange.bind(this);
        this.dropDownTreeChange - this.dropDownTreeChange.bind(this);
        this.handleCloseInvitation = this.handleCloseInvitation.bind(this);
        this.handleCloseRelation = this.handleCloseRelation.bind(this);
    }
    
    //Handle Send Invitation button
    openSendInvitationPressed() {
        this.setState({
            openSendInvitationForm: !this.state.openSendInvitationForm
        })
    }

    //Handle open Message
    handleOpenMessage = (message) => {
        this.setState({
            currentMessage: message,
        })
        if (message.subject === "Invitation") {
            this.setState({
                openInvitation: !this.state.openInvitation
            })
        }
        else if (message.subject === "Relationship") {
            this.setState({
                openRelation: !this.state.openRelation
            })
        }
    }

    //Handle close Relation
    handleCloseRelation() {
        this.setState({
            openRelation: !this.state.openRelation
        })
    }

    //Handle close Invitation
    handleCloseInvitation() {
        this.setState({
            openInvitation: !this.state.openInvitation
        })
    }

    //Func to handle submit on Send Invitation form
    submitSendInvitation = () => {
        const message = {
            subject: 'Invitation',
            treeID: this.state.invitationMenuTree.treeHouseID,
            receiver: this.state.inviteeEmail,
            sender: this.props.loggedInUser.email }

        const inviteUserToTreeHouse = {
            inviteeFirstName: this.state.inviteeFirstName,
            inviteeLastName: this.state.inviteeLastName,
            message: message }

        //axios call passing the message 
        axios.post('http://localhost:8080/inviteUserToTreeHouse', inviteUserToTreeHouse)
        .then(response => {
            console.log('message sent')
        })
    }

    //Handle change in forms
    changeFormHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    
    //Handle menuItemValueChange in Invitation form
    invitationMenuItemValueChange = (tree) => {
        //treeHouseID to search for
        this.setState({
            invitationMenuTree: tree
        })
        console.log(tree)
    }

    //Handle change in TreeHouse dropDown
    dropDownTreeChange = (tree) => {
        this.props.getMembersFromTreeHouse(tree);

        this.setState({
            dropDownTree: tree
        })
    }

    render () {
        let messageAlert = '';
        if (this.props.messages.length === 0) {
            messageAlert = 'No messages'
        }
        let invitationModal = null;
        let relationModal = null;

        if (this.props.messages !== null && this.props.messages.length > 0) {
            invitationModal =
                <Modal show={this.state.openInvitation} onHide={this.handleCloseInvitation}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sender: {this.state.currentMessage.sender}</Modal.Title>
                    </Modal.Header>
                    <div className="formBox3">
                        <p className="formFont2">You've been invited!</p>
                        <p className="space2" />
                        <h2 className="center-text">{this.state.currentMessage.treeID} Family TreeHouse</h2>
                        <div className="preTreeHeader">
                            <Button bsStyle="success" bsSize="large">Accept</Button>
                            <Button bsSize="large" bsStyle="danger">Decline</Button>
                        </div>
                    </div>
                </Modal>
        }

        if (this.props.messages !== null && this.props.messages.length > 0) {
            relationModal =
                <Modal show={this.state.openRelation} onHide={this.handleCloseRelation}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Relationship Request</Modal.Title>
                    </Modal.Header>
                    <h1>Please review this request</h1>
                    <p>{this.state.currentMessage.senderRelationToReceiver}: {this.state.currentMessage.sender}</p>
                    <p>{this.state.currentMessage.receiverRelationToSender}: {this.state.currentMessage.receiver}</p>
                    <p>TreeHouse: {this.state.currentMessage.treeID}</p>
                    <Button bsStyle="success">Accept</Button><Button bsStyle="danger">Decline</Button>
                </Modal>
        }

        return (
            <React.Fragment>
                {invitationModal}
                {relationModal}

                <div className="profileSideNav">
                    <img className="profilePic img-circle" src={def} alt="Profile" />
                    <p className="space1"/>

                    <div className="profileMenu">
                        <Button onClick={this.openSendInvitationPressed} id="sideButton" bsSize="large" bsStyle="success">Send Invitation</Button>
                        <p className="space0" />

                        <ButtonToolbar>
                            <DropdownButton onSelect={this.dropDownTreeChange} title={this.state.dropDownTree.treeHouseName} bsSize="large" id="sideButton">
                                {this.props.userTrees.map((tree, index) => {
                                    return (
                                        <MenuItem key={index} eventKey={tree}>{tree.treeHouseName}</MenuItem>
                                    )
                                })}
                            </DropdownButton>
                        </ButtonToolbar>

                        <p className="space1"/>
                    </div>


                    <div className="profileMessageContainer">
                        <ListGroup>
                            {this.props.messages.map((message, index) => {
                                return (
                                    <ListGroupItem key={index}>{message.subject}<Button onClick={() => this.handleOpenMessage(message)} bsStyle="success" bsSize="small" id="goRight">View</Button></ListGroupItem>
                                )
                            })}
                            <p className="noMsg">{messageAlert}</p>
                        </ListGroup>
                        
                    </div>
                </div>

                <Modal show={this.state.openSendInvitationForm} onHide={this.openSendInvitationPressed} >
                    <Modal.Header closeButton>
                        <Modal.Title>Send Invitation</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={this.submitSendInvitation} className="formBox1">
                        <p className="formFont">Select a TreeHouse:</p>
                        <p className="space1"/>   

                        <DropdownButton onSelect={this.invitationMenuItemValueChange} title={this.state.invitationMenuTree.treeHouseName} id="dropdown-size-large" bsSize="large" >
                            {this.props.userTrees.map((tree, index) => {
                                return (
                                    <MenuItem key={index} eventKey={tree}>{tree.treeHouseName}</MenuItem>
                                )
                            })}
                        </DropdownButton>  

                        <p className="space3"/>
                        <p className="formFont">Who is being invited to this tree?</p>
                        <p className="space1"/>
                        <FormGroup controlId="formInlineName">
                            <ControlLabel>First Name</ControlLabel>{' '}
                            <FormControl name="inviteeFirstName" value={this.state.inviteeFirstName} onChange={this.changeFormHandler} type="text"/>
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineName">
                            <ControlLabel>Last Name</ControlLabel>{' '}
                            <FormControl name="inviteeLastName" value={this.state.inviteeLastName} onChange={this.changeFormHandler} type="text"/>
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineEmail">
                            <ControlLabel>Email</ControlLabel>{' '}
                            <FormControl name="inviteeEmail" value={this.state.inviteeEmail} onChange={this.changeFormHandler} type="text"/>
                        </FormGroup>{' '}
                        <p className="space3"/>
                        <Button type="submit" className="btn-block btn-lg" bsStyle="success">Send Invitation</Button>
                    </Form>
                </Modal>
            </React.Fragment>
        )
    }
}
export default SideBar;
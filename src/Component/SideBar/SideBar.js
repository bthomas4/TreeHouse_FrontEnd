import React, {Component} from 'react';
import def from '../../images/defaultUserPic.png';
import {ButtonToolbar, Modal, Form, FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem} from 'react-bootstrap';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownTree: props.userTrees[0],
            invitationMenuTree: props.userTrees[0],
            openSendInvitationForm: false,
            inviteeFirstName: '',
            inviteeLastName: '',
            inviteeEmail: '' }
        this.openInvitationPressed = this.openInvitationPressed.bind(this);
        this.handleSubmitInvitation = this.handleSubmitInvitation.bind(this);
        this.changeFormHandler = this.changeFormHandler.bind(this);
        this.invitationMenuItemValueChange = this.invitationMenuItemValueChange.bind(this);
        this.dropDownTreeChange - this.dropDownTreeChange.bind(this);
    }
    
    //Handle Send Invitation button
    openInvitationPressed() {
        this.setState({
            openSendInvitationForm: !this.state.openSendInvitationForm
        })
    }


    //Handle submit Invitation form
    handleSubmitInvitation = (event) => {
        event.preventDefault();
        const message = {
            subject: 'Invitation',
            treeID: this.state.invitationMenuTree.treeHouseID,
            receiver: this.state.inviteeEmail,
            sender: this.props.loggedInUser.email }

        const inviteUserToTreeHouse = {
            inviteeFirstName: this.state.inviteeFirstName,
            inviteeLastName: this.state.inviteeLastName,
            message: message }

        this.props.submitInvitation(inviteUserToTreeHouse);
        this.openInvitationPressed();
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
    }

    //Handle change in TreeHouse dropDown
    dropDownTreeChange = (tree) => {
        this.props.getMembersFromTreeHouse(tree);
        this.setState({
            dropDownTree: tree
        })
    }

    render () {
        return (
            <React.Fragment>
                <div className="profileSideNav">
                    <img className="profilePic img-circle" src={def} alt="Profile" />
                    <p className="space0"></p>
                    <div className="profileMenu">
                        <ButtonToolbar>
                            <DropdownButton onSelect={this.dropDownTreeChange} title={this.state.dropDownTree.treeHouseName} bsSize="large" id="sideButton">
                                {this.props.userTrees.map((tree, index) => {
                                    return (
                                        <MenuItem key={index} eventKey={tree}>{tree.treeHouseName}</MenuItem>
                                    )
                                })}
                            </DropdownButton>
                        </ButtonToolbar>
                        <p className="space1" />
                        <Button onClick={this.openInvitationPressed} id="sideButton" bsSize="large" bsStyle="success">Send Invitation</Button>
                        <p className="space1"/>
                    </div>
                </div>

                <Modal show={this.state.openSendInvitationForm} onHide={this.openInvitationPressed} >
                    <Modal.Header closeButton>
                        <Modal.Title>Send Invitation</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={this.handleSubmitInvitation} className="formBox1">
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
import React, {Component, Fragment} from 'react';
import pic1 from '../../images/profile.jpg';
import {ButtonToolbar, ListGroup, ListGroupItem, Modal, Form, FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem} from 'react-bootstrap';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invitationMenuValue: "Select A Tree",
            openSendInvitationForm: false,
            inviteeFirstName: '',
            inviteeLastName: '',
            inviteeEmail: '',
            selectedTree: null
        }
        this.openSendInvitationPressed = this.openSendInvitationPressed.bind(this);
        this.submitSendInvitation = this.submitSendInvitation.bind(this);
        this.invitationMenuItemValueChange = this.invitationMenuItemValueChange.bind(this);
    }
    
    //Handle Send Invitation button
    openSendInvitationPressed = (event) => {
        event.preventDefault();
        this.setState({
            openSendInvitationForm: !this.state.openSendInvitationForm
        })
    }

    //Func to handle submit on Send Invitation form
    submitSendInvitation = (event) => {
        alert('submit button works')
    }

    //Handle change in forms
    changeFormHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
/////////////////////////////////////////////////////////////////
    
    //Handle menuItemValueChange in Invitation form
    invitationMenuItemValueChange = (value) => {
        this.setState({
            invitationMenuValue: value
        })
    }

/* ///////////////////////////////////////////////////////////////// */

    testIt = (event) => {
        alert('it worked')
    }
    
    render () {
        return (
            <React.Fragment>
                <div className="profileSideNav">
                    <img className="profilePic img-circle" src={pic1} alt="Profile Picture" />
                    <p className="space1"/>

                    <div className="profileMenu">
                        {/* Put a button here to invite people to a TH */}
                        <Button onClick={this.openSendInvitationPressed} id="sideButton" bsSize="large" bsStyle="success">Send Invitation</Button>
                        <p className="space0" />
                        <ButtonToolbar>
                            <DropdownButton bsSize="large" title="TreeHouses" id="dropdown-size-default">
                                    {/* Run a for loop here for all TreeHouses a user is in */}
                                    <MenuItem eventKey="1">TreeHouse 1</MenuItem>
                                    <MenuItem eventKey="2">TreeHouse 2</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="4">Profile or Msgs</MenuItem>
                            </DropdownButton>
                        </ButtonToolbar>
                        <p className="space1"/>
                    </div>

                    <div className="profileMessageContainer">
                        <ListGroup>
                            {/* loop to get these after testing */}
                            <ListGroupItem onClick={this.testIt}>Item 1</ListGroupItem>
                            <ListGroupItem>Item 2</ListGroupItem>
                            <ListGroupItem>Item 3</ListGroupItem>
                            <ListGroupItem>Item 4</ListGroupItem>
                            <ListGroupItem>Item 5</ListGroupItem>
                            <ListGroupItem>Item 6</ListGroupItem>
                            <ListGroupItem>Item 7</ListGroupItem>
                            <ListGroupItem>Item 8</ListGroupItem>
                            <ListGroupItem>Item 9</ListGroupItem>
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
                        <DropdownButton onSelect={this.invitationMenuItemValueChange} value={this.state.invitationMenuValue} name="invitationMenuValue" title={this.state.invitationMenuValue} id="dropdown-size-large" bsSize="large" >
                                {/* Run a for loop here for all TreeHouses a user has */}
                                <MenuItem eventKey="Test">Sample 1</MenuItem>
                                <MenuItem eventKey="Sample 2">Sample 2</MenuItem>
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
import React, {Component} from 'react';
import def from '../../images/defaultUserPic.png';
import {ButtonToolbar, ListGroup, ListGroupItem, Modal, Form, FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem} from 'react-bootstrap';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownTree: props.userTrees[0],
            invitationMenuTree: props.userTrees[0],
            openSendInvitationForm: false,
            inviteeFirstName: '',
            inviteeLastName: '',
            inviteeEmail: '',
            selectedTree: null }
        this.openSendInvitationPressed = this.openSendInvitationPressed.bind(this);
        this.submitSendInvitation = this.submitSendInvitation.bind(this);
        this.invitationMenuItemValueChange = this.invitationMenuItemValueChange.bind(this);
        this.dropDownTreeChange - this.dropDownTreeChange.bind(this);
    }
    
    //Handle Send Invitation button
    openSendInvitationPressed = () => {
        this.setState({
            openSendInvitationForm: !this.state.openSendInvitationForm
        })
    }

    //Func to handle submit on Send Invitation form
    submitSendInvitation = () => {
        //Need to get and submit the treeID from invitationMenuTree
        //This needs to create a new Message
        alert('submit Invitation button works')
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
        return (
            <React.Fragment>
                <div className="profileSideNav">
                    <img className="profilePic img-circle" src={def} alt="Profile" />
                    <p className="space1"/>

                    <div className="profileMenu">
                        <Button onClick={this.openSendInvitationPressed} id="sideButton" bsSize="large" bsStyle="success">Send Invitation</Button>
                        <p className="space0" />

                        <ButtonToolbar>
                            <DropdownButton onSelect={this.dropDownTreeChange} title={this.state.dropDownTree.treeHouseName} bsSize="large" id="dropdown-size-default">
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
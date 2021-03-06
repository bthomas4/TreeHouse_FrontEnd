import React, {Component} from 'react';
import {Button, Modal, ListGroup, ListGroupItem} from 'react-bootstrap';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMessage: null,
            openInvitation: false,
            openRelation: false }
        this.handleOpenMessage = this.handleOpenMessage.bind(this);
        this.handleCloseInvitation = this.handleCloseInvitation.bind(this);
        this.handleCloseRelation = this.handleCloseRelation.bind(this);
        this.handleAcceptRelation = this.handleAcceptRelation.bind(this);
        this.handleAcceptInvitation = this.handleAcceptInvitation.bind(this);
        this.declineInvitation = this.declineInvitation.bind(this);
        this.declineRelation = this.declineRelation.bind(this);
    }

    //Handle open Message
    handleOpenMessage = (message) => {
        this.setState({
            currentMessage: message,
        })
        console.log(message);
        if (message.subject === "Invitation") {
            this.setState({
                openInvitation: !this.state.openInvitation
            })
        }
        else if (message.subject === "Relation") {
            this.setState({
                openRelation: !this.state.openRelation
            })
        }
    }

    //Close Relation modal
    handleCloseRelation() {
        this.setState({
            openRelation: !this.state.openRelation
        })
    }

    //Handle close Invitation modal
    handleCloseInvitation() {
        this.setState({
            openInvitation: !this.state.openInvitation
        })
    }
    
    //Accept a Relation Request
    handleAcceptRelation = (event) => {
        event.preventDefault();
        const message = {
            messageID: this.state.currentMessage.messageID,
            treeID: this.state.currentMessage.treeHouse.treeHouseID,
            receiver: this.state.currentMessage.receiverPerson.email,
            sender: this.state.currentMessage.senderPerson.email,
            receiverRelationToSender: this.state.currentMessage.receiverRelationToSender,
            senderRelationToReceiver: this.state.currentMessage.senderRelationToReceiver,
            biologicalPerson: this.state.currentMessage.biologicalPerson }
        
        this.props.acceptRelationRequest(message);
        this.handleCloseRelation();
    }

    //Handle accept an invitation
    handleAcceptInvitation() {
        this.props.acceptTreeInvitation(this.state.currentMessage.treeID, this.state.currentMessage.messageID);
        this.handleCloseInvitation();
    }

    //Decline Invitation
    declineInvitation() {
        this.props.removeMessage(this.state.currentMessage.messageID);
        this.handleCloseInvitation();
    }

    //Decline Relation
    declineRelation() {
        this.props.removeMessage(this.state.currentMessage.messageID);
        this.handleCloseRelation();
    }
    
    render() {
        let messageAlert = '';
        let invitationModal = null;
        let relationModal = null;

        if (this.props.messages.length === 0) {
            messageAlert = 'No messages'
        }

    //Message modals to accept or decline requests
        if (this.props.messages !== null && this.props.messages.length > 0 && this.state.currentMessage !== null) {
            invitationModal =
                <Modal show={this.state.openInvitation} onHide={this.handleCloseInvitation}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sender: {this.state.currentMessage.senderPerson.firstName} {this.state.currentMessage.senderPerson.lastName} </Modal.Title>                    
                    </Modal.Header>
                    <div className="formBox3">
                        <p className="formFont2">You've been invited!</p>
                        <p className="space2"/>
                        <h2 className="center-text">{this.state.currentMessage.treeHouse.treeHouseName} TreeHouse</h2>
                        <div className="preTreeHeader">
                            <Button onClick={this.handleAcceptInvitation} bsStyle="success" bsSize="large">Accept</Button>
                            <Button onClick={this.declineInvitation} bsSize="large" bsStyle="danger">Delete</Button>
                        </div>
                    </div>
                </Modal>
        }   
        else {
            invitationModal = null;
        }

        if (this.props.messages !== null && this.props.messages.length > 0 && this.state.currentMessage !== null) {
            relationModal =
                <Modal show={this.state.openRelation} onHide={this.handleCloseRelation}>
                    <Modal.Header closeButton>
                        <Modal.Title>Relation Request</Modal.Title>
                    </Modal.Header>
                    <div className="formBox3">
                        <p className="formFont2">Review the following relation:</p>
                        <p className="space2"/>
                        <div className="leftAlign">
                            <h3>{this.state.currentMessage.senderRelationToReceiver}: {this.state.currentMessage.senderPerson.firstName}</h3>
                            <h3>{this.state.currentMessage.receiverRelationToSender}: {this.state.currentMessage.receiverPerson.firstName}</h3>
                            <h3>TreeHouse: {this.state.currentMessage.treeHouse.treeHouseName}</h3>
                        </div>

                        <div className="preTreeHeader">
                            <Button onClick={this.handleAcceptRelation} bsSize="large" bsStyle="success">Approve</Button>
                            <Button onClick={this.declineRelation} bsSize="large" bsStyle="danger">Delete</Button>
                        </div>
                    </div>

                </Modal>
        }
        else {
            relationModal = null;
        }

        return (
            <React.Fragment>
                {invitationModal}
                {relationModal}
                <div className="profileMessageContainer">
                    <ListGroup>
                        {this.props.messages.map((message, index) => {
                            return (
                                <ListGroupItem key={index}>{message.senderPerson.firstName}<Button onClick={() => this.handleOpenMessage(message)} bsStyle="default" bsSize="small" id="msgButton">View</Button></ListGroupItem>
                            )
                        })}
                    </ListGroup>
                    <p className="noMsg">{messageAlert}</p>
                </div> 
            </React.Fragment>
        )
    }
}
export default Messages;
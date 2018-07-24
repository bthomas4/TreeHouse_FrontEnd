import React, {Component} from 'react';
import {Button, Modal, ListGroup, ListGroupItem} from 'react-bootstrap';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMessage: '',
            openInvitation: false,
            openRelation: false }
        this.handleOpenMessage = this.handleOpenMessage.bind(this);
        this.handleCloseInvitation = this.handleCloseInvitation.bind(this);
        this.handleCloseRelation = this.handleCloseRelation.bind(this);
        this.handleAcceptInvitation = this.handleAcceptInvitation.bind(this);
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

    //Handle close Relation modal
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

    //Handle accept an invitation
    handleAcceptInvitation() {
        this.props.acceptTreeInvitation(this.state.currentMessage.treeID, this.state.currentMessage.messageID);
        this.handleCloseInvitation();
    }

    render() {
        let messageAlert = '';
        let invitationModal = null;
        let relationModal = null;

        if (this.props.messages.length === 0) {
            messageAlert = 'No messages'
        }

        if (this.props.messages !== null && this.props.messages.length > 0) {
            invitationModal =
                <Modal show={this.state.openInvitation} onHide={this.handleCloseInvitation}>
                    <Modal.Header closeButton>

        {/* not sure why I can't get the value of an object attribute */}
                        {/* <Modal.Title>Sender: {this.state.currentMessage.senderPerson.firstName} {this.state.currentMessage.sender} </Modal.Title> */}
                    
                    </Modal.Header>
                    <div className="formBox3">
                        <p className="formFont2">You've been invited!</p>
                        <p className="space2" />
                        <h2 className="center-text">{this.state.currentMessage.treeID} Family TreeHouse</h2>
                        <div className="preTreeHeader">
                            <Button onClick={this.handleAcceptInvitation} bsStyle="success" bsSize="large">Accept</Button>
                            <Button bsSize="large" bsStyle="danger">Decline</Button>
                        </div>
                    </div>
                </Modal>
        }
        else {
            invitationModal = null;
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
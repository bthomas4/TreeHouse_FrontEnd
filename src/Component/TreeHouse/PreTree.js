import React, {Component} from 'react';
import {Alert, Button, Form, FormGroup, FormControl, ControlLabel, Modal} from 'react-bootstrap';
import axios from 'axios';
import Generations from '../Generations/Generations';

class PreTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openCreateForm: false,
            openFindForm: false,
            createTreeName: '',
            findTreeName: '',
            findFirstName: '',
            findLastName: '',
            findEmail: '' }
        this.createTreeButtonPressed = this.createTreeButtonPressed.bind(this);
        this.findTreeButtonPressed = this.findTreeButtonPressed.bind(this);
        this.submitCreateATree = this.submitCreateATree.bind(this);
        this.submitFindATree = this.submitFindATree.bind(this);
    }

    //Handle Create A Tree button
    createTreeButtonPressed = (event) => {
        this.setState({
            openCreateForm: !this.state.openCreateForm
        })
    }

    //Handle Find A Tree button
    findTreeButtonPressed = (event) => {
        this.setState({
            openFindForm: !this.state.openFindForm
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

    //Func to handle submit on Create A Tree form
    submitCreateATree = (event) => {
        event.preventDefault();
        const user = this.props.loggedInUser;
        const newTreeHouse = {
            user: user,
            treeHouseName: this.state.createTreeName }

        axios.post('http://localhost:8080/createNewTreeHouse', newTreeHouse)
        .then(response => {
            console.log('Tree was created');
            })
        .catch(error => {
            console.log('There was an error')})
        
        this.setState({
            openCreateForm: !this.state.openCreateForm
        })
        this.props.addToUserTrees(newTreeHouse);
    }

    //Func to handle submit on Find A Tree form
    submitFindATree = (event) => {
        event.preventDefault();

        //axios call to back end here

        this.setState({
            openFindForm: !this.state.openFindForm
        })
    }


    render() {
        return (
            <React.Fragment>
                <div className="preTree">
                    <Alert bsStyle="warning" id="center">Looks like you don't have a TreeHouse yet!</Alert>
                    <div className="preTreeHeader">
                        <Button onClick={this.createTreeButtonPressed} bsSize="large" id="aboutText">Create A Tree</Button>
                        <Button onClick={this.findTreeButtonPressed} bsSize="large" bsStyle="success">Find A Tree</Button>
                    </div>
                </div>


                <Modal show={this.state.openCreateForm} onHide={this.createTreeButtonPressed}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create A Tree</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={this.submitCreateATree} className="formBox1">
                        <p className="formFont">Give your tree a name!</p>
                        <p className="space1"/>
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>TreeHouse Name</ControlLabel>
                            <FormControl name="createTreeName" value={this.state.createTreeName} onChange={this.changeFormHandler} type="text"/>
                        </FormGroup>
                        <p className="space3"/>
                        <Button type="submit" className="btn-block btn-lg" bsStyle="success">Create Tree</Button>
                    </Form>
                </Modal>


                <Modal show={this.state.openFindForm} onHide={this.findTreeButtonPressed}>
                    <Modal.Header closeButton>
                        <Modal.Title>Find A Tree</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={this.submitFindATree} className="formBox1">
                        <p className="formFont">What tree are you looking for?</p>
                        <p className="space1"/>
                        <FormGroup controlId="formInlineName">
                            <ControlLabel>TreeHouse Name</ControlLabel>{' '}
                            <FormControl name="findTreeName" value={this.state.findTreeName} onChange={this.changeFormHandler} type="text"/>
                        </FormGroup>{' '}
                        <p className="space3"/>
                        <p className="formFont">Who do you know in this tree?</p>
                        <p className="space1"/>
                        <FormGroup controlId="formInlineName">
                            <ControlLabel>First Name</ControlLabel>{' '}
                            <FormControl name="findFirstName" value={this.state.findFirstName} onChange={this.changeFormHandler} type="text"/>
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineName">
                            <ControlLabel>Last Name</ControlLabel>{' '}
                            <FormControl name="findLastName" value={this.state.findLastName} onChange={this.changeFormHandler} type="text"/>
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineEmail">
                            <ControlLabel>Email</ControlLabel>{' '}
                            <FormControl name="findEmail" value={this.state.findEmail} onChange={this.changeFormHandler} type="text"/>
                        </FormGroup>{' '}
                        <p className="space3"/>
                        <Button type="submit" className="btn-block btn-lg" bsStyle="success">Send Request</Button>
                    </Form>
                </Modal>
            </React.Fragment>
        )
    }
}

export default PreTree;
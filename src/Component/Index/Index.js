import React, {Component} from 'react';
import {Modal, Button, Alert} from 'react-bootstrap';
import axios from 'axios';

class SignUp extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        } 
    }

    signUpChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    signUpSubmitHandler = (event) => {
        event.preventDefault();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        }

        axios.post('http://localhost:8080/createNewPerson', user)
        .then(response => {
            alert('User successfullly created! Please Log In');
            console.log("User was created!")})
        .catch(error => {
            alert('User not created. Email is already in use.</h2></Alert');
            console.log("There was an error.")})
    }

    render () {
        return (
            <div className="index">
            <div className="signUpForm">
                <form onSubmit={this.signUpSubmitHandler} className="signUpBox">
                    <div className="form-group">
                        <label className="signUpLabel" htmlFor="exampleInputfName"><span id="req">*</span>First Name</label>
                        <input onChange={this.signUpChangeHandler} name='firstName' value={this.state.firstName} id='exampleInputfName' type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="signUpLabel" htmlFor="exampleInputlName"><span id="req">*</span>Last Name</label>
                        <input onChange={this.signUpChangeHandler} name='lastName' value={this.state.lastName} id='exampleInputlName' type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="signUpLabel" htmlFor="exampleInputEmail1"><span id="req">*</span>Email</label>
                        <input onChange={this.signUpChangeHandler} name='email' value={this.state.email} id='exampleInputEmail1' type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="signUpLabel" htmlFor="exampleInputPassword1"><span id="req">*</span>Password</label>
                        <input onChange={this.signUpChangeHandler} name='password' value={this.state.password} id='exampleInputPassword1' type="password" className="form-control" />
                    </div>
                    <p className="space3"></p>
                    <div className="signUpButton">
                        <button type="submit" className="btn btn-success btn-lg btn-block">Sign Up</button>
                    </div>
                </form>
                <div className="aboutContainer">
                    <button type="submit" className="btn btn-default btn-lg btn-block aboutButton" id="aboutText">Take a tour</button>
                </div>
            </div>
            {/* <div className="">
                <Modal.Dialog>
                    <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>One fine body...</Modal.Body>

                    <Modal.Footer>
                    <Button>Close</Button>
                    <Button bsStyle="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
                </div>; */}
            </div>
        )
    }
}

export default SignUp;
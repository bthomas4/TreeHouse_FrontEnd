import React, {Component} from 'react';
import {Modal, Tabs, Tab, Button} from 'react-bootstrap';
import axios from 'axios';
import logo from '../../images/tree1.png';

class SignUp extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            openAboutModal: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        } 
        this.takeATourButtonPressed = this.takeATourButtonPressed.bind(this);
    }

    //Handle Take A Tour button press
    takeATourButtonPressed = (event) => {
        this.setState({
            openAboutModal: !this.state.openAboutModal
        })
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
            alert('User created! Please Log In.');
            console.log("User was created!")})
        .catch(error => {
            alert('User not created. Email is already in use.');
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
                            <Button type="submit" className="btn btn-success btn-lg btn-block">Sign Up</Button>
                        </div>
                    </form>
                    <div className="aboutContainer">
                        <Button onClick={this.takeATourButtonPressed} type="submit" className="btn btn-default btn-lg btn-block aboutButton" id="aboutText">Take a tour</Button>
                </div>
            </div>

            <Modal show={this.state.openAboutModal} onHide={this.takeATourButtonPressed}>
                <Modal.Header closeButton>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="TreeHouse">
                                <div className="aboutTree">
                                    <img className="navLogo2" src={logo} alt="" />
                                    <div className="aboutQuestions">
                                        <p className="formFont3">Your tree. Your stories.</p>
                                        <p>TreeHouse is a digital time capsule that lets family members build family trees.
                                        Here, family members can privately create and share stories about themselves and the lives they lived.
                                        The stories you choose to create will serve as an everlasting image of you that future generations will come to know.</p>
                                    </div>
                                </div>
                        </Tab>
                        <Tab eventKey={2} title="Tutorial">
                            <p>A video or tip on how everything works</p>
                        </Tab>
                        <Tab eventKey={3} title="Pro Tips">
                            <div className="aboutQuestions">
                                <p className="formFont4">Pro Tip #1:</p>
                                <h4>Record a story with a friend or family member.</h4>
                                <p className="space2"/>
                                <p className="formFont4">Pro Tip #2:</p>
                                <h4>MP3's take up less space that WAV's.</h4>
                                <p className="space2"/>
                                <p className="formFont4">Pro Tip #3:</p>
                                <h4>Do audio recordings in a studio environment.</h4>
                                <p className="space2"/>
                                <p className="formFont4">Pro Tip #4:</p>
                                <h4>Sometimes, less is more.</h4>                                
                                {/* <p>{"'"+this.state.openAboutModal+"'"}</p> */}
                            </div>
                        </Tab>
                    </Tabs>
                </Modal.Header>
            </Modal>

        </div>
        )
    }
}

export default SignUp;
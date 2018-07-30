import React, {Component} from 'react';
import axios from 'axios';
import logo from "../../images/tree1.png";
import {Button} from 'react-bootstrap';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }

    signInHandleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState ({
           [name]: value
        })
    }

    signInSubmitHandler = (event) => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:8080/login', user)
        .then(response => {
            console.log("Login successful")
            const loggedInUserFromBackEnd = response.data;
            this.props.setUser(loggedInUserFromBackEnd) })
        .catch(error => {
            console.log("Login fail");
            alert('Invalid email or password.');
        })
    }

    render = () => {

        let rightSide = null;
        let leftSide = (
            <React.Fragment>
                <img className="navLogo" src={logo} alt="" />
                <p className="navbar-brand" id="navBrand">TreeHouse</p>
            </React.Fragment>
        )

        if (this.props.loggedInUser) {
            rightSide = (
                <React.Fragment>
                    <p className="navbar-brand navbar-right" id="logInName">Welcome, {this.props.loggedInUser.firstName}!</p>
                </React.Fragment>
            )

        } else {
            rightSide = (
                <React.Fragment>
                    <form onSubmit={this.signInSubmitHandler} className="navbar-form navbar-right">
                        <table>
                            <tbody>
                            <tr className="form-group">
                                <td><input name="email" value={this.state.email} onChange={this.signInHandleChange} type="text" className="form-control logInSpacing" placeholder="Email" /></td>
                                <td><input name="password" value={this.state.password} onChange={this.signInHandleChange} type="password"  className="form-control logInSpacing" placeholder="Password" /></td>
                                <td><button className="btn btn-success logInSpacing" type="submit">Log In</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </React.Fragment>
            )
        }

        return (
        <div>
            <nav className="navbar navbar-fixed-top navHeaderContainer">
                    <div>
                        {leftSide}
                    </div>

                    <div>
                        {rightSide}
                    </div>
            </nav>
        </div>
        )
    }
}

export default Header;
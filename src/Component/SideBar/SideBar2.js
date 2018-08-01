import React, {Component} from 'react';
import {ButtonToolbar, Button, DropdownButton} from 'react-bootstrap';

class SideBar extends Component {
    render () {
        return (
            <React.Fragment>
                <div className="profileSideNav">
                <Button className="logOut" bsStyle="link" onClick={this.props.logOut}>Log Out</Button>
                    <img className="profilePic img-circle" src={this.props.loggedInUser.path} alt="Profile" />
                    <p className="space0"></p>
                    <div className="profileMenu">
                        <ButtonToolbar>
                            <DropdownButton title="No TreeHouse" bsSize="large" id="sideButton">
                            </DropdownButton>
                        </ButtonToolbar>
                        <p className="space1" />            
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default SideBar;
import React, {Component} from 'react';
import pic1 from '../../images/profile.jpg';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

class SideBar extends Component {
    render () {
        return (
                <div className="profileSideNav">
                    <img className="profilePic img-circle" src={pic1} alt="Profile Picture" />
                    <p className="space1"/>

                    <div className="profileMenu">
                        <ButtonToolbar>
                            <DropdownButton bsSize="large" title="TreeHouse 1" id="dropdown-size-large">
                                    {/* Run a for loop here for all TreeHouses a user is in */}
                                    <MenuItem eventKey="1">TreeHouse 1</MenuItem>
                                    <MenuItem eventKey="2">TreeHouse 2</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="4">Profile or Msgs</MenuItem>
                            </DropdownButton>
                        </ButtonToolbar>
                        <p className="space1"/>

                        <ol className="nav">
                        {/* Run a for loop to build messages/subjects for a TH */}
                            <li>Message 1</li>
                            <li>Message 2</li>
                            <li>Message 3</li>
                            <li>Message 4</li>
                        </ol>
                    </div>
                </div>
        )
    }
}
export default SideBar;
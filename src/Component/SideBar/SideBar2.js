import React, {Component} from 'react';
import def from '../../images/defaultUserPic.png';
import {ButtonToolbar, DropdownButton} from 'react-bootstrap';

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <React.Fragment>
                <div className="profileSideNav">
                    <img className="profilePic img-circle" src={def} alt="Profile" />
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
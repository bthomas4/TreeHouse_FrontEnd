import React, {Component} from 'react';
import defaultPic from '../../images/pic1.png';
import {DropdownButton, Form, ButtonToolbar, MenuItem, Grid, Tab, Tabs, Modal, Row, Col, Image, Button} from 'react-bootstrap';

class Generations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToPreview: '',
            storyToPreview: null,
            picturesToPreview: null,
            userToRelate: '',
            dropDownMenuValue1: 'Select',
            dropDownMenuValue2: 'Select',
            spouseDropDown: 'Select',
            openProfile: false,
            openRelation: false }
        this.handleOpenProfile = this.handleOpenProfile.bind(this);
        this.handleCloseProfile = this.handleCloseProfile.bind(this);
        this.handleCloseRelation = this.handleCloseRelation.bind(this);
        this.handleOpenRelation = this.handleOpenRelation.bind(this);
        this.dropDownMenuChange1 = this.dropDownMenuChange1.bind(this);
        this.dropDownMenuChange2 = this.dropDownMenuChange2.bind(this);
        this.spouseDropDownChange = this.spouseDropDownChange.bind(this);
        this.getStories = this.getStories.bind(this);
        this.getPictures = this.getPictures.bind(this);
    }

    //Close a member's story
    handleCloseProfile() {
        this.setState({
            openProfile: !this.state.openProfile
        })
    }

    //Open a member's story
    handleOpenProfile = (user) => {
        //axios call to get story for passed user (send user.email)
        //set storyToPreview: response.data in reponse

        this.setState({
            userToPreview: user,
            openProfile: !this.state.openProfile
        })
    }

    //Close relation request Modal
    handleCloseRelation() {
        this.setState({
            openRelation: !this.state.openRelation
        })
    }

    //Open a relation request
    handleOpenRelation = (user) => {
        this.setState({
            openRelation: !this.state.openRelation,
            userToRelate: user
        })
    }     

    //Handle change in dropdown 1 button
    dropDownMenuChange1 = (relation) => {
        this.setState({
            dropDownMenuValue1: relation
        })
    }

    //Handle change in dropdown 2 button
    dropDownMenuChange2 = (relation) => {
        this.setState({
            dropDownMenuValue2: relation
        })
    }

    //Handle change in spouse drop down
    spouseDropDownChange = (person) => {
        this.setState({
            spouseDropDown: person,
        })
    }
    
    //Submit a relation request
    submitRelationRequest = (event) => {
        event.preventDefault();
        let biologicalPerson = null;
        if (this.state.spouseDropDown === this.props.loggedInUser.firstName) {
            biologicalPerson = this.props.loggedInUser.email
        }
        else if (this.state.spouseDropDown === this.state.userToRelate.firstName) {
            biologicalPerson = this.state.userToRelate.email
        }
        const message = {
            subject: 'Relation',
            treeID: this.props.currentTree.treeHouseID,
            receiver: this.state.userToRelate.email,
            sender: this.props.loggedInUser.email,
            receiverRelationToSender: this.state.dropDownMenuValue1,
            senderRelationToReceiver: this.state.dropDownMenuValue2,
            biologicalPerson: biologicalPerson }
        this.props.submitRelation(message);
        this.handleCloseRelation();
    }

    getPictures = (user) => {
        let images = [];
        for (var i=0; i<6; i++) {
            images.push(
                <Image className="collectionPics" src={defaultPic} alt="200x200"/>);
            }
        return (
            <Row className="imageContainer">
                {images.map((image, index) => {
                    return (
                        <React.Fragment key={index}>{image}</React.Fragment>
                    )
                })}
            </Row>
        )
    }

    getStories = (user) => {
        let stories = [];
        for (var i=1; i<10; i++) {
            stories.push(<h3>{user.firstName} Story #{i}</h3>)
        }
        return (
            <Grid className="storyBox">
                {stories.map((story, index) => {
                    return (
                        <Row className="storyBlock" key={index}>{story}</Row>
                    )
                })}
            </Grid>
        )
    }

    render() {
        let rows = [];
        for(let i=0; i<this.props.members.length; i++) {
            rows.push(
                <Row className="genContainer">
                    <CreateColumns handleOpenRelation={this.handleOpenRelation} handleOpenProfile={this.handleOpenProfile} members={this.props.members[i]} />
                </Row>);
        }
        
        let relationMenu1 = 
            <ButtonToolbar>
                <DropdownButton onSelect={this.dropDownMenuChange1} title={this.state.dropDownMenuValue1} bsSize="large" id="sideButton">
                    <MenuItem eventKey={'Father'}>Father</MenuItem>
                    <MenuItem eventKey={'Mother'}>Mother</MenuItem>
                    <MenuItem eventKey={'Child'}>Child</MenuItem>
                    <MenuItem eventKey={'Spouse'}>Spouse</MenuItem>
                </DropdownButton>
            </ButtonToolbar>

        let relationMenu2 = 
            <ButtonToolbar>
                <DropdownButton onSelect={this.dropDownMenuChange2} title={this.state.dropDownMenuValue2} bsSize="large" id="sideButton">
                    <MenuItem eventKey={'Father'}>Father</MenuItem>
                    <MenuItem eventKey={'Mother'}>Mother</MenuItem>
                    <MenuItem eventKey={'Child'}>Child</MenuItem>
                    <MenuItem eventKey={'Spouse'}>Spouse</MenuItem>
                </DropdownButton>
            </ButtonToolbar>

        let spouseMenu = '';
        if (this.state.dropDownMenuValue1 === 'Spouse' || this.state.dropDownMenuValue2 === 'Spouse') {
            spouseMenu =
                <React.Fragment>
                    <h3>Biological member?</h3>
                    <p className="space1"/>
                    <ButtonToolbar>
                        <DropdownButton onSelect={this.spouseDropDownChange} title={this.state.spouseDropDown} bsSize="large" id="sideButton">
                            <MenuItem eventKey={this.state.userToRelate.firstName}>{this.state.userToRelate.firstName} {this.state.userToRelate.lastName}</MenuItem>
                            <MenuItem eventKey={this.props.loggedInUser.firstName}>{this.props.loggedInUser.firstName} {this.props.loggedInUser.lastName}</MenuItem>
                        </DropdownButton>
                    </ButtonToolbar>
                </React.Fragment>
        }

        return (
            <React.Fragment>
                <Grid>
                    {rows.map((row, index) => {
                        return <React.Fragment key={index}>{row}</React.Fragment>
                    })}
                </Grid>


                <Modal show={this.state.openProfile} onHide={this.handleCloseProfile} >
                    <Modal.Header closeButton>
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            
                            <Tab eventKey={1} title="Summary">
                                <Image circle src={this.state.userToPreview.path} alt="200x200" className="viewPic" />
                                <h4>{this.state.userToPreview.firstName} {this.state.userToPreview.lastName}</h4>
                                <p>A text summary about whatever a person wishes to add. This person 
                                    grew up here and perhaps did some other stuff in these locations, 
                                    which could eventually link pictures via geolocations to Google maps
                                    to show exactly where people did things. 
                                </p>
                            </Tab>

                            <Tab eventKey={2} title="Stories">
                                {this.getStories(this.state.userToPreview)}
                                {/* map storyToPreview */}
                            </Tab>

                            <Tab eventKey={3} title="Pictures">
                                {this.getPictures(this.state.userToPreview)}
                                {/* map picturesToPreview */}
                                {/* try to put inside a horizontal scroll???? */}
                                {/* {this.props.members.map((member, index) => {
                                    return (
                                        <p key={index}>{member.firstName}</p>
                                    )
                                })} */}
                            </Tab>
                        </Tabs>
                    </Modal.Header>
                </Modal>  


                <Modal show={this.state.openRelation} onHide={this.handleCloseRelation} >
                    <Modal.Header closeButton>
                        <Modal.Title>Set Relation</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={this.submitRelationRequest} className="formBox4">
                        <h3>You</h3>
                        <p className="space1"/>   
                        {relationMenu2}

                        <h3>{this.state.userToRelate.firstName} {this.state.userToRelate.lastName}</h3>
                        <p className="space1"/>   
                        {relationMenu1}
                        
                        {spouseMenu}
                        <p className="space3"/>
                        <Button type="submit" bsSize="large" bsStyle="success">Send Request</Button>
                    </Form>
                </Modal>
            </React.Fragment>
        )
    }
}

const CreateColumns = (props) => {
    const members = props.members;
    return ( 
        members.map((member) => {
            return (
                <Col key={member.email} xs={2} md={3} className="genCards">
                    <Image circle src={member.path} alt="200x200" className="genPics" />
                    <h3>{member.firstName} {member.lastName}</h3>
                    <p>
                    <Button onClick={() => props.handleOpenProfile(member)} bsStyle="success">View</Button>&nbsp;
                    <Button onClick={() => props.handleOpenRelation(member)} bsStyle="default">Relate</Button>
                    </p>
                </Col>
                )}
            )   
        )
    }

export default Generations;
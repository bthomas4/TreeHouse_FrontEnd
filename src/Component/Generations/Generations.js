import React, {Component} from 'react';
import defaultPic from '../../images/defaultUserPic.png';
import {Grid, Tab, Tabs, Modal, Row, Col, Image, Button} from 'react-bootstrap';

class Generations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userToPreview: '',
            storyToPreview: null,
            picturesToPreview: null,
            userToRelate: '',
            openProfile: false,
            openRelation: false }
        this.handleOpenProfile = this.handleOpenProfile.bind(this);
        this.handleCloseProfile = this.handleCloseProfile.bind(this);
        this.handleCloseRelation = this.handleCloseRelation.bind(this);
        this.handleOpenRelation = this.handleOpenRelation.bind(this);
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

    render() {
        let rows = [];
        for(let i=0; i<this.props.members.length; i++){
            rows.push(
                <Row className="genContainer">
                    <CreateColumns handleOpenRelation={this.handleOpenRelation} handleOpenProfile={this.handleOpenProfile} members={this.props.members[i]} />
                </Row>);
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
                        <Modal.Title>{this.state.userToPreview.firstName}</Modal.Title>
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Overview">
                                <p>A text summary about whatever a person wishes to add.</p>
                            </Tab>
                            <Tab eventKey={2} title="Stories">
                
                {/* map storyToPreview */}
                                <p>{this.state.userToPreview.email}</p>
                            </Tab>
                            <Tab eventKey={3} title="Pictures">
                                            
                {/* map picturesToPreview */}
                {/* try to put inside a horizontal scroll???? */}
                                {this.props.members.map((member, index) => {
                                    return (
                                        <p key={index}>{member.firstName}</p>
                                    )
                                })}
                            </Tab>
                        </Tabs>
                    </Modal.Header>
                </Modal>  

                <Modal show={this.state.openRelation} onHide={this.handleCloseRelation} >
                    <Modal.Header closeButton>
                                <Modal.Title>Set Relation</Modal.Title>
                    </Modal.Header>
                    <div className="formBox3">
                        <p>{this.state.userToRelate.firstName} {this.state.userToRelate.lastName}</p>
                        <p>A dropdown to pick a relation name</p>
                        <p>You</p>
                        <p>Another dropdown to set your relation</p>
                    </div>
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
                    <Image circle src={defaultPic} alt="200x200" className="genPics" />
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
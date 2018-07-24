import React, {Component} from 'react';
import defaultPic from '../../images/defaultUserPic.png';
import {Grid, Row, Col, Image, Button} from 'react-bootstrap';

class Generations extends Component {

    render() {
        let rows = [];
        for(let i=0; i<this.props.members.length; i++){
            rows.push(
                <Row className="genContainer">
                    <CreateColumns members={this.props.members[i]} />
                </Row>);
        }

        return (
            <Grid>
                {rows.map((row, index) => {
                    return <React.Fragment key={index}>{row}</React.Fragment>
                })}
            </Grid>
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
                    <Button bsStyle="success">View</Button>&nbsp;
                    <Button bsStyle="default">Trace</Button>
                    </p>
                </Col>
                )}
            )   
        )
    }

export default Generations;
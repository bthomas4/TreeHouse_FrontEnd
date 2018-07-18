import React, {Component} from 'react';
import defaultPic from '../../images/defaultUserPic.png';
import {Grid, Row, Col, Image, Button} from 'react-bootstrap';

class Generations extends Component {
    constructor(props) {
        super(props);
        this.state = {allGens: []};
    }

    // componentDidMount() {
    //   get # of generations to make
    //   maybe sort by genID
    // }

    // createRow = (props) => {
    //     return (
    //         <Row className="genContainer">
    //             <CreateColumns members={props.members} />
    //         </Row>
    //     )
    // }

    // test = (props) => {
    //     let rows = [];
    //     for(let x = 1; x < 4; x++) {
    //         rows.push (<this.createRow members={props.members} />)
    //     }
    //     return (
    //         <span>
    //             {rows.map((index) => {
    //                 return (
    //                     <this.createRow key={index} members={props.members} />
    //                 )
    //             })}
    //         </span>
    //     );
    // }

    render() {
        let rows= [];
        for(let i=0; i<this.props.members; i++){
            rows.push(
                <Row className="genContainer">
                    <createColumns members={this.props.members[i]} />
                </Row>);
        }

        return (
            <Grid>
                {rows.map((row, index) => {
                    return <React.Fragment key={index}>{row}</React.Fragment>
                })}
                {/* <this.test members={this.props.members} /> */}
            </Grid>
        )
    }
}

const createColumns = (props) => {
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
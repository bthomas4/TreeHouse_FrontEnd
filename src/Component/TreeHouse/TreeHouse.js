import React, {Component} from 'react';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import Generations from '../Generations/Generations';
import MyCarousel from '../Carousel/MyCarousel';

class TreeHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {treeHouse: null, members: []}
    }

    //Get member's of a TreeHouse
    componentDidMount() {
        
        //Set current TH
        this.setState({
            treeHouse: this.props.userTrees[0]
        })

        //Make a call to get all Users in the TH at userTree[0]
        //Change to a POST
        axios.get('http://localhost:8080/getAllUsers', this.props.userTrees[0])
        .then(response => {
            this.setState({
                members: response.data
            })
            console.log(this.state.members);
        })
    }

    render() {
        let routes = [
            <SideBar loggedInUser={this.props.loggedInUser}/>,
            <MyCarousel />,
            <Generations members={this.state.members} />
        ];

        return (
            <div className="treeHouse">
                {routes}
            </div>
        )
    }
}

export default TreeHouse;
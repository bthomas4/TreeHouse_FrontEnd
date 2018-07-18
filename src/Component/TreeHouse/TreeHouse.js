import React, {Component} from 'react';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import Generations from '../Generations/Generations';
import MyCarousel from '../Carousel/MyCarousel';
import PreTree from './PreTree';

class TreeHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {treeHouse: null, members: []}
    }

    //Change call to only get member's of a certain treeHouse
    componentDidMount() {
        axios.get('http://localhost:8080/getAllUsers')
        .then(response => {
            this.setState({
                members: response.data
            })
            console.log(this.state.members);
        })
    }

    render() {
        let routes = [
            <SideBar />,
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
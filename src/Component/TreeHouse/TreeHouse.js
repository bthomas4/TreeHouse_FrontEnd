import React, {Component} from 'react';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import Generations from '../Generations/Generations';
import MyCarousel from '../Carousel/MyCarousel';

class TreeHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeHouse: null,
            members: [] }
        this.getMembersFromTreeHouse = this.getMembersFromTreeHouse.bind(this);
    }

    //Load a TreeHouse
    componentDidMount() { 
        //Set current TH
        this.setState({
            treeHouse: this.props.userTrees[0]
        })

        //Fetch TH members
        this.getMembersFromTreeHouse(this.props.userTrees[0].treeHouseID)       
    }

    //Get member's of a TH
    //Should be called by chagne in dropdown button in sidebar
    getMembersFromTreeHouse = (treeID) => {

        //Make a call to get all Users in the given TH
        axios.get('http://localhost:8080/getAllTreeMembers', 
        {params: {treeID: treeID}})
        .then(response => {
            
            const members = response.data
            this.setState({
                members: members
            })
            console.log(members);
        })
    }

    render() {
        let components = [
            <SideBar userTrees={this.props.userTrees} loggedInUser={this.props.loggedInUser}/>,
            // <MyCarousel />,
            <Generations members={this.state.members} />
        ];

        return (
            <div className="treeHouse">
                {components}
            </div>
        )
    }
}

export default TreeHouse;
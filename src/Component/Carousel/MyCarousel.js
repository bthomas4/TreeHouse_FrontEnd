import React, {Component} from 'react';
import {Carousel, Image} from 'react-bootstrap';
import pic1 from '../../images/pic1.png';
import pic2 from '../../images/pic2.png';

class MyCarousel extends Component {
    getAllCarouselItems = (props) => {
        return (
            props.scrapbookImages.map((image, index) => {
                <Carousel.Item key={index}>
                    <Image src={image} width={450} height={300} />
                </Carousel.Item>
            })
        )
    }

    render() {
        return (
            <div className="carouselContainer">
                <Carousel className="carousel">       
                    {/* {this.getAllCarouselItems()}  */}
                </Carousel>
            </div>
        )
    }
}

export default MyCarousel;
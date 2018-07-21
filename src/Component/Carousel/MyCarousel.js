import React, {Component} from 'react';
import {Carousel, Image} from 'react-bootstrap';

class MyCarousel extends Component {
    getAllCarouselItems = (props) => {
        return (
            props.scrapbookImages.map((image, index) => {
                return (
                    <Carousel.Item key={index}>
                        <Image src={image} width={450} height={300} />
                    </Carousel.Item>
                )
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
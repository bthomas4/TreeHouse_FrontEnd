import React from 'react';

const AllImages = (props) => {
    return (
        props.scrapbookImages.map( (image, index) => 
            <div key={index} className="card center-stuff">
                <ol className="list-group list-group-flush">
                    <li className="list-group-item">{image.path}</li>
                    <li className="list-group-item">{image.description}</li>
                </ol>
            </div>
        )
    )
}
export default AllImages;
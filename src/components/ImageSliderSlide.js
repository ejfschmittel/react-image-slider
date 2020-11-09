import React from 'react'


const ImageSlide = ({width, image}) => {
    return (
         <div 
            className="image-slider__slide"
            style={{
                width: `${width}px`,
                backgroundImage: `url("${image}")`
            }}
            >
            </div>
    )
}

export default ImageSlide
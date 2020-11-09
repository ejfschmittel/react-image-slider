  
import React, {useState, useEffect, useRef} from 'react'
import "../styles/slider.scss"


import ImageSliderContent from "./ImageSliderContent"
import ImageSliderSlide from "./ImageSliderSlide"


const ImageSlider = ({images}) => {
  

    const [state, setState] = useState({
        activeSlide: 0,
        translate: 0,
        currentSlides: [images.length-1,0,1],
    })

    return (
        <div className={`image-slider`}>
            <ImageSliderContent 
                width={800} 
                translate={state.translate} 
                slideCount={state.currentSlides.length} 
        
                >
                {   
                    state.currentSlides.map(slideIndex => {
                        return (
                           <ImageSliderSlide key={images[slideIndex] + slideIndex} width={800} image={images[slideIndex]}/>
                        )
                    })
                }
            </ImageSliderContent>
        </div>
    )
}

export default ImageSlider
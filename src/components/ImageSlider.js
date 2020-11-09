  
import React, {useState, useEffect, useRef} from 'react'
import "../styles/slider.scss"


import ImageSliderContent from "./ImageSliderContent"
import ImageSliderSlide from "./ImageSliderSlide"


const useContainerWidth = (containerRef) => {
    const [containerWidth, setContainerWidth] = useState(0); 
    const handleResize = () => {
        if(containerRef.current){
            setContainerWidth(containerRef.current.clientWidth)
        }
    }

    // recalc container width after window resize
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    // get initial container size on mount
    useEffect(() => {
        if(containerRef.current){
            setContainerWidth(containerRef.current.clientWidth)
        }
    }, [])
    return containerWidth;
};


const ImageSlider = ({images}) => {
  
    const containerRef = useRef()
    const containerWidth = useContainerWidth(containerRef)
  

    const [state, setState] = useState({
        activeSlide: 0,
        translate: containerWidth,
        currentSlides: [images.length-1,0,1],
    })

    useEffect(() => {
        setTranslateToContainerWidth();
    }, [containerWidth])

    const setTranslateToContainerWidth = () => {
        setState({
            ...state,
            translate: containerWidth
        })
    }

    return (
        <div className={`image-slider`} ref={containerRef}>
            <ImageSliderContent 
                width={containerWidth} 
                translate={state.translate} 
                slideCount={state.currentSlides.length} 
        
                >
                {   
                    state.currentSlides.map(slideIndex => {
                        return (
                           <ImageSliderSlide key={images[slideIndex] + slideIndex} width={containerWidth} image={images[slideIndex]}/>
                        )
                    })
                }
            </ImageSliderContent>
        </div>
    )
}

export default ImageSlider
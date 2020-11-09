  
import React, {useState, useEffect, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight, faArrowAltCircleLeft, faExpand, faCompress, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import ImageSliderContent from "./ImageSliderContent"
import ImageSliderSlide from "./ImageSliderSlide"

import "../styles/slider.scss"


const INPUT_QUEUE_MAX = 3;

function mod(n, m) {
    return ((n % m) + m) % m;
}

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


const ImageSlider = ({images, trasition: transtionTime}) => {
    transtionTime = transtionTime ? transtionTime : .5;

    const containerRef = useRef()
    const sliderContent = useRef()
    const containerWidth = useContainerWidth(containerRef)
  

    const [state, setState] = useState({
        activeSlide: 0,
        translate: containerWidth,
        transition: 0,
        isTransitioning: false,
        currentSlides: [images.length-1,0,1],
        inputQueue: 0,
    })

    useEffect(() => {
        setTranslateToContainerWidth();
    }, [containerWidth])

    useEffect(() => {
        if(state.inputQueue !== 0 && !state.isTransitioning){
            // start one transition (updateTranslateX)
            startSlideTransition()
        }
    }, [state])

    useEffect(() => {
        if(sliderContent.current){
             sliderContent.current.addEventListener('transitionend', onTransitionEnd)
        }
     
        return () => {    
            if(sliderContent.current){    
                sliderContent.current.removeEventListener('transitionend', onTransitionEnd)
            }
        }
    }, [state])

    const startSlideTransition = () => {
        if(state.inputQueue === 0) return

        const updateDirection = state.inputQueue > 0 ? 1 : -1;
        const nextActiveSlide = mod(state.activeSlide + updateDirection, images.length)

        const translate = state.translate + (updateDirection) * containerWidth;

        setState({
            ...state,
            activeSlide: nextActiveSlide,
            translate: translate,
            transition: transtionTime,
            isTransitioning: true,
            inputQueue: state.inputQueue - updateDirection
        })
    }

    const onTransitionEnd = () => {
        const newSlides = getSlides(state.activeSlide)

        setState({
            ...state,
            currentSlides: newSlides,
            transition: 0,
            translate: containerWidth,
            isTransitioning: false,
        })
    }

    const getSlides = (activeSlide) => {
        return [
            mod(activeSlide - 1, images.length),
            activeSlide,
            mod(activeSlide + 1, images.length),
        ]
    }

    const goToSlide = (slideIndex) => {

        const newSlides = getSlides(slideIndex)

        setState({
            ...state,
            inputQueue: 0,
            activeSlide: slideIndex,
            currentSlides: newSlides,
            translate: containerWidth,
            transition: 0,
            isTransitioning: false,
        })
    }
    

    const setTranslateToContainerWidth = () => {
        setState({
            ...state,
            translate: containerWidth
        })
    }

    const addToInputQueue = (count) => {
        if(Math.abs(state.inputQueue + count) <= INPUT_QUEUE_MAX){
            setState({...state, inputQueue: state.inputQueue + count})
        }   
    }

    const onRightArrowClick = () => addToInputQueue(1)

    const onLeftArrowClick = () => addToInputQueue(-1)

    return (
        <div className={`image-slider`} ref={containerRef}>
            <ImageSliderContent 
                width={containerWidth} 
                translate={state.translate} 
                slideCount={state.currentSlides.length} 
                transition={state.transition} 
                ref={sliderContent}
                >
                {   
                    state.currentSlides.map(slideIndex => {
                        return (
                           <ImageSliderSlide key={images[slideIndex] + slideIndex} width={containerWidth} image={images[slideIndex]}/>
                        )
                    })
                }
            </ImageSliderContent>
            <div className="image-slider__arrow image-slider__arrow--right" onClick={onRightArrowClick}>
                <FontAwesomeIcon icon={faArrowAltCircleRight} size="4x" />
            </div>
            <div className="image-slider__arrow image-slider__arrow--left" onClick={onLeftArrowClick}>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} size="4x" />
            </div>

            <SliderControls images={images} onClick={goToSlide} activeSlide={state.activeSlide}/>

        </div>
    )
}

const SliderControls = ({images, onClick, activeSlide}) => {
    return (
        <div className="image-slider__slide-controls">
            {images.length <= 10 ?
                images.map((image, index) => {
                    return (
                        <div 
                            key={`${image}-control-${index}`} 
                            className={`
                                image-slider__slide-btn
                                ${activeSlide == index && "image-slider__slide-btn--active"}
                                `}
                            onClick={(e) => onClick(index)}
                            ></div>
                    )
                })
            : null}    
        </div>
    )
}

export default ImageSlider
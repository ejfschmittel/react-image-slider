import React from 'react'


const SliderContent = React.forwardRef(({children, width, translate, slideCount, transition}, ref) => {
    return (
        <div 
            ref={ref} 
            className="image-slider__content"
            style={{
                width: `${width * slideCount}px`, 
                transform: `translateX(-${translate}px)`,
                transition: `transform ease-out ${transition}s`
            }}
            >
           {children}
        </div>
    )
})


export default SliderContent
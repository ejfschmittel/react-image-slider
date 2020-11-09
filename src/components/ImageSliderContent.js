import React from 'react'


const SliderContent = React.forwardRef(({children, width, translate, transition}, ref) => {
    return (
        <div 
            ref={ref} 
            className="image-slider__content"
            style={{
                width: `${width * 3}px`, 
                transform: `translateX(-${translate}px)`,
                transition: `transform ease-out ${transition}s`
            }}
            >
           {children}
        </div>
    )
})


export default SliderContent
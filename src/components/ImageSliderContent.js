import React from 'react'


const SliderContent = React.forwardRef(({children, width, translate}, ref) => {
    return (
        <div 
            ref={ref} 
            className="image-slider__content"
            style={{
                width: `${width * 3}px`, 
                transform: `translateX(-${translate}px)`,
            }}
            >
           {children}
        </div>
    )
})


export default SliderContent
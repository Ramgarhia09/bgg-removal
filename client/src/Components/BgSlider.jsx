import React, { useState } from 'react'
import { assets } from '../assets/assets'

const BgSlider = () => {

    const [sliderPosition,setSliderPosition]  = useState(50)

    const handleSliderchange = (e)=>{
        setSliderPosition(e.target.value)
    }
  return (
    <div>
      {/* title */}
      <h1  className='text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>Remove Background With High<br/> Quality and Accuracy</h1>

      <div>

        {/* bg image */}

{/* <img src={assets.image_w_bg}  style={{clipPath:`inset(0${100.2 -sliderPosition}% 0 0)`}}alt="" /> */}
      </div>
    </div>
  )
}

export default BgSlider

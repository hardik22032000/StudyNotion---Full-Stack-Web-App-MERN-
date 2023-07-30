import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import {FaQuoteLeft, FaQuoteRight} from "react-icons/fa";

const Quote = () => {
  return (
    <div className='w-9/12 text-richblack-25 font-inter text-2xl font-semibold mb-[20px] text-center inline'>
        <div className='inline-block'>
            <span><FaQuoteLeft fontSize={18} className='text-richblack-600 -mt-7'/></span>
        </div>
        <div className='inline'>
            <span> We are passionate about revolutionizing the way we learn. Our innovative platform 
            <HighlightText text={" combines technology"} /> {", "}

            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#ff512f] to-[#f09819]'>
            expertise</span> {", "}

            and community to create an {" "}

            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#e65c00] to-[#f9d423]'>
            unparalleled educational experience</span> {". "} </span>
        </div>
        <div className='inline-block'>
            <span><FaQuoteRight fontSize={18} className='text-richblack-600 -mt-6'/></span>
        </div>
        
    </div>
  )
}

export default Quote
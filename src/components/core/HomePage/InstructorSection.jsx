import React from 'react';
import InstructorImage from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';
import CTAButton from "./Button";
import {FaArrowRight} from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className='flex lg:flex-row md:flex-col sm:flex-col gap-20 items-center mt-20 mb-20 md:pl-10 sm:pl-10'>

        <div className='lg:w-[55%] md:w-[100%] sm:w-[100%] relative'>
            <img className='absolute top-0 z-10 '
            src={InstructorImage} alt="instrucrtor" />
            <div className='h-[530px] w-[600px] mt-10 ml-10 bg-white'></div>
        </div>

        <div className='lg:w-[45%] md:w-[100%] sm:w-[100%]'>
            <div className='text-4xl font-semibold font-inter w-[60%]'>
                Become an
                <HighlightText text={"Instructor"} />
            </div>
            <div className='font-inter text-[16px] text-richblack-300 mt-5 w-[80%]'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </div>
            <div className='max-w-fit mt-10'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex gap-2 items-center'>
                        Start Teaching Today
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>
        </div>
    
    </div>
  )
}

export default InstructorSection;
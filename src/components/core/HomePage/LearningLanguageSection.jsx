import React from 'react'
import HighlightText from './HighlightText';
import KnowYourProgressImage from "../../../assets/Images/Know_your_progress.svg";
import CompareWithOthersImage from "../../../assets/Images/Compare_with_others.svg";
import PlanYourLessonsImage from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from "./Button";

const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col gap-5 items-center'>

      <div className='text-4xl font-semibold text-center font-inter'>
        Your swiss Knife for
        <HighlightText text={" learning any language"}/>
      </div>

      <div className='text-center text-richblack-600 mx-auto text-base font-inter w-[60%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>

      <div className='flex lg:flex-row md:flex-col sm:flex-col items-center justify-center mt-5'>
        <img src={KnowYourProgressImage} alt="img1" className='object-contain lg:-mr-32 lg:-mt-10 '/>
        <img src={CompareWithOthersImage} alt="img2" className='object-contain md:-mt-20 sm:-mt-20'/>
        <img src={PlanYourLessonsImage} alt="img3" className='object-contain lg:-ml-36 md:-mt-28 sm:-mt-28'/>
      </div>

      <div className='items-center w-fit'>
        <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
      </div>

    </div>
  )
}

export default LearningLanguageSection;
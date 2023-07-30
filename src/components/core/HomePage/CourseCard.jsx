import React from 'react'
import {IoPeople} from "react-icons/io5";
import {TbBinaryTree2} from "react-icons/tb";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {

  return (
    
    <div  onClick={() => setCurrentCard(cardData.heading)}   className={`cursor-pointer flex flex-col h-fit pt-10 md:mb-10 sm:mb-10
    ${currentCard === cardData.heading ? "bg-white shadowclass" 
    : "bg-richblack-800"}
    `}>
        <div className={`font-semibold text-xl px-5 mb-5 font-inter
        ${currentCard === cardData.heading ? "text-black" : "text-white" }
        `}>
            {cardData.heading}
        </div>

        <div className={`text-lg text-richblack-300 px-5 mb-24 font-inter pr-12`}>
            {cardData.description}
        </div>

        <div className={`text-[16px] text-richblack-300 px-1`}>
            <hr className='border-1 h-1 border-richblack-300 border-dashed w-full'></hr>
        </div>

        <div className={`flex flex-row w-full justify-between py-4 px-5
        ${currentCard === cardData.heading ? "text-blue-500" : "text-richblack-300"}
        `}>
            <div className='flex flex-row gap-2 items-center font-inter'>
                <IoPeople />
                {cardData.level}
            </div>
            <div className='flex flex-row gap-2 items-center font-inter'>
                <TbBinaryTree2 />
                {cardData.lessionNumber} Lessons
            </div>
        </div>
    </div>
  )
}

export default CourseCard
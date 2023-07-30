import React, { useState } from 'react';
import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const TabsName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Skill Paths",
    "Career Paths"
]

const ExploreMore = () => {

  const [currentTab, setCurrentTab] = useState(TabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  }

  return (
    <div>
        <div className='text-4xl font-semibold text-center font-inter'>
            Unlock the
            <HighlightText text={" Power of Code"} />
        </div>

        <div className='text-center text-richblack-300 text-lg font-inter mt-3'>
            Learn to Build Anything You Can Imagine
        </div>

        <div className='mt-10 flex flex-row lg:gap-2 rounded-full bg-richblack-800 px-3 py-2 w-fit mx-auto'>
            {
                TabsName.map( (element, index) => {
                    return (
                        <div 
                        className={`text-[16px] flex flex-row items-center gap-4
                        rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 
                        hover:text-richblack-5 px-7 py-2
                        ${currentTab === element
                        ? "bg-richblack-900 text-richblack-5 font-medium"
                        : "text-richblack-200" }`} key={index} onClick={() => setMyCards(element)}>
                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className='lg:h-[150px] mt-10 flex lg:flex-row md:flex-col sm:flex-col gap-10 justify-between w-full'>
            {
                courses.map( (element, index) => {
                    return (
                        <CourseCard key={index} cardData={element} currentCard={currentCard} 
                        setCurrentCard={setCurrentCard} />
                    )
                })
            }  
        </div>

    </div>
  )
}

export default ExploreMore
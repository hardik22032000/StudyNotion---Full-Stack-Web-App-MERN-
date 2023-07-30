import React from 'react';
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
    {
        logo: logo1,
        heading: "Leadership",
        description: "Fully committed to the success company",
    },
    {
        logo: logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority",
    },
    {
        logo: logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills",
    },
    {
        logo: logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution",
    }
]

const TimeLineSection = () => {
  return (
        <div className='flex lg:flex-row md:flex-col md:mt-10 sm:flex-col sm:mt-10 gap-14 w-full items-center'>
            
            <div className='lg:w-[40%] md:w-[100%] sm:w-[100%] flex flex-col items-start '>
                {
                    timeline.map((element, index) => {
                        return (
                            <div className='flex flex-row gap-x-5' key={index}>

                                <div className='flex flex-col'>
                                    <div className='w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full'>
                                        <img src={element.logo} loading='lazy' alt="Logo"/>
                                    </div>
                                    {index !== (timeline.length-1) ?
                                    <div className='border-dashed border-richblack-100 border-l-2 h-12 items-center translate-x-[50%]'></div>
                                    : <div></div>}
                                </div>

                                <div className='gap-y-10'>
                                    <h2 className='font-semibold font-inter text-[18px]'>{element.heading}</h2>
                                    <p className='text-sm font-inter'>{element.description}</p>
                                </div>

                            </div>
                        )
                    }
                )}
            </div>

            <div className='relative lg:w-[60%] md:w-[100%] sm:w-[100%] gap-5 shadow-blue-200'>
                <img src={TimeLineImage} alt="TimeLine" className='shadow-white object-cover h-fit rounded-sm' />
            
                <div className='absolute bg-caribbeangreen-700 flex flex-row text-[white] uppercase py-10
                left-[50%] translate-x-[-50%] translate-y-[-50%]'>

                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-10'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>
                    <div className='flex flex-row gap-5 items-center px-10'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Types of courses</p>
                    </div>

                </div>
            </div>

        </div>

    
  )
}

export default TimeLineSection;
import React from 'react';
import HighlightText from '../HomePage/HighlightText';
import CTAButton from "../HomePage/Button";

const LearningGridArray = [
    {
      order: 0,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "The learning process uses the namely online and offline.",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
];

const LearningGrid = () => {
  return (
    <section className='pt-[70px] pb-[70px]'>
        <div className='grid mx-auto lg:grid-cols-4 grid-cols-1 w-11/12 '>
        {
            LearningGridArray.map( (card,index) => (
                <div key={index}
                className={`${index === 0 && "lg:col-span-2"}
                ${card.order % 2 === 1 && "bg-richblack-700"} ${card.order % 2 !== 1 && card.order !== 0 && "bg-richblack-800"}
                ${card.order === 3 && "lg:col-start-2"}`}
                >
                {
                    card.order === 0 ?
                    (
                        <div className='py-[30px] px-[20px] h-[300px] '>
                            <div className='text-4xl text-white font-inter font-semibold pr-10 mb-5'>
                                {card.heading}
                                <HighlightText text={card.highlightText} />
                            </div>
                            <p className=' text-richblack-400 pr-14 mb-10' >
                                {card.description}
                            </p>
                            <div className=' max-w-maxContent flex flex-row items-start'>
                                <CTAButton active={true} linkto={card.BtnLink}>
                                    {card.BtnText}
                                </CTAButton>
                            </div>
                        </div>
                    ) : 
                    (
                        <div className='py-[30px] px-[20px] lg:h-[300px] md:h-[200px]'>
                            <h1 className='text-xl text-white font-inter font-semibold pr-10 mb-5'>{card.heading}</h1>
                            <p className=' text-richblack-400'>{card.description}</p>
                        </div>
                    )
                }

                </div>
            ))
        }

        
        </div>
    </section>
  )
}

export default LearningGrid
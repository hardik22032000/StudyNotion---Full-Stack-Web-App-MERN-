import React from 'react';
import {FaArrowRight} from "react-icons/fa";
import {Link} from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer';
import frameImage from '../assets/Images/frame.png';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {

  return (

    <div className='mt-10'>

        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white 
        justify-between max-w-maxContent space-x-4'>

            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold
                text-richblack-200 transition-all duration-200 hover:scale-95 w-fit '>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                    group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with 
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
            </div>

            <div className="relative mx-3 my-12">
                <video className='shadow-home absolute top-0 z-10'
                height="515" width="1035" autoPlay muted loop>
                <source src={Banner} type="video/mp4"/>
                </video>
                <img className='lg:h-[560px] lg:w-[1020px] md:h-[400px] md:w-[700px] sm:h-[340px] sm:w-[620px] mt-10 ml-10'
                
                src={frameImage}
                alt="Pattern"
                loading="lazy"
                />
            </div>

            {/* Code Section 1 */}
            <div className="mx-auto items-center w-11/12">
                <CodeBlocks position={"lg:flex-row md:flex-col-reverse sm:flex-col-reverse"}
                heading={
                    <div>
                        Unlock your
                        <HighlightText text={" coding potential "} />
                        with our online courses
                    </div>
                }
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctabtn1={
                    {
                        txt:"Try it yourself",
                        linkto:"/signup",
                        active:true
                    }
                }
                ctabtn2={
                    {
                        txt:"Learn More",
                        linkto:"/login",
                        active:false
                    }
                }
                codeblock={
                    `<!DOCTYPE html>
                    <html>
                    <head><title>Example</title>
                    <link rel="stylesheet" href="styles.css">
                    </head>
                    <body>
                    <h1><a href="/">Header</a>
                    </h1>
                    <nav><a href="one/">One</a><a href="two/
                    ">Two</a><a href="three/">Three</a>
                    </nav>`
                }
                codeColor={"text-[#d43d63]"}
                backgroundGradient={<div className="codeblock1 absolute top-[-15%] left-[-10%]"></div>}
                />
            </div>

            {/* Code Section 2 */}
            <div className="mx-auto items-center w-11/12">
                <CodeBlocks position={"lg:flex-row-reverse md:flex-col-reverse sm:flex-col-reverse"}
                heading={
                    <div>
                        Start
                        <HighlightText text={" coding in seconds "} />
                    </div>
                }
                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctabtn1={
                    {
                        txt:"Continue Lesson",
                        linkto:"/signup",
                        active:true
                    }
                }
                ctabtn2={
                    {
                        txt:"Learn More",
                        linkto:"/login",
                        active:false
                    }
                }
                codeblock={
                    `<!DOCTYPE html>
                    <html>
                    <head><title>Example</title>
                    <link rel="stylesheet" href="styles.css">
                    </head>
                    <body>
                    <h1><a href="/">Header</a>
                    </h1>
                    <nav><a href="one/">One</a><a href="two/
                    ">Two</a><a href="three/">Three</a>
                    </nav>`
                }
                codeColor={"text-[#d43d63]"}
                backgroundGradient={<div className="codeblock2 absolute top-[-15%] left-[-10%]"></div>}
                />
            </div>

            <ExploreMore />

        </div>

        {/* Section 2 */}
        <div className=' bg-pure-greys-5 text-richblack-700 flex flex-col items-center justify-between'>
                
                <div className='homepage_bg lg:h-[500px] md:h-[300px] sm:h-[200px] w-screen'>

                    <div className='w-11/12 flex flex-row gap-7 text-white lg:h-[500px] md:h-[200px] sm:h-[100px] justify-center mx-auto mt-[50px] items-center'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex gap-2 items-center'>
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/login"}>Learn More</CTAButton>
                    </div>     

                </div>

                <div className='w-10/12 flex flex-row gap-10 h-[200px] pt-20 pb-20 justify-evenly'>
                            
                    <div className='text-2xl font-semibold w-[40%] gap-10 h-fit pr-5'>
                        Get the skills you need for a 
                        <HighlightText text={"job that is in demand."}/>
                    </div>

                    <div className='w-[45%] flex flex-col gap-10 h-fit'>
                        <div className='text-[16px] font-inter font-medium'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <div className='max-w-fit'>
                            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                        </div>
                    </div>
                            
                </div>

                <div className='w-10/12 mt-20 mb-20'>
                    <TimeLineSection />
                </div>

                <div className='w-10/12 mt-20 mb-20'>
                    <LearningLanguageSection />
                </div>
                
        </div>

        {/* Section 3 */}
        <div className='w-11/12 mx-auto max-w-maxcontent flex-col items-center justify-between gap-8 
        first-letter bg-richblack-900 text-white'>

            <InstructorSection />

            <h2 className='text-center text-4xl font-semibold mt-10'>Reviews from other learners</h2>
            <ReviewSlider />

        </div>

        {/* Footer */}
        <Footer />

    </div>
  )
}

export default Home;
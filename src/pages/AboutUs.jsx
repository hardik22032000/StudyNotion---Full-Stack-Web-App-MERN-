import React from 'react';
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from '../components/core/AboutPage/Quote';
import FoundingStoryImg from "../assets/Images/FoundingStory.png";
import Stats from '../components/core/AboutPage/Stats';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactForm from '../components/core/AboutPage/ContactForm';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';

const AboutUs = () => {
  return (
    <div className='mt-10'>
        {/* Section 1 */}
        <section className=' bg-richblack-800 lg:h-[550px]'>
            <div className='w-11/12 flex flex-col justify-center items-center pt-[100px] mx-auto font-bold'>

                <h1 className='lg:w-8/12 text-white font-inter text-4xl font-semibold mb-[20px] text-center md:w-[100%] sm:w-[100%]'>
                Driving Innovation in Online Education for a 
                <HighlightText text={" Brighter Future "}/>
                </h1>

                <p className='lg:w-9/12 font-inter text-[16px] text-richblack-300 text-center md:w-[90%] sm:w-[90%]'>
                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>

                <div className='flex flex-row lg:flex-nowrap gap-8 mt-[50px] sm:flex-wrap sm:justify-center md:flex-wrap md:justify-center'>
                    <img src={BannerImage1} alt="aboutus1"/>
                    <img src={BannerImage2} alt="aboutus2"/>
                    <img src={BannerImage3} alt="aboutus3"/>

                </div>
            </div>
        </section>

        {/* section 2 */}
        <section className='lg:pt-[150px] pb-[50px] border-[2px] border-b-richblack-600 md:w-[100%] sm:w-[100%] md:pt-[70px] sm:pt-[70px]'>
            <div className='w-11/12 flex flex-col justify-center items-center mx-auto'>
                <Quote />
            </div>
        </section>

        {/* section 3 */}
        <section className='lg:pt-[50px] lg:pb-[50px] md:pt-[20px] md:pb-[20px] sm:pt-[20px] sm:pb-[20px]'>
            <div>

                <div className='flex flex-row lg:w-11/12 lg:flex-nowrap justify-center items-center mx-auto gap-2 sm:flex-wrap-reverse md:flex-wrap-reverse'>

                    <div className='flex flex-col text-white lg:w-[45%] pl-10 pt-10 pb-10 lg:pr-0 md:w-[100%] md:pr-5 sm:w-[100%] sm:pr-5'>
                        <h1 className='text-3xl font-semibold mb-5 text-transparent bg-clip-text 
                        bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#f09819]'>Our Founding Story </h1>
                        <p className='text-richblack-500 mb-5'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p className='text-richblack-500'>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                    </div>

                    <div className='relative lg:w-[55%] flex flex-col items-center justify-center pt-10 pb-10 md:w-[100%] sm:w-[100%]'>
                    <img src={FoundingStoryImg} alt="Founding Story" />
                    <div className="codeblock1 absolute top-[-10%] left-[10%]"></div>
                    </div>

                </div>

                <div className='lg:flex lg:flex-row lg:w-11/12 lg:flex-nowrap justify-center items-center mx-auto gap-4 md:flex-wrap sm:flex-wrap'>

                    <div className='flex flex-col text-white pl-10 lg:pt-10 pb-10 lg:pr-0 md:pt-5 md:pr-5 sm:pt-5 sm:pr-5'>
                        <h1 className='text-3xl font-semibold mb-5 text-transparent bg-clip-text 
                        bg-gradient-to-r from-[#e65c00] to-[#f09819]'>Our Vision</h1>
                        <p className='text-richblack-500 mb-5'>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>

                    <div className='flex flex-col text-white pl-10 lg:pt-10 pb-10 lg:pr-0 md:pt-5 md:pr-5 sm:pt-5 sm:pr-5'>
                        <h1 className='text-3xl font-semibold mb-5 text-transparent bg-clip-text 
                        bg-gradient-to-r from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb]'>Our Mission</h1>
                        <p className='text-richblack-500 mb-5'>
                        our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>

                </div>

            </div>
            
        </section>

        {/* Section 4 */}
        <Stats />

        {/* Section 5 */}
        <LearningGrid />

        {/* Section 6 */}
        <ContactForm />

        {/* Section 7 */}
        <h2 className='text-center text-4xl font-semibold mt-10 text-white'>Reviews from other learners</h2>
        <div className='w-11/12 mx-auto max-w-maxcontent'>
            <ReviewSlider />
        </div>

        {/* Footer */}
        <Footer />

    </div>
  )
}

export default AboutUs;
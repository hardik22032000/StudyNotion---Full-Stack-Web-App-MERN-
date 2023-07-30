import React from 'react';
import {SiGooglechat} from "react-icons/si";
import {BsGlobeEuropeAfrica} from "react-icons/bs"
import {IoCallSharp} from "react-icons/io5";
import ContactUsForm from '../components/ContactPage/ContactUsForm';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';

const ContactUs = () => {
  return (
    <div className='mt-10'>

        <div className='w-11/12 flex sm:flex-col md:flex-col lg:flex-row pt-[70px] pb-[20px] px-10 mx-auto gap-8 justify-between'>

            <div className='flex sm:flex-row sm:flex-wrap md:flex-row md:flex-wrap lg:flex-col py-10 px-8 bg-richblack-800 gap-10 lg:w-[500px] h-fit rounded-lg'>

                <div className='flex flex-row gap-4'>
                        <div className=' flex flex-col mt-2 text-richblack-100'>
                            <SiGooglechat />
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='text-richblack-5 font-inter font-semibold'>Chat with us</h1>
                            <p className='text-richblack-200 font-inter'>Our friendly team is here to help.</p>
                            <p className='text-richblack-200 font-inter'>@mail address</p>
                        </div>
                </div>

                <div className='flex flex-row gap-4'>
                        <div className=' flex flex-col mt-2 text-richblack-100'>
                            <BsGlobeEuropeAfrica />
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='text-richblack-5 font-inter font-semibold'>Visit us</h1>
                            <p className='text-richblack-200 font-inter'>Come and say hello at our office HQ.</p>
                            <p className='text-richblack-200 font-inter'>Here is the location/ address</p>
                        </div>
                </div>

                <div className='flex flex-row gap-4'>
                        <div className=' flex flex-col mt-2 text-richblack-100'>
                            <IoCallSharp />
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='text-richblack-5 font-inter font-semibold'>Call us</h1>
                            <p className='text-richblack-200 font-inter'>Mon - Fri From 8am to 5pm.</p>
                            <p className='text-richblack-200 font-inter'>+123 456 7890</p>
                        </div>
                </div>
            </div>

            <div className='flex flex-col py-10 px-10 border-2 border-richblack-600 rounded-lg h-fit gap-2'>
                <h1 className='text-richblack-5 font-inter font-semibold text-4xl'>Got a Idea? We’ve got the skills.</h1>
                <h1 className='text-richblack-5 font-inter font-semibold text-4xl'>Let’s team up</h1>
                <p className='text-richblack-300 font-inter text-[16px] mt-2 mb-2'>Tell us more about yourself and what you’re got in mind.</p>

                <ContactUsForm />
            </div>

        </div>


        <h2 className='text-center text-4xl font-semibold mt-10 text-white'>Reviews from other learners</h2>
        <div className='w-11/12 mx-auto max-w-maxcontent my-10'>
            <ReviewSlider />
        </div>

        {/* Footer */}
        <Footer />


    </div>
  )
}

export default ContactUs

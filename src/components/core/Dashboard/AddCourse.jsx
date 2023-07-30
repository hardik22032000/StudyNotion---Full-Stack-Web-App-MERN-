import React from 'react';
import RenderSteps from '../AddCourse/RenderSteps';
import {BsLightningChargeFill} from "react-icons/bs";

const AddCourse = () => {

  return (
    <>
    <div className='flex lg:flex-row md:flex-col-reverse sm:flex-col-reverse gap-8 mt-4 w-full'>
        <div className='flex flex-col gap-4 lg:w-[55%]'>
            <h1 className='text-3xl text-white font-semibold font-inter'>Add Course</h1>
            <div>
                <RenderSteps />
            </div>
        </div>

        <div className='flex flex-col gap-2 lg:w-[45%] bg-richblack-800 px-5 py-5 text-richblack-5 rounded-md h-max'>
            <div className='flex flex-row gap-2 items-center mb-4'>
                <BsLightningChargeFill className=' text-yellow-50'/>
                <h2 className='font-semibold font-inter text-lg'>Course Upload Tips</h2>
            </div>
            <div className='flex flex-col gap-2 pl-5'>
                <ul className='list-disc flex flex-col gap-2  font-inter text-md'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important.</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>

    </div>

    </>
  )
}

export default AddCourse
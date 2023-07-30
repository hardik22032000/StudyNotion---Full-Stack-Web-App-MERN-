import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { setstep, setcompletedStep} from '../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../utils/constants';
import { setEditCourse, resetCourseState } from '../../../slices/courseSlice';
import { editCourseDetails } from '../../../services/operations/courseAPI';
import {IoChevronBackOutline} from "react-icons/io5";

const CoursePublish = () => {

  const { register, handleSubmit, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const {step, completedStep} = useSelector((state) => state.course);

  const goBack = () => {
    dispatch(setstep(step-1));
    dispatch(setcompletedStep(completedStep-1));
    dispatch(setEditCourse(true));
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses");
  }

  const handleCoursePublish = async () => {

    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      setcompletedStep(completedStep+1);
      goToCourses();
      return;
    }

    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)

    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      setcompletedStep(completedStep+1);
      goToCourses();
    }
    setLoading(false)
  }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      
      <h2 className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </h2>

      <form onSubmit={handleSubmit(handleCoursePublish)}>

        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this course as public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button onClick={goBack}
            className='flex flex-row gap-1 rounded-md cursor-pointer items-center justify-center px-4 py-2 bg-richblack-600 text-white font-bold hover:scale-95 transition-all duration-200'>
            <IoChevronBackOutline className='text-white font-semibold'/> Back
          </button>
         
          <button
            className='flex flex-row text-black bg-yellow-50 px-5 py-2 justify-center items-center rounded-md font-bold hover:scale-95 transition-all duration-200'>
              {loading ? "Loading...": "Save"} 
          </button>
        </div>

      </form>

    </div>
  )
}

export default CoursePublish
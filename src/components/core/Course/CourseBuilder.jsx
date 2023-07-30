import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {MdAddCircleOutline, MdEdit} from "react-icons/md";
import {GrFormNext} from "react-icons/gr";
import {IoChevronBackOutline} from "react-icons/io5"
import NestedView from './CourseBuilder/NestedView';
import { setCourse, setEditCourse, setcompletedStep, setstep } from '../../../slices/courseSlice';
import { toast } from 'react-hot-toast';
import { createSection, updateSection } from '../../../services/operations/courseAPI';
import Spinner from "../../common/Spinner";

const CourseBuilder = () => {

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const [editSectionName, seteditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const {step, completedStep} = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const cancelEdit = () => {
    seteditSectionName(null);
    setValue("sectionName", "");
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId ){
      cancelEdit();
      return;
    }

    seteditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  const goBack = () => {
    dispatch(setstep(step-1));
    dispatch(setcompletedStep(completedStep-1));
    dispatch(setEditCourse(true));
  }

  const goNext = () => {
    if(course?.courseContent?.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if(course?.courseContent?.some((section) => section?.subSection?.length === 0)) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    //if everything is good
    dispatch(setstep(step+1));
    dispatch(setcompletedStep(completedStep+1));
  }

  const onSubmit = async (data) => {
    setLoading(true);
    let result = null;

    if(editSectionName){
      result = await updateSection(
        {
          NewSectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      )
    }
    else{
      result = await createSection(
        {
          SectionName: data.sectionName,
          courseID: course._id,
        }, token
      )
    }

    if(result) {
      dispatch(setCourse(result));
      seteditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  }

  const PreventDefaultBehaviour = (event) => {
    if(event.key === "Enter"){
      event.preventDefault();
    }
  }

  return (
    loading ? (<div className="w-full h-screen flex flex-col justify-center items-center"><Spinner /></div>)
    : (
        <div className='flex flex-col bg-richblack-800 px-4 py-4 mt-2 rounded-md'>
          <h2 className='text-xl text-white mb-4 font-semibold'>Course Builder</h2>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Section Input */}
            <div className='flex flex-col items-start'>
                <label htmlFor='sectionName' className='text-base text-richblack-50 font-inter mb-2'>
                  Section Name <sup className='text-[#ff0000] text-sm'>*</sup>
                </label>
                <input onKeyDown={PreventDefaultBehaviour}
                    className='bg-richblack-700 text-white px-3 py-3 
                    rounded-md w-full border-b-2 border-richblack-100'
                    type='text'
                    name='sectionName'
                    id='sectionName'
                    placeholder='Add a section to build your course'
                    {...register("sectionName",{required: true})}
                />
                {
                    errors.sectionName && (
                        <span className='text-[#FF0000]'>
                            Please Enter Section Name
                        </span>
                    )
                }
            </div>

            <div className='mt-5 flex flex-row'>
              <button 
                type="Submit"
                className={"text-yellow-50 border-2 border-yellow-50 px-5 py-2 flex flex-row gap-2 items-center justify-center rounded-lg "}
              >
                {editSectionName ? "Edit Section Name" : "Create Section"}
                {editSectionName ? <MdEdit className='text-yellow-50' size={20}/> : 
                <MdAddCircleOutline className='text-yellow-50' size={20}/> }
              </button>
              
              {editSectionName && (
                <button
                type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline ml-5'
                >
                  Cancel Edit
                </button>
              )}
            </div>

          </form>

          {course?.courseContent?.length > 0 && (
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
          )}

          <div className='flex justify-end gap-x-3 mt-5'>
            
            <button onClick={goBack}
            className='flex flex-row gap-1 rounded-md cursor-pointer items-center justify-center px-5 py-2 bg-richblack-600 text-white font-bold hover:scale-95 transition-all duration-200'>
            <IoChevronBackOutline className='text-white font-semibold'/> Back
            </button>

            <button onClick={goNext}
            className='flex flex-row gap-1 text-black bg-yellow-50 px-5 py-2 justify-center items-center rounded-md font-bold hover:scale-95 transition-all duration-200'>
            Next <GrFormNext className='text-black font-semibold' />
            </button>

          </div>

        </div>

      )
  )

}
export default CourseBuilder;
import React from 'react';
import { useForm } from 'react-hook-form';
import {TbCoinRupee} from "react-icons/tb";
import {GetAllCourseCategories, editCourseDetails, addCourseDetails} from "../../../services/operations/courseAPI";
import { useState, useEffect } from 'react';
import CourseTags from "./CourseInformation/CourseTags";
import CourseRequirements from "./CourseInformation/CourseRequirements";
import { useDispatch } from 'react-redux';
import { setstep, setCourse, setcompletedStep} from '../../../slices/courseSlice';
import IconButton from "../../common/IconButton";
import { useSelector } from 'react-redux';
import { COURSE_STATUS } from '../../../utils/constants';
import { toast } from 'react-hot-toast';
import Spinner from "../../common/Spinner";
import Upload from './CourseInformation/Upload';

const CourseInformation = () => {

  const dispatch = useDispatch();
  const {step, completedStep} = useSelector((state) => state.course);
  const {course, editCourse} = useSelector((state)=>state.course);
  const [loading, setLoading] = useState(false);
  const [categories, setcategories] = useState([]);
  const {token} = useSelector((state)=>state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect( () => {
    const GetCategories = async () => {
      const result = await GetAllCourseCategories();
      setcategories(result);
    }
    
    GetCategories();

    if(editCourse) {
      setValue("courseName", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseCategory",course.category.name);
      setValue("courseTags", course.tag);
      setValue("courseImage", course.thumbnail);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseRequirements", course.instructions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if(currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.price ||
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseImage !== course.thumbnail ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseRequirements.toString() !== course.instructions.toString() )
        return true;
    else
        return false;
  }

  const SubmitCourseInfo = async(data) => {
    if(editCourse) {
        if(isFormUpdated()) {
            const currentValues = getValues();
            const formData = new FormData();

            formData.append("courseId", course._id);
            if(currentValues.courseName !== course.courseName)
                formData.append("courseName", data.courseTitle);
            
            if(currentValues.courseShortDesc !== course.courseDescription)
                formData.append("courseDescription", data.courseShortDesc);
            
            if(currentValues.coursePrice !== course.price)
                formData.append("price", data.coursePrice);

            if(currentValues.courseCategory._id !== course.category._id)
                formData.append("category", data.courseCategory);

            if(currentValues.courseTags.toString() !== course.tag.toString())
               formData.append("tag", data.courseTags);

            if(currentValues.courseImage.toString() !== course.thumbnail.toString())
               formData.append("thumbnailImage", data.courseImage);
            
            if(currentValues.courseBenefits !== course.whatYouWillLearn)
                formData.append("whatYouWillLearn", data.courseBenefits);
            
            if(currentValues.courseRequirements.toString() !== course.instructions.toString())
                formData.append("instructions", data.courseRequirements);

            setLoading(true);
            const result = await editCourseDetails(formData, token);
            setLoading(false);
            if(result) {
                dispatch(setstep(step+1));
                dispatch(setcompletedStep(completedStep+1));
                dispatch(setCourse(result));
            }
        } 
        else
            toast.error("No Changes made so far");

        return;
    }

    //create a new course
    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("category", data.courseCategory);
    formData.append("tags", data.courseTags);
    formData.append("thumbnailImage", data.courseImage);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("instructions", data.courseRequirements);
    formData.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    console.log("BEFORE add course API call");
    console.log("PRINTING FORMDATA", formData);
    const result = await addCourseDetails(formData,token);
    if(result) {
      dispatch(setstep(step+1));
      dispatch(setcompletedStep(completedStep+1));
      dispatch(setCourse(result));
    }
    setLoading(false);
  }

  const PreventDefaultBehaviour = (event) => {
    if(event.key === "Enter"){
      event.preventDefault();
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
    { loading ? (<div className="w-full h-screen flex flex-col justify-center items-center"><Spinner /></div>) : 
    (<div className='flex flex-col px-2 py-2 w-full'>

      <form onSubmit={handleSubmit(SubmitCourseInfo)} className='flex flex-col gap-2 px-5 py-5 w-full bg-richblack-800 rounded-md'>
     
        {/* Course Title */}
        <div className='flex flex-col items-start px-2 py-2'>
            <label htmlFor='courseName' className='text-base text-richblack-50 font-inter mb-2'>
              Course Title <sup className='text-[#ff0000] text-sm'>*</sup>
            </label>
            <input onKeyDown={PreventDefaultBehaviour}
                className='bg-richblack-700 text-white px-3 py-3 
                rounded-md w-full border-b-2 border-richblack-100'
                type='text'
                name='courseName'
                id='courseName'
                placeholder='Enter Course Title'
                {...register("courseName",{required: true})}
            />
            {
                errors.courseName && (
                    <span className='text-[#FF0000]'>
                        Please Enter Course Name
                    </span>
                )
            }  
        </div>

        {/* Course Short Description */}
        <div className='flex flex-col items-start px-2 py-2'>
            <label htmlFor='courseShortDesc' className='text-base text-richblack-50 font-inter mb-2'>
              Course Short Description <sup className='text-[#ff0000] text-sm'>*</sup>
            </label>
            <textarea rows={5} cols={30} onKeyDown={PreventDefaultBehaviour}
              className='bg-richblack-700 text-white px-3 py-3 
              rounded-md w-full border-b-2 border-richblack-100'
              type='text'
              name='courseShortDesc'
              id='courseShortDesc'
              placeholder='Please Enter your short description here'
              {...register("courseShortDesc",{required: true})}
            />
            {
                errors.courseShortDesc && (
                    <span className='text-[#FF0000]'>
                        Please Enter Course Short Description
                    </span>
                )
            }  
        </div>

        {/* Course Price */}
        <div className='relative flex flex-col items-start px-2 py-2'>
            <label htmlFor='coursePrice' className='text-base text-richblack-50 font-inter mb-2'>
              Course Price <sup className='text-[#ff0000] text-sm'>*</sup>
            </label>
            <TbCoinRupee className={`absolute text-richblack-50 left-[3%] text-xl
            ${errors.coursePrice ? "top-[44%]" : "top-[54%]" }`}/>
            <input onKeyDown={PreventDefaultBehaviour}
                className='bg-richblack-700 text-white px-8 py-3 
                rounded-md w-full border-b-2 border-richblack-100'
                type='number'
                name='coursePrice'
                id='coursePrice'
                placeholder={`Enter Course Price`}
                {...register("coursePrice",{required: true})}
            />
            {
                errors.coursePrice && (
                    <span className='text-[#FF0000]'>
                        Please Enter Course Price
                    </span>
                )
            }  
        </div>

        {/* Course Category */}
        <div className='flex flex-col px-2 py-2'>
            <label htmlFor='courseCategory' className='text-base text-richblack-50 font-inter mb-2'>
              Course Category <sup className='text-[#ff0000] text-sm'>*</sup>
            </label>
            <select
              className='bg-richblack-700 text-richblack-5 px-3 py-3
              rounded-md border-b-2 border-richblack-100 border-r-8 border-r-transparent'
              name='courseCategory'
              id='courseCategory'
              {...register("courseCategory",{required: true})}
              defaultValue={editCourse ? course.category.name : ""}
            >
            <option value="" disabled>Please Select Category</option>
            {
              categories.length > 0 &&
              categories.map((category, index) => 
                    (
                        <option key={index} value={category.name}>
                        {category.name}
                        </option>
                    )
                )
            }
            </select>
            {
                errors.courseCategory && (
                    <span className='text-[#FF0000]'>
                        Please Select Course Category
                    </span>
                )
            }  
        </div>

        {/* Course Tags */}
        <CourseTags 
        label={"Course Tags"}
        name={"courseTags"}
        placeholder={"Enter Course Tags. Press Enter for multiple tags"}
        register={register}
        setValue={setValue} 
        errors={errors}
        />
        
        {/* Course Thumbnail */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        {/* Course Benefits */}
        <div className='flex flex-col items-start px-2 py-2'>
            <label htmlFor='courseBenefits' className='text-base text-richblack-50 font-inter mb-2'>
              Benefits of the Course <sup className='text-[#ff0000] text-sm'>*</sup>
            </label>
            <textarea rows={5} cols={30} onKeyDown={PreventDefaultBehaviour}
              className='bg-richblack-700 text-white px-3 py-3 
              rounded-md w-full border-b-2 border-richblack-100'
              type='text'
              name='courseBenefits'
              id='courseBenefits'
              placeholder='Please Enter Course Benefits here'
              {...register("courseBenefits",{required: true})}
            />
            {
                errors.courseBenefits && (
                    <span className='text-[#FF0000]'>
                        Please Enter course Benefits
                    </span>
                )
            }  
        </div>

        <CourseRequirements 
        label={"Course Requirements / Course Instructions"}
        name={"courseRequirements"}
        placeholder={"Enter Course Requirements."}
        register={register}
        setValue={setValue} 
        errors={errors}
        />

      <div className='flex flex-row justify-end gap-x-2 mt-2'>
          {
            editCourse && (<button
                onClick={() => dispatch(setstep(2))}
                className='bg-richblack-600 text-white hover:scale-95 transition-all duration-200 text-center text-[14px] px-6 py-3 rounded-md font-bold'>
                Continue Without Saving
            </button>)   
          }

          <IconButton type={"submit"}
                text={!editCourse ? "Next" : "Save Changes"}
                customClasses={"bg-yellow-50 text-black hover:scale-95 transition-all duration-200 text-center text-[14px] px-6 py-3 rounded-md font-bold"}
          />
      </div>

      </form>

    </div>)
    }
  </div>
  )
}

export default CourseInformation
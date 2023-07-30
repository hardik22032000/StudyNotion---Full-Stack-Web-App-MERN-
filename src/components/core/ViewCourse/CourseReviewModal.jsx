import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { createRating } from '../../../services/operations/courseAPI';
import ReactStars from 'react-stars';
import IconButton from "../../common/IconButton";
import {IoMdClose} from "react-icons/io";

const CourseReviewModal = ({setReviewModal}) => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state) => state.auth);
    const {courseEntireData} = useSelector((state)=> state.viewCourse);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    useEffect(()=> {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

    const onSubmit = async (data) => {
        await createRating(
            {
                courseId:courseEntireData._id,
                rating:data.courseRating,
                review:data.courseExperience,
            },
            token
        );
        setReviewModal(null);
    }

    return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='bg-richblack-800 w-[500px] rounded-md'>
            
            {/* Modal header */}
            <div className='flex flex-row justify-between items-center bg-richblack-600 px-4 py-2 text-white font-inter font-semibold border-b-2 border-richblack-300'>
                <h2>Add Review</h2>
                <button
                onClick={() => setReviewModal(null)}
                >
                    <IoMdClose color='white'/>
                </button>
            </div>

            {/* Modal Body */}
            <div className='flex flex-col'>

                <div className='flex flex-row gap-x-2 mx-auto items-center pt-5'>
                    <img 
                        src={user?.image}
                        alt='user'
                        className='aspect-square  w-[50px] rounded-full object-cover'
                    />
                    <div className='flex flex-col gap-y-1 text-white'>
                        <h3 className='font-semibold font-inter'>{user?.firstName} {user?.lastName}</h3>
                        <p className='text-sm text-richblack-300 font-inter'>Posting Publicly</p>
                    </div>
                </div>


                <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-3 flex flex-col px-5'>

                    <ReactStars 
                        className='mx-auto'
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        color2={"#ffd700"}
                    />

                    <div className='mt-3 flex flex-col gap-y-1'>
                        <label htmlFor='courseExperience' className='text-base text-richblack-50 font-inter mb-2'>
                            Add Your Experience <sup className='text-[#ff0000] text-sm'>*</sup>
                        </label>
                        <textarea rows={4} cols={30}
                            className='bg-richblack-700 text-white px-3 py-3 
                            rounded-md w-full border-b-2 border-richblack-100'
                            id='courseExperience'
                            placeholder='Add Your Experience here'
                            {...register("courseExperience", {required:true})}
                        />
                        {
                            errors.courseExperience && (
                                <span>
                                    Please add your experience
                                </span>
                            )
                        }
                    </div>
                    {/* Cancel and Save button */}
                    <div className='flex flex-row gap-x-4 justify-end mt-4 mb-4'>
                        <button className='flex justify-center items-center px-4 py-2 text-white bg-richblack-600 rounded-md font-semibold hover:scale-95 transition-all duration-200'
                        onClick={() => setReviewModal(false)}
                        >
                            Cancel
                        </button>
                        <IconButton 
                            text="Submit"
                            customClasses={'flex justify-center items-center px-4 py-2 text-black bg-yellow-50 font-semibold rounded-md hover:scale-95 transition-all duration-200'}
                        />
                    </div>


                </form>

            </div>
        </div>
    </div>
    )
}

export default CourseReviewModal
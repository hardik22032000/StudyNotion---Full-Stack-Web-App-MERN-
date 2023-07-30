import React from 'react';
import { setCourse } from '../../../../slices/courseSlice';
import {useForm} from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {RxCross1} from "react-icons/rx";
import Upload from '../CourseInformation/Upload';
import { updateSubSection } from '../../../../services/operations/courseAPI';
import { createSubSection } from '../../../../services/operations/courseAPI';

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {

    const {
        register, 
        handleSubmit, 
        setValue,
        formState: {errors},
        getValues,
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        if(view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
            setValue("hours", modalData.timeDuration.split(":")[0]);
            setValue("minutes", modalData.timeDuration.split(":")[1]);
            setValue("seconds", modalData.timeDuration.split(":")[2]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl || 
            currentValues.hours !== modalData.timeDuration.split(":")[0] || 
            currentValues.minutes !== modalData.timeDuration.split(":")[1]|| 
            currentValues.seconds !== modalData.timeDuration.split(":")[2]) 
        {
                return true;
        }
        else {
            return false;
        }
    }

    const handleEditSubSection = async () => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subsectionId", modalData._id);

        if(currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if(currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }

        if(currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo);
        }

        if(currentValues.hours !== modalData.timeDuration.split(":")[0] ||
            currentValues.minutes !== modalData.timeDuration.split(":")[1] ||
            currentValues.seconds !== modalData.timeDuration.split(":")[2])
        {
            const timeDuration = currentValues.hours + ":" + currentValues.minutes + ":" + currentValues.seconds;
            formData.append("timeDuration",timeDuration);
        }

        setLoading(true);
        const result  = await updateSubSection(formData, token);
        if(result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? result : section
            ) 
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse));
        }
        setLoading(false);
        setModalData(null);
    }

    const onSubmit = async (data) => {
        if(view)
            return;

        else if(edit) {
            if(!isFormUpdated) {
                toast.error("No changes made so far")
            }
            else {
                handleEditSubSection();
            }
            return;
        }

        else {
            const currentValues = getValues();
            const timeDuration = currentValues.hours + ":" + currentValues.minutes + ":" + currentValues.seconds;
            
            const formData = new FormData();
            formData.append("SectionId", modalData);
            formData.append("title", data.lectureTitle);
            formData.append("description", data.lectureDesc);
            formData.append("video", data.lectureVideo);
            formData.append("timeDuration",timeDuration);

            setLoading(true);
            const result = await createSubSection(formData, token);
            if(result) {
                const updatedCourseContent = course.courseContent.map((section) =>
                    section._id === modalData ? result : section
                )
                const updatedCourse = { ...course, courseContent: updatedCourseContent }
                dispatch(setCourse(updatedCourse))
            }
            setLoading(false);
            setModalData(null);
        }
    }

    const PreventDefaultBehaviour = (event) => {
        if(event.key === "Enter"){
          event.preventDefault();
        }
    }
  
    return (
        <div className='fixed top-[0%] right-[0] left-[0%] bottom-[0] z-[1000] h-screen w-screen !mt-0 grid place-items-center overflow-auto  bg-opacity-10 backdrop-blur-sm bg-white' >
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                    <button onClick={() => (!loading ? setModalData(null): {})}>
                        <RxCross1  className="text-xl text-richblack-5"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-5">

                    <Upload
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl: null}
                    editData={edit ? modalData.videoUrl: null}
                    />

                    {/* Lecture Title */}
                    <div className='flex flex-col items-start px-2 py-2'>
                        <label htmlFor='lectureTitle' className='text-base text-richblack-50 font-inter mb-2'>
                        Lecture Title <sup className='text-[#ff0000] text-sm'>*</sup>
                        </label>
                        <input onKeyDown={PreventDefaultBehaviour}
                            className='bg-richblack-700 text-white px-3 py-3 
                            rounded-md w-full border-b-2 border-richblack-100'
                            type='text'
                            name='lectureTitle'
                            id='lectureTitle'
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle",{required: true})}
                        />
                        {
                            errors.lectureTitle && (
                                <span className='text-[#FF0000]'>
                                    Please Enter Lecture Title
                                </span>
                            )
                        }  
                    </div>

                    {/* Time Duration */}
                    <div className='relative flex flex-col items-start px-2 py-2'>
                        <label className='text-base text-richblack-50 font-inter mb-2'>
                            Video Playback Time <sup className='text-[#ff0000] text-sm'>*</sup>
                        </label>
                        <div className='flex flex-row gap-4'>
                            <input onKeyDown={PreventDefaultBehaviour}
                                className='bg-richblack-700 text-white px-8 py-3 
                                rounded-md w-[30%] border-b-2 border-richblack-100'
                                type='number'
                                name='hours'
                                id='hours'
                                placeholder={`HH`}
                                {...register("hours")}
                                defaultValue={"00"}
                            />
                            
                            <input onKeyDown={PreventDefaultBehaviour}
                                className='bg-richblack-700 text-white px-8 py-3 
                                rounded-md w-[30%] border-b-2 border-richblack-100'
                                type='number'
                                name='minutes'
                                id='minutes'
                                placeholder={`MM`}
                                {...register("minutes")}
                                defaultValue={"00"}
                            />
                            
                            <input onKeyDown={PreventDefaultBehaviour}
                                className='bg-richblack-700 text-white px-8 py-3 
                                rounded-md w-[30%] border-b-2 border-richblack-100'
                                type='number'
                                name='seconds'
                                id='seconds'
                                placeholder={`SS`}
                                {...register("seconds")}
                                defaultValue={"00"}
                            />
                            
                        </div>  
                    </div>

                    {/* Lecture Description */}
                    <div className='flex flex-col items-start px-2 py-2'>
                        <label htmlFor='lectureDesc' className='text-base text-richblack-50 font-inter mb-2'>
                        Lecture Description <sup className='text-[#ff0000] text-sm'>*</sup>
                        </label>
                        <textarea rows={5} cols={30} onKeyDown={PreventDefaultBehaviour}
                            className='bg-richblack-700 text-white px-3 py-3 
                            rounded-md w-full border-b-2 border-richblack-100'
                            type='text'
                            name='lectureDesc'
                            id='lectureDesc'
                            placeholder='Enter Lecture Description'
                            {...register("lectureDesc",{required: true})}
                        />
                        {
                            errors.lectureDesc && (
                                <span className='text-[#FF0000]'>
                                    Please Enter Lecture Description
                                </span>
                            )
                        }  
                    </div>

                    {
                        !view && (
                            <div className='flex justify-end gap-x-3 mt-5'>
                    
                                <button onClick={() => setModalData(null)}
                                className='flex flex-row rounded-md cursor-pointer items-center justify-center px-5 py-2 bg-richblack-600 text-white font-bold hover:scale-95 transition-all duration-200'>
                                Cancel
                                </button>

                                <button
                                className='flex flex-row text-black bg-yellow-50 px-5 py-2 justify-center items-center rounded-md font-bold hover:scale-95 transition-all duration-200'>
                                    {loading ? "Loading...": edit ? "Save Changes" : "Save"} 
                                </button>

                            </div>
                        )
                    }

                </form>

            </div>

        </div>
    )

}

export default SubSectionModal;
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseAPI';
import GetAvgRating from '../utils/avgRating';
import RatingStars from '../components/common/RatingStars';
import {BiTimeFive} from "react-icons/bi";
import {formatDate} from "../utils/formatDate";
import {BsGlobe} from "react-icons/bs";
import BuyCourseModal from '../components/core/CoursePage/BuyCourseModal';
import {RiVideoFill} from "react-icons/ri";
import {BsChevronDown} from "react-icons/bs";
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from "../components/common/Footer";
import { Link } from 'react-router-dom';

const Course = () => {

  const {courseId} = useParams();
  const {token} = useSelector((state) => state.auth);
  const [coursedata, setcoursedata] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [CollapseAllSections, setCollapseAllSections] = useState(false);

  useEffect(() => {
    const GetFullCourseDetails = async () => {
        try {
            const result = await getFullDetailsOfCourse(courseId, token);
            setcoursedata(result);  
            const count = GetAvgRating(coursedata?.courseDetails?.ratingAndReviews);
            setAvgReviewCount(count); 
        }
        catch(error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    if(courseId){
        GetFullCourseDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[courseId]);

  const GetCountofLectures = () => {
    let totalLectures = 0;
    coursedata?.courseDetails?.courseContent.map((section) => (
        totalLectures += section?.subSection.length
    ))
    return totalLectures;
  }

  const GetTotalDuration = (section, isSection) => {
    let courseTotalHours = 0;
    let courseTotalMinutes = 0;
    let courseTotalSeconds = 0;

    if(isSection){
        section.subSection.forEach((subSection) => {
            const hours = subSection.timeDuration.split(":")[0];
            const minutes = subSection.timeDuration.split(":")[1];
            const seconds = subSection.timeDuration.split(":")[2];
    
            courseTotalHours += parseInt(hours.toString())
            courseTotalMinutes += parseInt(minutes.toString())
            courseTotalSeconds += parseInt(seconds.toString())
        })
    }
    else {
        section?.forEach((content) => {
            content.subSection.forEach((subSection) => {
            const hours = subSection?.timeDuration?.split(":")[0];
            const minutes = subSection?.timeDuration?.split(":")[1];
            const seconds = subSection?.timeDuration?.split(":")[2];

            courseTotalHours += parseInt(hours.toString());
            courseTotalMinutes += parseInt(minutes.toString());
            courseTotalSeconds += parseInt(seconds.toString());
            })
        })
    }

    courseTotalHours += courseTotalMinutes/60;
    courseTotalMinutes = courseTotalMinutes%60 + courseTotalSeconds/60;
    courseTotalSeconds = courseTotalSeconds%60;

    const str = parseInt(courseTotalHours) + "h " + parseInt(courseTotalMinutes) + "m " + parseInt(courseTotalSeconds) + "s";
    return str;
  }

    return (
        (token === null) ? 
        (
            <div className='h-screen flex flex-col gap-y-10 justify-center items-center'>
                
                <h2 className='text-2xl text-white font-inter font-semibold'>
                Please Login or Register to view Courses
                </h2>

                <div className='flex flex-row gap-4'>
                    <Link to="/login">
                        <button className='bg-yellow-50 px-4 py-4 text-black rounded-md font-semibold font-inter
                        hover:scale-95 transition-all duration-200'>
                        Login
                        </button>
                    </Link>

                    <Link to="/signup">
                        <button className='bg-richblack-700 px-4 py-4 text-white rounded-md font-semibold font-inter
                        hover:scale-95 transition-all duration-200'>
                        Sign Up
                        </button>
                    </Link>

                </div>

            </div>
        )
        : (<div className='mt-10'>
        <div className='flex lg:flex-row md:flex-row sm:flex-row'>
            
            <div className='bg-richblack-800 w-[60%] py-10 pl-20'>
                <p className='text-richblack-300 font-medium font-inter mb-4'>{`Home / Learning / `}
                <span className='text-yellow-50 font-semibold font-inter'>
                    {coursedata?.courseDetails?.category?.name}
                </span></p>
                <p className='text-4xl text-white font-semibold font-inter mb-4'> {coursedata?.courseDetails?.courseName} </p>
                <p className='text-richblack-300 font-inter lg:block md:hidden sm:hidden'> 
                {coursedata?.courseDetails?.courseDescription?.split(" ").length > 80 ? coursedata?.courseDetails?.courseDescription.split(" ").splice(0,80).join(" ") + "..." 
                : coursedata?.courseDetails?.courseDescription}
                </p>
                <div className='flex gap-x-3 items-center mt-4 mb-4'>
                    <span className='text-yellow-50 font-semibold'>{avgReviewCount || 0}</span>
                    <RatingStars Review_Count={avgReviewCount} />
                    <span className='text-white font-inter '>{coursedata?.courseDetails?.ratingAndReviews.length} Ratings</span>
                    <span className='text-richblack-300 font-inter'>|</span>
                    <span className='text-white font-inter'>{coursedata?.courseDetails?.studentsEnrolled?.length} {coursedata?.courseDetails?.studentsEnrolled?.length > 1 ? "Students" : "Student"}</span>
                </div>
                <p className='text-richblack-300 font-inter'>Created by 
                <span className='text-white px-1'>{coursedata?.courseDetails?.instructor?.firstName} {coursedata?.courseDetails?.instructor?.lastName}</span>
                </p>
                <div className='flex gap-x-3 items-center mt-4 mb-4'>
                    <div className='flex flex-row gap-x-1 items-center'>
                        <BiTimeFive className='text-white text-xl'/>
                        <span className='text-richblack-300 px-1'>Created At 
                        <span className='text-white font-inter px-2'>{formatDate(coursedata?.courseDetails?.createdAt)}</span>
                        </span>
                    </div>
                    <div className='flex flex-row gap-x-3 items-center'>
                        <BsGlobe className='text-white text-xl'/>
                        <span className='text-richblack-300 font-inter'>English</span>
                    </div>
                </div>
            </div>

            <div className='bg-richblack-800 w-[40%] py-10 px-20 relative'>
                <BuyCourseModal coursedata={coursedata}/>
            </div>

        </div>

        <div className='border-[1px] border-richblack-300 px-5 py-5 lg:w-[55%] mt-5 ml-16'>
            <h2 className='text-white text-3xl'>What you'll learn</h2>
            {
                coursedata?.courseDetails?.whatYouWillLearn.split(".").map((text,index) => (
                    <p key={index} className='text-richblack-300 font-inter pt-2'>
                    {text.length > 0 ? index+1 + ") " + text + "." : ""}
                    </p>
                ))
            }
        </div>

        <div className='w-[55%] mt-8 ml-16 mb-8'>
            <h2 className='text-white text-3xl font-semibold'>Course Content</h2>
            
            <div className='flex flex-row justify-between mb-4 items-center'>
                <div className='flex lg:flex-row md:flex-col sm:flex-col gap-x-3 mt-2'>
                    <span className='text-richblack-300 font-inter'>{coursedata?.courseDetails?.courseContent.length} {coursedata?.courseDetails?.courseContent.length > 1 ? "Sections" : "Section"} </span>
                    <span className='text-richblack-300 lg:block md:hidden sm:hidden'>|</span>
                    <span className='text-richblack-300 font-inter'>{GetCountofLectures()} {GetCountofLectures() > 1 ? "Lectures" : "Lecture"} </span>
                    <span className='text-richblack-300 lg:block md:hidden sm:hidden'>|</span>
                    <span className='text-richblack-300 font-inter'>{GetTotalDuration(coursedata?.courseDetails?.courseContent)} total Length</span>
                </div>

                <div>
                    <p onClick={() => setCollapseAllSections(!CollapseAllSections)}
                    className='text-yellow-50 font-semibold font-inter mt-2 cursor-pointer'>
                        Collapse all Sections
                    </p>
                </div>
            </div>

            {
                coursedata?.courseDetails?.courseContent.map((section) => (
                    <details key={section._id} open={!CollapseAllSections}>

                        <summary className='flex items-center justify-between gap-x-3 border-[1px] border-richblack-300 
                        cursor-pointer text-richblack-300 text-lg py-4 px-5 bg-richblack-700'>
                            <div className='flex flex-row gap-x-3 items-center'>
                                <BsChevronDown className="text-richblack-25"/>
                                <h3 className='text-richblack-25 font-semibold'>{section.sectionName}</h3>
                            </div>
                            <div className='flex flex-row gap-x-3 items-center'>
                                <h3 className='text-yellow-50'>{section.subSection.length} {section.subSection.length > 1 ? "Lectures" : "Lecture"}</h3>
                                <h3 className='text-richblack-100'>{GetTotalDuration(section, true)}</h3>
                            </div>

                        </summary>

                        <div className='border-[1px] border-richblack-300'>
                            {
                                section?.subSection.map((data) => (
                                    <div key={data?._id}>
                                        
                                        <details open>
                                            <summary className='flex flex-row justify-between items-center gap-x-3 
                                            cursor-pointer text-lg py-4 px-5'>
                                                <div className='flex flex-row gap-x-2 items-center'>
                                                    <RiVideoFill className="text-richblack-25"/>
                                                    <h3 className='text-richblack-25 font-semibold'>{data.title}</h3>
                                                    <BsChevronDown className="text-richblack-25"/>
                                                </div>
                                                <h3 className='text-richblack-100'>{data.timeDuration}</h3>
                                            </summary>
                                            <div className='px-5'>
                                                <p className='text-richblack-300 pb-4'>
                                                {data.description.length > 30 ? data.description.split(" ").splice(0,30).join(" ") + "..." : data.description}
                                                </p>
                                            </div>
                                        </details>

                                    </div>
                                ))
                            }
                        </div>

                    </details>
                ))
            }
        
        </div>

        <div className='w-[55%] ml-16 font-inter'>
            <h2 className='text-white text-3xl font-semibold'>Author</h2>
            <div className='flex flex-row gap-x-4 items-center mt-2'>
                <img 
                    src={coursedata?.courseDetails?.instructor?.image}
                    alt={"Instructor Thumbnail"}
                    className='h-14 w-14 rounded-full object-cover'
                />
                <h3 className='text-white text-lg'>{coursedata?.courseDetails?.instructor?.firstName} {coursedata?.courseDetails?.instructor?.lastName}</h3>
            </div>
            <p className='text-richblack-300 font-inter mt-2'>
                I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recording videos. Let's get started!
            </p>

        </div>

        <div className='mx-auto w-full mt-8 flex flex-col'>
             <h2 className='text-center text-white text-3xl font-semibold'>Reviews from Other Learners</h2>
             <ReviewSlider />
        </div>

        <Footer />
    </div>)
  )
}

export default Course

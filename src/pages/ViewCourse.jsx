import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getFullDetailsOfCourse } from '../services/operations/courseAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import { Outlet } from 'react-router-dom';

const ViewCourse = () => {
   
    const [reviewModal, setReviewModal] = useState(null);
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=> {
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length
            })  
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <>
            <div className='relative flex lg:flex-row md:flex-col sm: flex-col min-h-screen w-full pt-12'>
                <div className='lg:h-screen md:max-h-max sm:max-h-max overflow-auto lg:w-[25%] md:w-[100%] sm:w-[100%]'>
                    <VideoDetailsSidebar setReviewModal={setReviewModal} />
                </div>
                <div className='md:max-h-max md:pb-20 sm:max-h-max lg:h-screen overflow-auto lg:w-[75%] md:w-[100%] sm:w-[100%]'>
                    <Outlet />
                </div>
            </div>
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </>
        
    )
}

export default ViewCourse
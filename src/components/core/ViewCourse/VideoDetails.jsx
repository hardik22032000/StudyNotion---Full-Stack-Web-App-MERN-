import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Player } from 'video-react';
import { markLectureAsComplete } from '../../../services/operations/courseAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import IconButton from '../../common/IconButton';

const VideoDetails = () => {

    const {courseId, sectionId, subSectionId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const playerRef = useRef();
    const {token} = useSelector((state)=>state.auth);
    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
    } = useSelector((state)=>state.viewCourse);

    useEffect(()=> {

        const setVideoSpecificDetails = async() => {
            if(!courseSectionData.length)
                return;
            if(!courseId && !sectionId && !subSectionId) {
                navigate("/dashboard/enrolled-courses");
            }
            else {
                const filteredData = courseSectionData?.filter(
                    (section) => section._id === sectionId
                )
    
                const filteredVideoData = filteredData?.[0]?.subSection?.filter(
                    (data) => data._id === subSectionId
                )
    
                setVideoData(filteredVideoData?.[0]);
                setVideoEnded(false);
            }
        }
        setVideoSpecificDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[courseSectionData, courseEntireData, location.pathname]);

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId
        )
    
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
            (data) => data._id === subSectionId
        )
        if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true;
        }
        else {
            return false;
        }
    } 
    
    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId
        )
    
        const noOfSubSections = courseSectionData?.[currentSectionIndex]?.subSection?.length;
    
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
            (data) => data._id === subSectionId
        )
    
        if(currentSectionIndex === courseSectionData.length - 1 &&
            currentSubSectionIndex === noOfSubSections - 1) {
                return true;
            }
        else {
            return false;
        }
    }

    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId
        )
    
        const noOfSubSections = courseSectionData?.[currentSectionIndex]?.subSection?.length;
    
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
            (data) => data._id === subSectionId
        )
    
        if(currentSubSectionIndex !== noOfSubSections - 1) {
            //same section ki next video me jao
            const nextSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex + 1]?._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }
        else {
            //different section ki first video
            const nextSectionId = courseSectionData?.[currentSectionIndex + 1]?._id;
            const nextSubSectionId = courseSectionData?.[currentSectionIndex + 1]?.subSection?.[0]?._id; 
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
    }
    
    const goToPrevVideo = () => {
    
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId
        )
    
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
            (data) => data._id === subSectionId
        )
    
        if(currentSubSectionIndex !== 0 ) {
            //same section , prev video
            const prevSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex - 1]?._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
        else {
            //different section , last video
            const prevSectionId = courseSectionData?.[currentSectionIndex - 1]?._id;
            const prevSubSectionLength = courseSectionData?.[currentSectionIndex - 1]?.subSection?.length;
            const prevSubSectionId = courseSectionData?.[currentSectionIndex - 1]?.subSection?.[prevSubSectionLength - 1]?._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }
    }

    const handleLectureCompletion = async() => {
        ///dummy code, baad me we will replace it witht the actual call
        setLoading(true);
        //PENDING - > Course Progress PENDING
        const res = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);
        //state update
        if(res) {
            dispatch(updateCompletedLectures(subSectionId)); 
        }
        setLoading(false);
    }
 
    return (
        <div className='relative flex flex-col gap-y-2 pt-4'>
            {
                !videoData ? (<div className='flex flex-col h-screen justify-center items-center text-2xl text-[#ff0000]'>
                                No Video Found. Please Try Again.
                            </div>)
                : (
                <Player
                    ref = {playerRef}
                    aspectRatio="16:9"
                    playsInline
                    onEnded={() => setVideoEnded(true)}
                    src={videoData?.videoUrl}
                    
                >

                    {
                        videoEnded && (
                            <div className='flex flex-col gap-y-8 absolute top-[30%] left-[40%] z-[500] px-5 py-5 bg-white bg-opacity-10 backdrop-blur-sm'>
                                {
                                    !completedLectures.includes(subSectionId) && (
                                        <IconButton 
                                            customClasses={"text-lg px-4 py-2 bg-yellow-50 text-black font-semibold font-inter rounded-md"}
                                            disabled={loading}
                                            onclick={() => handleLectureCompletion()}
                                            text={!loading ? "Mark As Completed" : "Loading..."}
                                        />
                                    )
                                }

                                <IconButton 
                                    disabled={loading}
                                    onclick={() => {
                                        if(playerRef?.current) {
                                            playerRef.current?.seek(0);
                                            setVideoEnded(false);
                                        }
                                    }}
                                    text="Rewatch"
                                    customClasses="text-lg px-4 py-2 bg-yellow-50 text-black font-semibold font-inter rounded-md"
                                />

                                <div className={`flex flex-row justify-between
                                ${isFirstVideo() || isLastVideo() ? "mx-auto" : ""}`}>
                                    {!isFirstVideo() && (
                                        <button
                                        disabled={loading}
                                        onClick={goToPrevVideo}
                                        className='blackButton'
                                        >
                                            Prev
                                        </button>
                                    )}
                                    {!isLastVideo() && (
                                        <button
                                        disabled={loading}
                                        onClick={goToNextVideo}
                                        className='blackButton'>
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    }
                </Player>
                )
            }
            <h1 className='text-xl text-white font-semibold font-inter px-5 py-2'>{videoData?.title}</h1>
            <p className='text-lg text-richblack-300 font-inter px-5'>{videoData?.description}</p>
        </div>
    )
}

export default VideoDetails
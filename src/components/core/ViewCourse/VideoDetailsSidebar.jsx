import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {IoMdArrowDropup, IoMdArrowDropdown} from "react-icons/io";
import {IoMdArrowRoundBack, IoIosAddCircle} from "react-icons/io";
import {SiAirplayvideo} from "react-icons/si";

const VideoDetailsSidebar = ({setReviewModal}) => {
    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state)=>state.viewCourse);

    useEffect(()=> {
        const setActiveFlags = () => {
            if(!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            //set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //set current sub-section here
            setVideoBarActive(activeSubSectionId);
        }
        setActiveFlags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[courseSectionData, courseEntireData, location.pathname]);

    const GetSectionTimeDuration = (section) => {
        let sectionTotalHours = 0;
        let sectionTotalMinutes = 0;
        let sectionTotalSeconds = 0;

        section?.subSection?.forEach((subsection) => {
            const hours = subsection.timeDuration.split(":")[0];
            const minutes = subsection.timeDuration.split(":")[1];
            const seconds = subsection.timeDuration.split(":")[2];

            sectionTotalHours += parseInt(hours.toString())
            sectionTotalMinutes += parseInt(minutes.toString())
            sectionTotalSeconds += parseInt(seconds.toString())
        })

        sectionTotalHours += sectionTotalMinutes/60;
        sectionTotalMinutes = sectionTotalMinutes%60 + sectionTotalSeconds/60;
        sectionTotalSeconds = sectionTotalSeconds%60;

        const str = parseInt(sectionTotalHours) + ":" + parseInt(sectionTotalMinutes) + ":" + parseInt(sectionTotalSeconds);
        return str;
    }
    return (
        <div className=' bg-richblack-800 flex flex-col gap-y-2 h-full py-5'>

            {/* for buttons and headings */}
            <div className='flex flex-col gap-y-8 pb-5 border-b-2 border-richblack-300 px-4'>
                {/* for buttons */}
                <div className='flex flex-row justify-between items-center'>
                    <div className='bg-white rounded-full text-black flex justify-center items-center px-2 py-2 cursor-pointer'
                    onClick={()=> {
                        navigate("/dashboard/enrolled-courses")
                    }}
                    >
                        <IoMdArrowRoundBack />
                    </div>

                    <div>
                        <button 
                            onClick={() => setReviewModal(true)}
                            className="px-2 py-2 text-black bg-yellow-50 font-semibold font-inter rounded-md 
                            flex flex-row gap-x-1 items-center border-[1px] border-black hover:scale-95 transition-all duration-200"
                        >
                            <IoIosAddCircle />
                            Add Review
                        </button>
                    </div>
                </div>

                {/* for heading or title */}
                <div className='flex flex-row gap-4 justify-between items-center'>
                    <h2 className='text-xl font-inter text-white font-semibold w-[75%] '>{courseEntireData?.courseName}</h2>
                    <p className='text-lg font-inter text-richblack-300 w-max'>{completedLectures?.length} / {totalNoOfLectures}</p>
                </div>
            </div>

            {/* for sections and subSections */}
            <div className='flex flex-col py-10'>
                {
                    courseSectionData.map((section, index)=> (
                        <div 
                        onClick={() => setActiveStatus(section?._id)}
                        key={index}
                        >
                            {/* section */}
                            <div className='bg-richblack-700 py-5 px-5 border-b-2 border-richblack-300 flex flex-row justify-between cursor-pointer'>
                                <div className='font-semibold font-inter text-white'>
                                    {section?.sectionName}
                                </div>
                                <div className='flex flex-row gap-x-2 items-center cursor-pointer text-white'>
                                    {GetSectionTimeDuration(section)}
                                    {activeStatus === section._id ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                                </div>
                            </div>

                            {/* subSections */}
                            <div className='flex flex-col gap-y-2'>
                                {
                                    activeStatus === section?._id && (
                                        <div>
                                            {
                                                section.subSection.map((topic, index) => (
                                                    <div
                                                    className={`flex items-center justify-between gap-3 p-5 font-inter cursor-pointer ${
                                                        videoBarActive === topic._id
                                                        ? "bg-yellow-100 text-richblack-900 font-semibold"
                                                        : "bg-richblack-900 text-white font-semibold"
                                                    }`}
                                                    key={index}
                                                    onClick={() => {
                                                        navigate(
                                                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                                                        )
                                                        setVideoBarActive(topic?._id);
                                                    }}
                                                    >
                                                        <div className='flex flex-row items-center gap-x-3'>
                                                            <input
                                                                type='checkbox'
                                                                checked= {completedLectures.includes(topic?._id)}
                                                                onChange={() => {}}
                                                            />
                                                            <div className='flex flex-row gap-3 items-center' >
                                                                {topic.title}
                                                                <SiAirplayvideo />
                                                            </div>
                                                        </div>

                                                        <div className='text-white'>
                                                            {topic.timeDuration}
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default VideoDetailsSidebar
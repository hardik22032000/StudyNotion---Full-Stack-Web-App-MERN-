import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import ProgressBar from '@ramonak/react-progress-bar';
import Spinner from "../../common/Spinner";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Link } from 'react-router-dom';

const EnrolledCourses = () => {

    const {token}  = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch(error) {
            console.log("Unable to Fetch Enrolled Courses");
        }
    }

    useEffect(()=> {
        getEnrolledCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const CalculateTimeDuration = (course) => {
        let courseTotalHours = 0;
        let courseTotalMinutes = 0;
        let courseTotalSeconds = 0;

        course.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
            const hours = subSection.timeDuration.split(":")[0];
            const minutes = subSection.timeDuration.split(":")[1];
            const seconds = subSection.timeDuration.split(":")[2];

            courseTotalHours += parseInt(hours.toString())
            courseTotalMinutes += parseInt(minutes.toString())
            courseTotalSeconds += parseInt(seconds.toString())
            })
        })

        courseTotalHours += courseTotalMinutes/60;
        courseTotalMinutes = courseTotalMinutes%60 + courseTotalSeconds/60;
        courseTotalSeconds = courseTotalSeconds%60;

        const str = parseInt(courseTotalHours) + "h " + parseInt(courseTotalMinutes) + "min " + parseInt(courseTotalSeconds) + "s";
        return str;
    }


  return (
    <div className='text-white py-5'>
        <p className='text-richblack-300 font-medium font-inter mb-4'>{`Home / Dashboard / `}
        <span className='text-yellow-50 font-semibold font-inter'>Enrolled Courses</span>
        </p>
        <h2 className="text-3xl font-inter font-semibold text-white">Enrolled Courses</h2>
        {
            !enrolledCourses ? (<div className='flex flex-col h-screen justify-center items-center'>
                <Spinner />
            </div>)
            : !enrolledCourses.length ? (<div className='flex flex-col h-screen justify-center items-center'><p className='text-2xl text-white font-inter font-semibold'>You have not enrolled in any course yet</p></div>)
            : (
                <Table className="rounded-xl border-2 border-richblack-800 mt-5">
                    <Thead>
                        <Tr className="flex gap-x-16 rounded-t-md border-b-2 border-b-richblack-800 px-6 py-2">
                            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                                Course Name
                            </Th>
                            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                                Duration
                            </Th>
                            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                                Progress
                            </Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                    {
                        enrolledCourses.map((course,index)=> (
                            <Tr key={course._id}
                            className="flex gap-x-10 border-b-2 border-richblack-800 px-6 py-8 ">
                                <Td className="flex flex-1 gap-x-4">
                                    <img className="h-[148px] lg:w-[200px] max-w-[250px] rounded-lg object-cover md:w-0 sm:w-0"
                                    src={course.thumbnail} alt={`Course - ${course.courseName}`}/>
                                    <div className='flex flex-col gap-y-2'>
                                        <Link to={`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`}>
                                        <p className="text-lg font-semibold text-richblack-5">{course.courseName}</p>
                                        </Link>
                                        <p className="text-xs text-richblack-300 lg:block md:hidden sm:hidden">
                                            {course?.courseDescription.split(" ").length > 100
                                            ? course?.courseDescription.split(" ").slice(0, 100).join(" ") + "..."
                                            : course?.courseDescription}
                                        </p>
                                    </div>
                                </Td>

                                <Td>
                                    {CalculateTimeDuration(course)}
                                </Td>

                                <Td className="flex flex-col gap-y-4">
                                    <p>Progress: {course.progressPercentage || 0}%</p>
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='15px'
                                        isLabelVisible={false}
                                    />
                                </Td>
                            </Tr>
                        ))
                    }
                    </Tbody>
                </Table>
            )
        }
      
    </div>
  )
}

export default EnrolledCourses

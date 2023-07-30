import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { formatDate } from '../../../utils/formatDate';
import {HiClock} from "react-icons/hi";
import {FaCheck} from "react-icons/fa";
import {COURSE_STATUS} from "../../../utils/constants";
import {FiEdit2} from "react-icons/fi";
import {RiDeleteBin6Line} from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from "../../common/ConfirmationModal";
import { useSelector } from 'react-redux';
import { deleteCourse } from '../../../services/operations/courseAPI';
import { fetchInstructorCourses } from '../../../services/operations/courseAPI';


const CoursesTable = ({courses,setCourses}) => {
  const TRUNCATE_LENGTH = 30;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const [deleteAllCourses, setdeleteAllCourses] = useState(false);
  const [deleteCoursesId, setdeleteCoursesId] = useState([]);

  const MyRange = [
    {
        StartIndex : 1,
        EndIndex : 10,
    },
    {
        StartIndex : 1,
        EndIndex : 15,
    },
    {
        StartIndex : 1,
        EndIndex : 20,
    },
    {
        StartIndex : 1,
        EndIndex : 25,
    },
    {
        StartIndex : 1,
        EndIndex : 50,
    },
    {
        StartIndex : 1,
        EndIndex : 100,
    }
  ];

  const [selectedOption, setSelectedOption] = useState("1-5");
  const [DisplayCourses, setDisplayCourses] = useState([]);

  const handleCourseDisplayAccToRange = (e) => {
    const start = selectedOption.split("-")[0].trim();
    const end = selectedOption.split("-")[1].trim();
    setDisplayCourses(courses.slice(start-1,end));
  }

  useEffect(() => {
    handleCourseDisplayAccToRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedOption]);

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  const handleDeleteAllorFewCourses = async () => {
    setLoading(true)
    
    if(deleteAllCourses){
        DisplayCourses?.map(async (course) => {
            await deleteCourse({ courseId: course._id }, token)
        })
    }
    
    else{
        deleteCoursesId?.map(async (courseId) => {
            await deleteCourse({ courseId: courseId }, token)
        })
    }

    const result = await fetchInstructorCourses(token)
    if (result) {
        setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
    window.location.reload();
  }

  const AddorRemoveDeleteCourse = (CourseId) => {
    if(deleteCoursesId.includes(CourseId)){
        const NewDeletedCoursesId = [];
        deleteCoursesId.map((course_id) => (
            course_id !== CourseId ? NewDeletedCoursesId.push(course_id) : ""
        ));
        setdeleteCoursesId(NewDeletedCoursesId);
    }
    else{
        deleteCoursesId.push(CourseId);
        setdeleteCoursesId([...deleteCoursesId]);
    }
  }

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
    <div className='flex flex-col mt-10'>

        <div className='flex flex-row justify-between mb-5'>
            
            <div>
            {
                ( <button
                    disabled={loading}
                    onClick={() => 
                        {
                            if(deleteAllCourses || deleteCoursesId.length !== 0){
                            setConfirmationModal({
                                text1: deleteAllCourses ? `Do you want to delete all courses?` : `Do you want to delete selected courses?`,
                                text2: "All the data related to the courses will be deleted",
                                btn1Text: !loading ? "Delete" : "Loading...  ",
                                btn2Text: "Cancel",
                                btn1Handler: !loading
                                ? () => handleDeleteAllorFewCourses()
                                : () => {},
                                btn2Handler: !loading
                                ? () => setConfirmationModal(null)
                                : () => {},
                            })}
                            else{
                            (!deleteAllCourses || deleteCoursesId.length === 0) &&
                            setConfirmationModal({
                                text1: "Please select courses to be deleted",
                                text2: "You have not selected any course to be deleted yet.",
                                btn2Text: "Ok",
                                btn2Handler: () => setConfirmationModal(null),
                            })}
                        }
                    }
                    className='flex flex-row text-richblack-25 bg-pink-900 px-5 py-2 justify-center 
                    items-center rounded-md font-bold hover:scale-95 transition-all duration-200'>
                    Delete Courses
                </button>)
            }
            </div>

            <div className='flex flex-row gap-x-4 items-center'>
                <h2 className='text-white font-inter font-semibold'>
                Showing 
                <span className='text-yellow-50 px-1'>{`1 - ${DisplayCourses.length}`}</span>
                <span className='px-1'>of</span>
                <span className='text-yellow-50 px-1'>{courses.length}</span>
                courses per page</h2>

                {/* Courses count dropdown */}
                <select
                value={selectedOption}
                onChange={e => setSelectedOption(e.target.value)}
                className='bg-richblack-600 text-richblack-5 py-1
                rounded-md border-r-8 border-r-transparent'
                name='courseDisplayCount'
                id='courseDisplayCount'
                >
                <option value="1-5" selected>
                    {
                        courses.length < 5 ? `1 - ${courses.length}` : "1 - 5"
                    }
                </option>
                {
                    MyRange.map((range) => (
                        <option value={`${range.StartIndex}-${range.EndIndex}`}>
                        {range.StartIndex} - {range.EndIndex}
                        </option>
                    ))   
                }
                </select>
            </div>

        </div>


        <Table className="rounded-xl border-2 border-richblack-800">

            <Thead>
                <Tr className="flex gap-x-10 rounded-t-md border-b-2 border-b-richblack-800 px-6 py-2">
                    <Th>
                        <input onChange={() => setdeleteAllCourses(!deleteAllCourses)}
                            checked={deleteAllCourses}
                            type="checkbox"
                            className="cursor-pointer border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                        />       
                    </Th>
                    
                    <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                        Courses
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Duration
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Price
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                        Actions
                    </Th>
                </Tr>
            </Thead>

            <Tbody>
              {
                DisplayCourses?.map((course) => (
                    <Tr key={course._id}
                    className="flex gap-x-11 border-b-2 border-richblack-800 px-6 py-8 ">
                        <Td>
                            {
                                deleteAllCourses ?
                                (<input 
                                type="checkbox"
                                className="cursor-pointer border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                                checked={deleteAllCourses} 
                                />) :
                                (<input onChange={() => AddorRemoveDeleteCourse(course._id)}
                                type="checkbox"
                                className="cursor-pointer border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5" 
                                />)
                            }
                        </Td>


                        <Td className="flex flex-1 gap-x-4 ">
                            <div className="flex flex-col justify-between">
                                <img
                                src={course?.thumbnail}
                                alt={course?.courseName}
                                className="h-[148px] w-[200px] max-w-[250px] rounded-lg object-cover lg:block md:hidden sm:hidden"
                                />
                            </div>
                            <div className="flex flex-col justify-between">
                                <p className="lg:text-lg md:text-base sm:text-base font-semibold text-richblack-5">
                                    {course?.courseName}
                                </p>
                                <p className="text-xs text-richblack-300 lg:block md:hidden sm:hidden">
                                    {course?.courseDescription.split(" ").length > TRUNCATE_LENGTH
                                    ? course?.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                                    : course?.courseDescription}
                                </p>
                                <p className="text-[12px] text-white lg:block md:hidden sm:hidden">
                                    Created: {formatDate(course.createdAt)}
                                </p>
                                {course.status === COURSE_STATUS.DRAFT ? (
                                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                        <HiClock size={14} />
                                        Drafted
                                    </p>
                                    ) : (
                                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                        <FaCheck size={8} />
                                        </div>
                                        Published
                                    </p>
                                )}
                            </div>
                        </Td>

                        <Td className="text-sm font-medium text-blue-100 flex flex-col items-center justify-center px-2">
                            {CalculateTimeDuration(course)}
                        </Td>

                        <Td className="text-sm font-medium text-yellow-50 flex flex-col justify-center">
                            ₹{course.price}
                        </Td>

                        <Td className="text-sm font-medium text-richblack-100 flex flex-col justify-center">
                            
                            <div className='flex flex-row'>
                                <button disabled={loading}
                                    onClick={() => {
                                        navigate(`/dashboard/edit-course/${course._id}`)
                                    }}
                                    title="Edit"
                                    className="px-2 text-caribbeangreen-300 transition-all duration-200 hover:scale-110"
                                >
                                    <FiEdit2 size={20} />
                                </button>

                                <button
                                    disabled={loading}
                                    onClick={() => {
                                        setConfirmationModal({
                                            text1: "Do you want to delete this course?",
                                            text2: "All the data related to this course will be deleted",
                                            btn1Text: !loading ? "Delete" : "Loading...  ",
                                            btn2Text: "Cancel",
                                            btn1Handler: !loading
                                            ? () => handleCourseDelete(course._id)
                                            : () => {},
                                            btn2Handler: !loading
                                            ? () => setConfirmationModal(null)
                                            : () => {},
                                        })
                                    }}
                                    title="Delete"
                                    className="px-1 text-[#ff0000] transition-all duration-200 hover:scale-110"
                                >
                                    <RiDeleteBin6Line size={20} />
                                </button>
                            </div>

                        </Td>

                    </Tr>
                ))
              }
            </Tbody>

        </Table>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CoursesTable;
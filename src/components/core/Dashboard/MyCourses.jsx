import React from 'react';
import {MdAddCircleOutline} from "react-icons/md";
import { Link } from 'react-router-dom';
import CoursesTable from '../InstructorCourses/CoursesTable';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchInstructorCourses } from '../../../services/operations/courseAPI';
import Spinner from '../../common/Spinner';

const MyCourses = () => {
  
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const {token} = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    }

    setLoading(true);
    fetchCourses();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='w-full flex flex-col mt-5'>
        
        <div className='flex flex-row justify-between items-center'>
            <h1 className='text-3xl text-white font-semibold font-inter'>My Courses</h1>
            
            <Link to="/dashboard/add-course">
                <button
                    className='flex flex-row gap-x-2 text-black bg-yellow-50 px-5 py-2 justify-center items-center rounded-md font-bold hover:scale-95 transition-all duration-200'>
                    <MdAddCircleOutline className='text-black' size={20}/> New 
                </button>
            </Link>
        </div>

        { loading ? <div className='flex flex-row h-screen w-full justify-center items-center'><Spinner /></div> 
        : courses.length > 0 ? (<CoursesTable courses={courses} setCourses={setCourses} />) 
        : (<h2 className='flex flex-row h-screen text-3xl text-white justify-center items-center'>No courses Found</h2>)}
    </div>
  )
}

export default MyCourses;
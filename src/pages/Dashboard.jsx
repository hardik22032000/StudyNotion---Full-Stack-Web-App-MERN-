import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
  
  const {loading: authloading} = useSelector((state) => state.auth);
  const {loading: profileloading} = useSelector((state) => state.profile);

  if(profileloading || authloading){
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <Spinner />
        </div>
    );
  }

  return (
    <div className='relative flex flex-row min-h-screen w-full mt-10'>
        <Sidebar />
        <div className='h-screen overflow-auto lg:w-[85%] md:w-[85%] sm:w-[75%]'>
            <div className='mx-auto w-11/12 lg:max-w-[1000px] py-5'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard

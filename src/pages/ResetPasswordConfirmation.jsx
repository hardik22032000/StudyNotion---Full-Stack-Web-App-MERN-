import React from 'react';
import { Link } from 'react-router-dom';
import {BsArrowLeft} from "react-icons/bs";
import Spinner from '../components/common/Spinner';
import { useSelector } from 'react-redux';

const ResetPasswordConfirmation = () => {

  const {loading} = useSelector((state) => state.auth);

  return (
    <div className='font-inter text-white flex flex-col items-center justify-center
    h-screen w-[500px]  mx-auto px-10'>
        {
          loading ? <Spinner />
          : (
            <div>
                <h1 className='text-3xl font-inter text-richblack-5 mb-[10px]'>Reset complete !</h1>
                <p className='font-[16px] text-richblack-200 font-inter pr-5 mb-[20px]'>All done! We have sent an email to confirm.</p>

                <Link to="/login">
                    <button className='bg-yellow-100 text-richblack-800 font-inter px-[10px] py-[10px] flex justify-center items-center w-full rounded-md mb-[20px]'>
                        Return to Login
                    </button>
                </Link>

                <div className='flex flex-row w-full'>
                    <Link to="/login" className='flex flex-row w-full gap-x-2 items-center'>
                        <BsArrowLeft />
                        <p>Back to Login</p>
                    </Link>
                </div>

            </div>
          )
        }
    </div>
  )
}

export default ResetPasswordConfirmation;
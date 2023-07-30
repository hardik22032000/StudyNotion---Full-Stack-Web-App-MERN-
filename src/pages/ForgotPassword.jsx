import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BsArrowLeft} from "react-icons/bs";
import { Link } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import {getPasswordResetToken} from "../services/operations/authAPI";

const ForgotPassword = () => {

    const {loading} = useSelector((state) => state.auth);
    const [EmailSent, setEmailSent] = useState(false);
    const [Email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(Email, setEmailSent));
    }

  return (
    <div className='font-inter text-white flex flex-col items-center justify-center
     h-screen w-[500px]  mx-auto px-10'>
        {
            loading ? (<Spinner />)
            : (
                <div>
                    <h1 className='text-3xl font-inter text-richblack-5 mb-[10px]'>
                        {
                            !EmailSent ? "Reset your password" : "Check Your Email"
                        }
                    </h1>

                    <p className='font-[16px] text-richblack-200 font-inter pr-5 mb-[20px]'>
                        {
                            !EmailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery." 
                            : `We have sent the reset email to ${Email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {
                            !EmailSent && (
                                <label className='font-[16px] text-richblack-200 font-inter flex flex-col gap-4'>
                                    <p >Email Address
                                    <sup className='text-[#FF0000] text-[16px]'>*</sup>
                                    </p>
                                    <input
                                    className='text-white bg-richblack-800 px-[10px] py-[10px] rounded-md border-b-2 border-richblack-100 mb-[30px]'
                                    required
                                    type="email"
                                    name="email"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter Your Email Address'
                                     />
                                </label>
                            )
                        }
                        <button className='bg-yellow-100 text-richblack-800 font-inter px-[10px] py-[10px] flex justify-center items-center w-full rounded-md mb-[20px]'>
                            {
                                !EmailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>

                    <div className='flex flex-row w-full'>
                        <Link to="/login" className='flex flex-row w-full gap-x-2 items-center'>
                            <div>
                                <BsArrowLeft />
                            </div>
                            <div>
                                <p>Back to Login</p>
                            </div>
                        </Link>
                    </div>

                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword;
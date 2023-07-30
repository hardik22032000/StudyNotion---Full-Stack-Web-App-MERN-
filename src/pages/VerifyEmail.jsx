import React, { useEffect, useState } from 'react';
import Spinner from '../components/common/Spinner';
import OtpInput from "react-otp-input";
import {RxCountdownTimer} from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {sendOtp, signUp} from "../services/operations/authAPI";
import { Link } from 'react-router-dom';
import {BsArrowLeft} from "react-icons/bs";

const VerifyEmail = () => {
  
  const {signupData, loading} = useSelector((state) => state.auth);
  const [otp, setotp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect( () => {
    if(!signupData){
        navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
  } = signupData;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  }


  return (
    <div className='font-inter text-white flex flex-col items-center justify-center
    h-screen w-[500px] mx-auto'>
        {
            loading ? <Spinner />
        : (
            <div>
                <h1 className='text-3xl font-inter text-richblack-5 mb-[10px]'>Verify Email</h1>
                <p className='font-[16px] text-richblack-200 font-inter mb-[20px] pr-10'>A verification code has been sent to you. Enter the code below.</p>

                <form onSubmit={handleOnSubmit}>
                    <OtpInput 
                    value={otp} 
                    onChange={setotp} 
                    autoFocus 
                    numInputs={6}
                    otpType="number" 
                    disabled={false} 
                    secure
                    renderInput={(props) => 
                        <input
                        {...props} placeholder='-'
                        style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                        />
                    }
                    containerStyle={{
                        justifyContent: "space-between",
                        gap: "0 6px",
                    }}
                    />
                    
                    <button type='submit' className='mt-[20px] bg-yellow-100 text-richblack-800 font-inter px-[10px] py-[10px] flex justify-center items-center w-full rounded-md mb-[20px]'>
                        Verify Email
                    </button>
                </form>

                <div className='flex flex-row w-full items-center px-1'>
                    <div className='flex flex-row w-[50%] justify-start'>
                        <Link to="/login" className='flex flex-row gap-x-2 items-center'>
                            <BsArrowLeft />
                            <p>Back to Login</p>
                        </Link>
                    </div>
                    <div className='flex flex-row w-[50%] justify-end'>
                        <button className='flex flex-row gap-x-2 items-center text-blue-100'
                        onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
                            <RxCountdownTimer />
                            Resend it
                        </button>
                    </div>
                </div>

            </div>
          )
        }
    </div>
  )
}

export default VerifyEmail;
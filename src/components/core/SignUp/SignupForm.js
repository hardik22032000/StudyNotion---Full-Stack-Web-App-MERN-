import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {toast} from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { useDispatch } from 'react-redux';
import {setSignupData} from "../../../slices/authSlice";
import {sendOtp} from "../../../services/operations/authAPI";

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const { email, password, confirmPassword } = formData;

    function changeHandler(event) {
        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )
    }

    function submitHandler(event) {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return;
        }

        const signupData = {
            ...formData,
            accountType,
          }

        console.log("printing signup account data ");
        console.log(signupData);

        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData))
        // Send OTP to user for verification
        dispatch(sendOtp(email, navigate))

        // Reset
        setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }


  return (
    <div>
                {/* student-Instructor tab */}
                <div
                className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>

                    <button
                    className={`${accountType === ACCOUNT_TYPE.STUDENT
                    ?
                    "bg-richblack-900 text-richblack-5"
                    :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={()=> setAccountType(ACCOUNT_TYPE.STUDENT)}>
                        Student
                    </button>

                    <button
                    className={`${accountType === ACCOUNT_TYPE.INSTRUCTOR
                    ?
                    "bg-richblack-900 text-richblack-5"
                    :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}>
                        Instructor
                    </button>
                </div>

                <form onSubmit={submitHandler} >
                {/* first name and lastName */}
                    <div className='flex gap-x-4 mt-[20px]'>
                            <label className='w-full'>
                                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                                <input
                                    required
                                    type="text"
                                    name="firstName"
                                    onChange={changeHandler}
                                    placeholder="Enter First Name"
                                    value={formData.firstName}
                                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                                />
                            </label>

                            <label className='w-full'>
                                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                                <input
                                    required
                                    type="text"
                                    name="lastName"
                                    onChange={changeHandler}
                                    placeholder="Enter Last Name"
                                    value={formData.lastName}
                                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                                />
                            </label>
                    </div>
                    {/* email Add */}
                    <div className='mt-[20px]'>
                    <label className='w-full mt-[20px]'>
                            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                            <input
                                required
                                type="email"
                                name="email"
                                onChange={changeHandler}
                                placeholder="Enter Email Address "
                                value={formData.email}
                                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                            />
                    </label>
                    </div>
                    

                    {/* createPassword and Confirm Password */}
                    <div className='w-full flex gap-x-4 mt-[20px]'>
                        <label className='w-full relative'>
                            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                            <input
                                required
                                type= {showPassword ? ("text") : ("password")}
                                name="password"
                                onChange={changeHandler}
                                placeholder="Enter Password"
                                value={formData.password}
                                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                            />
                            <span
                            className='absolute right-3 top-[38px] cursor-pointer' 
                            onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? 

                                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                            </span>
                        </label>

                        <label className='w-full relative'>
                            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                            <input
                                required
                                type= {showConfirmPassword ? ("text") : ("password")}
                                name="confirmPassword"
                                onChange={changeHandler}
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                            />
                            <span 
                            className='absolute right-3 top-[38px] cursor-pointer'
                            onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                {showConfirmPassword ?

                                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                            </span>
                        </label>
                    </div>
                <button className=' w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                    Create Account
                </button>
                </form>
    </div>
  )
}

export default SignupForm;

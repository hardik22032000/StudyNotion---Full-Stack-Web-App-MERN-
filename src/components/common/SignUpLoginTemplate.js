import React from 'react';
import frameImage from "../../assets/Images/frame.png";
import SignupForm from '../core/SignUp/SignupForm';
import LoginForm from '../core/Login/LoginForm';

const Template = ({title, desc1, desc2, image, formtype}) => {

  return (
    <div className='flex lg:flex-row md:flex-col-reverse sm:flex-col-reverse justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 lg:gap-y-0 md:gap-y-10 sm:gap-y-10 lg:items-start md:items-center sm:items-center'>

        <div className='w-11/12 lg:max-w-[450px]' >
            <h1
            className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]' 
            >
                {title}
            </h1>

            <p className='text-[1.125rem] leading[1.625rem] mt-4' >
                <span className='text-richblack-100'>{desc1}</span>
                <br/>
                <span className='text-blue-100 italic'>{desc2}</span>
            </p>

            {formtype === "signup" ? 
            (<SignupForm />):
            (<LoginForm />)}

            {/* <div className='flex w-full items-center my-4 gap-x-2'>
                <div className='w-full h-[1px] bg-richblack-700'></div>
                <p className='text-richblack-700 font-medium leading[1.375rem]'>
                    OR
                </p>
                <div className='w-full h-[1px] bg-richblack-700'></div>
            </div>

            <button className='w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100
            border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 '>
                <FcGoogle/>
                <p>Sign Up with Google</p>
            </button> */}

        </div>

        <div className='relative w-11/12 lg:max-w-[450px]'>
            <img src={frameImage}
                alt="Pattern"
                width={558}
                height={504}
                loading="lazy"/>

            <img src={image}
                alt="Students"
                width={558}
                height={490}
                loading="lazy"
                className='absolute -top-4 lg:right-4 md:right-24 sm:right-4'
                />    
        </div>

    </div>
  )
}

export default Template;
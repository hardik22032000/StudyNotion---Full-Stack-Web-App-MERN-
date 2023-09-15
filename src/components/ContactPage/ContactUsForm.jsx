import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from "../common/Spinner";
import CountryCode from "../../data/countrycode.json";
import { contactusEndpoint } from '../../services/apis';
import {apiconnector} from "../../services/apiconnector";

const ContactUsForm = () => {

  const [loading, setloading] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    
    try{
        setloading(true);
        const response = await apiconnector("POST",contactusEndpoint.CONTACT_US_API, data);
        setloading(false);
    }
    catch(error){
        console.log("Error: ", error.message);
        setloading(false);
    }
  }

  useEffect(() => {
    if(isSubmitSuccessful){
        reset({
            email:"",
            firstname:"",
            lastname:"",
            message:"",
            phoneNo:""
        })
    }
  },[isSubmitSuccessful, reset]);

  return (
    <div className='flex flex-col justify-center items-center'>
    {
        loading ? <Spinner />
        : (
            <form onSubmit={handleSubmit(submitContactForm)} className='lg:w-[600px] flex flex-col gap-2'>
     
                <div className='flex flex-row gap-4'>

                    {/* first name */}
                    <div className='w-[50%] flex flex-col items-start px-2 py-2'>
                        <label htmlFor='firstname' className='text-base text-richblack-50 font-inter mb-2'>First Name</label>
                        <input
                            className='bg-richblack-800 text-white px-3 py-3 
                            rounded-md w-full border-b-2 border-richblack-100'
                            type='text'
                            name='firstname'
                            id='firstname'
                            placeholder='Enter first Name'
                            {...register("firstname",{required: true})}
                        />
                        {
                            errors.firstname && (
                                <span className='text-[#FF0000]'>
                                    Please Enter your first Name
                                </span>
                            )
                        }  
                    </div>

                    {/* last name */}
                    <div className='w-[50%] flex flex-col items-start px-2 py-2'>
                        <label htmlFor='lastname' className='text-base text-richblack-50 font-inter mb-2'>Last Name</label>
                        <input
                            className='bg-richblack-800 text-white px-3 py-3 
                            rounded-md w-full border-b-2 border-richblack-100'
                            type='text'
                            name='lastname'
                            id='lastname'
                            placeholder='Enter last Name'
                            {...register("lastname")}
                        />  
                    </div>

                </div>

                <div>
                    {/* email address */}
                    <div className='flex flex-col items-start px-2 py-2'>
                        <label htmlFor='email' className='text-base text-richblack-50 font-inter mb-2'>Email Address</label>
                        <input
                            className='bg-richblack-800 text-white px-3 py-3 
                            rounded-md w-full border-b-2 border-richblack-100'
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Enter Email Address'
                            {...register("email",{required: true})}
                        />
                        {
                            errors.email && (
                                <span className='text-[#FF0000]'>
                                    Please Enter your Email
                                </span>
                            )
                        }  
                    </div>
                </div>

                <div>
                    {/* Phone Number */}
                    <div className='flex flex-col px-2 py-2'>
                        <label htmlFor='phoneNo' className='text-base text-richblack-50 font-inter mb-2'>Phone Number</label>
                        
                        <div className='flex flex-row gap-1 w-full justify-between'>
                            
                            <div className='flex flex-col w-[14%] gap-2'>
                                <select
                                 className='bg-richblack-800 text-white px-3 py-3
                                rounded-md border-b-2 border-richblack-100 border-r-8 border-r-transparent'
                                 name='dropdown'
                                 id='dropdown'
                                 {...register("countrycode",{required: true})}
                                >
                                {
                                    CountryCode.map((element, index) => (
                                        (
                                            <option key={index} value={element.code}>
                                            {element.code} - {element.country}
                                            </option>
                                        )
                                    ))
                                }
                                </select>
                            </div>

                            <div className='flex flex-col w-[80%] gap-2'>
                            
                                <input
                                    className='bg-richblack-800 text-white px-3 py-3 
                                    rounded-md w-full border-b-2 border-richblack-100'
                                    type='tel'
                                    name='phoneNo'
                                    id='phoneNo'
                                    placeholder='12345 67890'
                                    {...register("phoneNo", 
                                    {
                                        required: {value: true, message:"Please enter Phone Number"},
                                        maxLength: {value: 10, message:"Invalid Phone Number"},
                                        minLength: {value: 8, message:"Invalid Phone Number"}
                                    }
                                    )}
                                />
                                {
                                    errors.phoneNo && (
                                        <span className='text-[#FF0000]'>
                                            {errors.phoneNo.message}
                                        </span>
                                    )
                                }  
                            </div>

                        </div>
                        
                    </div>
                </div>

                <div>
                    {/* Message */}
                    <div className='flex flex-col items-start px-2 py-2'>
                        <label htmlFor='message' className='text-base text-richblack-50 font-inter mb-2'>Message</label>
                        <textarea rows={7} cols={30}
                            className='bg-richblack-800 text-white px-3 py-3 
                            rounded-md w-full border-b-2 border-richblack-100'
                            type='text'
                            name='message'
                            id='message'
                            placeholder='Please Enter your Message here'
                            {...register("message")}
                        />
                    </div>
                </div>

                <div>
                    <button type='submit'
                    className={`text-center text-[13px] px-6 py-3 rounded-md font-bold w-full
                bg-yellow-50 text-black hover:scale-95 transition-all duration-200`}>
                        Send Message
                    </button>
                </div>

            </form>
        )
    }
    </div>
  )
}

export default ContactUsForm;
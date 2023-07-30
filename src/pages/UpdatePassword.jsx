import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {BsArrowLeft} from "react-icons/bs";
import Spinner from '../components/common/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {resetPassword, ResetPasswordConfirmation} from "../services/operations/authAPI";
import {TiTick} from "react-icons/ti";
import {ImCross} from "react-icons/im";

const UpdatePassword = () => {

  const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
  })

  const {password, confirmPassword} = formData;

  const {loading} = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [lowercasePresent, setlowercasePresent] = useState(false);
  const [uppercasePresent, setuppercasePresent] = useState(false);
  const [specialcharPresent, setspecialcharPresent] = useState(false);
  const [char8minPresent, setchar8minPresent] = useState(false);
  const [numberpresent, setnumberpresent] = useState(false);

  useEffect(() => {
    if(formData.password.toUpperCase() !== formData.password)
        setlowercasePresent(true);
    else
        setlowercasePresent(false);

    if(formData.password.toLowerCase() !== formData.password)
        setuppercasePresent(true);
    else
        setuppercasePresent(false);
    
    // eslint-disable-next-line
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(specialChars.test(formData.password))
        setspecialcharPresent(true);
    else
        setspecialcharPresent(false);

    if(formData.password.length >=8)
        setchar8minPresent(true);
    else
        setchar8minPresent(false);
    
    const hasNumber = /\d/; 

    if(hasNumber.test(formData.password))
        setnumberpresent(true);
    else
        setnumberpresent(false); 
  },[formData.password]);

  const handleOnChange = (event) => {
    setFormData( (prevData) =>(
        {
            ...prevData,
            [event.target.name]:event.target.value
        }
    ))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split('/').at(-1);
    dispatch(resetPassword(password,confirmPassword,token));
    dispatch(ResetPasswordConfirmation(token,navigate));
  }

  return (
    <div className='font-inter text-white flex flex-col items-center justify-center
    h-screen w-[500px]  mx-auto px-10'>
    {
        loading ? <Spinner />
        : (
            <div>
                <h1 className='text-3xl font-inter text-richblack-5 mb-[10px]'>Choose New Password</h1>
                <p className='font-[16px] text-richblack-200 font-inter pr-5 mb-[20px]'>Almost done. Enter your new password and you are all set.</p>
                
                <form onSubmit={handleOnSubmit}>

                    <label className='relative font-[16px] text-richblack-5 font-inter flex flex-col gap-4'>
                        <p>New Password
                            <sup className='text-[#FF0000] text-[16px] pl-1'>*</sup>
                        </p>

                        <input
                        required
                        type= {showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={handleOnChange}
                        on
                        placeholder="Enter Password"
                        value={password}
                        className='text-white bg-richblack-800 px-[10px] py-[10px] rounded-md border-b-2 border-richblack-100 mb-[30px]'
                        />

                        <span className='absolute right-3 top-[50px] cursor-pointer' 
                        onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? 
                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 
                        (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span>
                    </label>

                    <label className='relative font-[16px] text-richblack-5 font-inter flex flex-col gap-4'>
                        <p>Confirm New Password
                            <sup className='text-[#FF0000] text-[16px] pl-1'>*</sup>
                        </p>

                        <input
                        required
                        type= {showConfirmPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={handleOnChange}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        className='text-white bg-richblack-800 px-[10px] py-[10px] rounded-md border-b-2 border-richblack-100 mb-[30px]'
                        />

                        <span className='absolute right-3 top-[50px] cursor-pointer' 
                        onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ?
                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 
                        (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span>
                    </label>

                    <div className={`flex flex-wrap w-full mb-[20px] transition-all duration-200
                    ${formData.password.length === 0 ? "invisible opacity-0 h-0" : "visible opacity-100" }`}>

                        <div className={`w-[50%] gap-2 flex flex-row items-center
                        ${lowercasePresent ? "text-[#00FF00]" : "text-[#FF0000]"} 
                        `}>
                          {lowercasePresent ? <TiTick fontSize={20} /> : <ImCross fontSize={14} />}
                          <p className=''>one lowercase character</p>
                        </div>

                        <div className={`w-[50%] gap-2 flex flex-row items-center
                        ${uppercasePresent ? "text-[#00FF00]" : "text-[#FF0000]"} 
                        `}>
                          {uppercasePresent ? <TiTick fontSize={20}/> : <ImCross fontSize={14} />}
                          <p className=''>one uppercase character</p>
                        </div>

                        <div className={`w-[50%] gap-2 flex flex-row items-center
                        ${specialcharPresent ? "text-[#00FF00]" : "text-[#FF0000]"} 
                        `}>
                          {specialcharPresent ? <TiTick fontSize={20}/> : <ImCross fontSize={14} />}
                          <p className=''>one special character</p>
                        </div>

                        <div className={`w-[50%] gap-2 flex flex-row items-center
                        ${char8minPresent ? "text-[#00FF00]" : "text-[#FF0000]"} 
                        `}>
                          {char8minPresent ? <TiTick fontSize={20}/> : <ImCross fontSize={14} />}
                          <p className=''>8 character minimum</p>
                        </div>

                        <div className={`w-[50%] gap-2 flex flex-row items-center
                        ${numberpresent ? "text-[#00FF00]" : "text-[#FF0000]"} 
                        `}>
                          {numberpresent ? <TiTick fontSize={20}/> : <ImCross fontSize={14} />}
                          <p className=''>one number</p>
                        </div>

                    </div>

                    <button className='bg-yellow-100 text-richblack-800 font-inter px-[10px] py-[10px] flex justify-center items-center w-full rounded-md mb-[20px]'
                    type='submit'>
                        Reset Password
                    </button>

                </form> 

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

export default UpdatePassword;
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from "../../common/IconButton";
import {FaEdit} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getUserDetails } from '../../../services/operations/SettingsAPI';

const MyProfile = () => {
  const { token } = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(getUserDetails(token,user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className='text-white flex flex-col px-10 py-5'>

        <h1 className='text-3xl text-white font-semibold font-inter'>My Profile</h1>

        {/* section 1 */}
        <div className='bg-richblack-800 flex flex-row justify-between w-11/12 px-5 py-5 items-center rounded-md mt-10'>
            <div className='flex lg:flex-row md:flex-row sm:flex-col sm:gap-y-2 gap-x-4 items-center'>

                <img 
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className='aspect-square w-[78px] rounded-full object-cover'
                />

                <div>
                    <h1 className='font-inter text-white text-2xl' >{user?.firstName + " " + user?.lastName}</h1>
                    <p className='font-inter text-richblack-300 text-[14px]'>{user?.email}</p>
                </div>

            </div>

            <div className='flex flex-row items-center justify-center gap-x-2 bg-yellow-50 h-10 px-5 rounded-md text-black cursor-pointer'>
                <Link to="/dashboard/settings" className='flex flex-row gap-2 items-center justify-center'>
                    <FaEdit />
                    <IconButton 
                    text="Edit"
                    onclick={() => {
                        navigate("/dashboard/settings");
                    }}/>
                </Link>
            </div>

        </div>

        {/* Section 2 */}
        <div className='bg-richblack-800 flex flex-col  w-11/12 px-5 py-5 rounded-md mt-10'>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='font-inter text-white text-2xl'>About</h1>
                <div className='flex flex-row items-center justify-center gap-x-2 bg-yellow-50 h-10 px-5 rounded-md text-black cursor-pointer'>
                    <Link to="/dashboard/settings" className='flex flex-row gap-2 items-center justify-center'>
                        <FaEdit />
                        <IconButton 
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings");
                        }}/>
                    </Link>
                </div>
            </div>
            <div className='flex flex-col mt-4 pr-5'>
                <p className='font-inter text-richblack-300 text-[14px]'>{(user?.AdditionalDetails?.about) ? (user?.AdditionalDetails?.about)  : "Write Something about yourself"}</p>
            </div>
        </div>

        {/* Section 3 */}
        <div className='bg-richblack-800 flex flex-col w-11/12 px-5 py-5 rounded-md mt-10'>

            <div className='flex flex-row justify-between'>
                <h1 className='font-inter text-white text-2xl'>Personal Details</h1>
                <div className='flex flex-row items-center justify-center gap-x-2 bg-yellow-50 h-10 px-5 rounded-md text-black cursor-pointer'>
                    <Link to="/dashboard/settings" className='flex flex-row gap-2 items-center justify-center'>
                        <FaEdit />
                        <IconButton 
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings");
                        }}/>
                    </Link>
                </div>
            </div>
            
            <div className='flex flex-row flex-wrap gap-y-8 mt-4 lg:gap-x-0 md:gap-x-4 sm:gap-x-4'>

                <div className='flex flex-col gap-2 w-[50%]'>
                    <p className='font-inter text-richblack-300 text-[14px]'>First Name</p>
                    <p className='font-inter text-richblack-25 text-[16px]'>{user?.firstName ?? "Add First Name"}</p>
                </div>

                <div className='flex flex-col gap-2 w-[50%]'>
                    <p className='font-inter text-richblack-300 text-[14px]'>Last Name</p>
                    <p className='font-inter text-richblack-25 text-[16px]'>{user?.lastName ?? "Add Last Name"}</p>
                </div>

                <div className='flex flex-col gap-2 w-[50%]'>
                    <p className='font-inter text-richblack-300 text-[14px]'>Email</p>
                    <p className='font-inter text-richblack-25 text-[16px]'>{user?.email ?? "Add Email Id"}</p>
                </div>

                <div className='flex flex-col gap-2 w-[50%]'>
                    <p className='font-inter text-richblack-300 text-[14px]'>Phone Number</p>
                    <p className='font-inter text-richblack-25 text-[16px]'>{user?.AdditionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                </div>

                <div className='flex flex-col gap-2 w-[50%]'>
                    <p className='font-inter text-richblack-300 text-[14px]'>Gender</p>
                    <p className='font-inter text-richblack-25 text-[16px]'>{user?.AdditionalDetails?.gender ?? "Add Gender"}</p>
                </div>

                <div className='flex flex-col gap-2 w-[50%]'>
                    <p className='font-inter text-richblack-300 text-[14px]'>Date of Birth</p>
                    <p className='font-inter text-richblack-25 text-[16px]'>{user?.AdditionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                </div>
            </div>
            
        </div>
    
    </div>
  )
}

export default MyProfile

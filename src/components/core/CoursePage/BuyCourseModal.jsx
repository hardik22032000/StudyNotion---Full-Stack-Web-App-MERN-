import React, { useEffect } from 'react';
import {BiTimeFive} from "react-icons/bi";
import {GiArrowCursor} from "react-icons/gi";
import {BsBookmarkStarFill} from "react-icons/bs";
import {TbCertificate} from "react-icons/tb";
import {buyCourse} from "../../../services/operations/PaymentAPI";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addToCart } from '../../../slices/cartSlice';
import { addToWishlist } from '../../../slices/wishlistSlice';
import { useState } from 'react';
import {TbShare3} from "react-icons/tb";
import {ACCOUNT_TYPE} from "../../../utils/constants";
 
const BuyCourseModal = ({coursedata}) => {
  
  const {user} = useSelector((state)=>state.profile);
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [PaymentSuccessful, setPaymentSuccessful] = useState(false);

  const AddCourseToWishlist = () => {
    dispatch(addToWishlist(coursedata?.courseDetails));
  }

  const AddCourseToCart = () => {
    dispatch(addToCart(coursedata?.courseDetails));
  }

  const handleBuyCourse = (courseId) => {
    if(token) {
        buyCourse(token, [courseId], user, navigate, dispatch);
        setPaymentSuccessful(true);
        return;
    }
  }

  const CheckCoursePurchasedOrNot = async () => {
    coursedata?.courseDetails?.studentsEnrolled.map((EnrolledUserId) => (
        EnrolledUserId === user._id ? setPaymentSuccessful(true) : ""
    ))
  }

  useEffect(() => {
    CheckCoursePurchasedOrNot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[coursedata]);

  return (
    <div className='flex flex-col absolute z-10 top-10 left-10 lg:w-[450px] md:w-[280px] sm:w-[220px]'>
        <img 
            src={coursedata?.courseDetails?.thumbnail}
            alt='course thumbnail'
            className={`h-300 w-300 object-cover`}
        />
        <div className='flex flex-col gap-y-3 px-4 py-4 bg-richblack-700'>
            <h2 className='text-white font-inter text-2xl font-semibold'>Rs. {coursedata?.courseDetails?.price}</h2>
            
            <button onClick={() => AddCourseToWishlist(coursedata?.courseDetails?._id)}
            className=' bg-[#ff0000] text-white px-5 py-3 font-semibold border-b-[2px] border-richblack-300 hover:scale-95 transition-all duration-200 rounded-md'
            >
            Add to Wishlist
            </button>

            <button onClick={() => AddCourseToCart(coursedata?.courseDetails?._id)}
            className='bg-yellow-50 text-black px-5 py-3 font-semibold border-b-[2px] border-richblack-300 hover:scale-95 transition-all duration-200 rounded-md'
            >
            Add to Cart
            </button>

            {
              PaymentSuccessful ? 
              ( 
                <button onClick={() => navigate(`/view-course/${coursedata?.courseDetails?._id}/section/${coursedata?.courseDetails?.courseContent?.[0]?._id}/sub-section/${coursedata?.courseDetails?.courseContent?.[0]?.subSection?.[0]?._id}`)}
                className='bg-richblack-800 text-white px-5 py-3 font-semibold border-b-[1px] 
              border-richblack-300 hover:scale-95 transition-all duration-200 rounded-md'>
                Go to Course
                </button>
                
              )
              : 
              (user?.accountType === ACCOUNT_TYPE.STUDENT) ?
              (<button onClick={() => handleBuyCourse(coursedata?.courseDetails?._id)}
              className='bg-richblack-800 text-white px-5 py-3 font-semibold border-b-[1px] 
             border-richblack-300 hover:scale-95 transition-all duration-200 rounded-md'>
                Buy Now
              </button>) : (<></>)
            }

            <p className='text-richblack-100 mx-auto'>30-Day-Money-Back Guarantee</p>

            <div className='my-4'>
                <p className='text-richblack-5'>This course includes:</p>
                
                <div className='flex flex-row gap-x-2 items-center mt-2'>
                    <BiTimeFive className='text-caribbeangreen-200 font-semibold'/>
                    <p className='text-caribbeangreen-200 font-inter font-semibold'>8 Hours on-demand video</p>
                </div>

                <div className='flex flex-row gap-x-2 items-center mt-2'>
                    <GiArrowCursor className='text-caribbeangreen-200 font-semibold'/>
                    <p className='text-caribbeangreen-200 font-inter font-semibold'>Full Lifetime access</p>
                </div>

                <div className='flex flex-row gap-x-2 items-center mt-2'>
                    <BsBookmarkStarFill className='text-caribbeangreen-200 font-semibold'/>
                    <p className='text-caribbeangreen-200 font-inter font-semibold'>Access on Mobile and TV</p>
                </div>

                <div className='flex flex-row gap-x-2 items-center mt-2'>
                    <TbCertificate className='text-caribbeangreen-200 font-semibold'/>
                    <p className='text-caribbeangreen-200 font-inter font-semibold'>Certification of Completion</p>
                </div>
            </div>

            <div className='mx-auto flex flex-row gap-x-1 items-center'>
              <TbShare3 className='text-yellow-100'/>
              <p className='text-yellow-100'>Share</p>
            </div>

        </div>
    </div>
  )
}

export default BuyCourseModal
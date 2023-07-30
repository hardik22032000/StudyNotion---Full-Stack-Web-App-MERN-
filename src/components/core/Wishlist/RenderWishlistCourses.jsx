import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import {removeFromWishlist} from "../../../slices/wishlistSlice";
import ReactStars from "react-rating-stars-component";
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const RenderWishlistCourses = () => {

   const {wishlist} = useSelector((state) => state.wishlist);
   const dispatch = useDispatch();

  return (
    <div>
    {
        wishlist.map((course, index) => (
            <div key={index} className='flex flex-row gap-x-2 justify-between border-b-[1px] border-richblack-300 py-5'>
                <div className='flex flex-row gap-x-4'>
                    <img className='flex justify-center items-center w-[200px] h-[150px] object-cover rounded-md md:block sm:hidden'
                    src={course?.thumbnail} alt={`Course - ${course?.courseName}`}/>
                    <div className='flex flex-col gap-y-2'>
                        <Link to={`/courses/${course?._id}`}>
                        <h2 className='text-xl text-white font-semibold font-inter'>{course?.courseName}</h2>
                        </Link>
                        <p className='text-richblack-300 text-md font-inter'>{course?.category?.name}</p>
                        <div className='flex gap-x-3 items-center'>
                            <span className='text-yellow-50 text-lg font-semibold'>{GetAvgRating(course?.courseDetails?.ratingAndReviews) || 0}</span>
                            <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emtpyIcon={<GiNinjaStar />}
                                fullIcon={<GiNinjaStar />}
                            /> 

                            <span className='text-white font-inter'>{course?.ratingAndReviews?.length} Ratings</span>

                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-y-4'>
                    <button className='flex flex-row gap-x-2 items-center px-3 py-2 cursor-pointer bg-richblack-800 text-pink-200 rounded-md border-[1px] border-richblack-600 hover:scale-95 transition-all duration-200'
                    onClick={() => dispatch(removeFromWishlist(course._id))}
                    >
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>

                    <h2 className='text-yellow-50 text-2xl font-inter font-semibold'>Rs {course?.price} </h2>
                </div>
            </div>
        ))
    }
      
    </div>
  )
}

export default RenderWishlistCourses

import React from 'react';
import GetAvgRating from "../../../utils/avgRating";
import { useState } from 'react';
import { useEffect } from 'react';
import RatingStars from '../../common/RatingStars';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    return (
        <div>
            <Link to={`/courses/${course._id}`}>
                <div className='flex flex-col gap-y-3'>
                    <div>
                        <img 
                            src={course?.thumbnail}
                            alt='course thumbnail'
                            className={`${Height} w-full rounded-xl object-cover`}
                        />
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <p className='text-xl font-semibold font-inter '>{course?.courseName}</p>
                        <p  className='text-richblack-300 text-md font-inter'>{course?.instructor?.firstName} {course?.instructor?.lastName} </p>
                        <div className='flex gap-x-3 items-center'>
                            <span className='text-yellow-50 font-semibold'>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className='text-richblack-300 font-inter '>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p className='text-xl font-semibold font-inter'>Rs. {course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Course_Card
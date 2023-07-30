import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"
import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode } from "swiper"
import { apiconnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 30

  useEffect(() => {
    const getReviewDetails = async () => {
      const response = await apiconnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API)

      if (response?.data?.success) {
        setReviews(response?.data?.allReviews)
      }
    }

    getReviewDetails();
  }, [])

  return (
    <div className="text-white">
      <div className="sm:my-[30px] sm:h-[184px] md:my-[30px] md:h-[184px] lg:my-[30px] lg:h-[214px] lg:max-w-maxContent max-w-maxContentTab mx-auto">
        <Swiper
          direction="horizontal"
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            400: {
              slidesPerView: 1,
            },
            700: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          modules={[FreeMode,Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                  
                  <div className="flex items-center gap-4">
                    
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />

                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>

                  </div>

                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>

                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>

                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider

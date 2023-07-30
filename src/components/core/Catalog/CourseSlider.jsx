import React from 'react'
import CourseCard from './Course_Card'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/navigation";
import { Autoplay,Navigation,}  from 'swiper'

const CourseSlider = ({Courses}) => {
  return (
    <div className='mt-5'>
        {
            Courses?.length ? (
                <Swiper
                    direction="horizontal"
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    navigation={true}
                    modules={[Autoplay,Navigation]}
                    className="mySwiper"
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        1024:{slidesPerView:3}
                    }}
                >
                    {
                        Courses?.map((course, index)=> (
                            <SwiperSlide key={index}>
                                <CourseCard course={course} Height={"h-[250px]"} />
                            </SwiperSlide>
                        ))
                    }   
                </Swiper>
            ) : (
                <p>No Course Found</p>
            )
        }
    </div>
  )
}

export default CourseSlider
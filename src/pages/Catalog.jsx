import React from 'react';
import {categoriesEndpoints} from "../services/apis";
import { apiconnector } from '../services/apiconnector';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCatalogPageData } from '../services/operations/categoriesAPI';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';
import Footer from "../components/common/Footer";
import { ACCOUNT_TYPE } from "../utils/constants";
import { useSelector } from 'react-redux';

const Catalog = () => {

    const {catalogName} = useParams();
    const { user } = useSelector((state) => state.profile);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [MostPopularCourses, setMostPopularCourses] = useState(true);

    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiconnector("GET", categoriesEndpoints.CATEGORIES_API);
            const category_id = 
            res?.data?.allCategories?.filter((category) => category.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }

        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error);
            }
        }

        if(categoryId) {
            getCategoryDetails();
        }
    },[categoryId]);

    return (

        (catalogPageData?.data === undefined) 
        ?  (
            <div className='h-screen flex flex-col gap-y-10 justify-center items-center'>
                
                <h2 className='text-2xl text-white font-inter font-semibold'>
                No Courses created for the category yet
                </h2>

                <div className='flex flex-row gap-4'>
                    {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
                        <Link to="/dashboard/add-course">
                            <button className='bg-yellow-50 px-4 py-4 text-black rounded-md font-semibold font-inter
                            hover:scale-95 transition-all duration-200'>
                            Create Course
                            </button>
                        </Link>
                    }

                    <Link to="/">
                        <button className='bg-richblack-700 px-4 py-4 text-white rounded-md font-semibold font-inter
                        hover:scale-95 transition-all duration-200'>
                        Back to Home
                        </button>
                    </Link>

                </div>

            </div>
        ) 

        : (<div className='text-white mt-10'>

        <div className='bg-richblack-800 w-full py-10 px-20'>
            <p className='text-richblack-300 font-medium font-inter mb-4'>{`Home / Catalog / `}
            <span className='text-yellow-50 font-semibold font-inter'>
                {catalogPageData?.data?.selectedCategory?.name}
            </span></p>
            <p className='text-4xl font-semibold font-inter mb-4'> {catalogPageData?.data?.selectedCategory?.name} </p>
            <p className='text-richblack-300 font-inter'> {catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        <div className='w-full py-10 px-20 flex flex-col gap-y-10'>

            {/* section1 */}
            <div>
                <h2 className='text-3xl font-semibold font-inter mb-4'>Courses to get you started</h2>
                <div className='flex gap-x-5 mb-5  border-b-[1px] border-richblack-300'>
                    
                    <p onClick={() => setMostPopularCourses(!MostPopularCourses)}
                    className={`font-inter text-md cursor-pointer py-2 px-2
                    ${MostPopularCourses ? "text-yellow-50 border-b-[1px] border-yellow-50" : "text-richblack-300"}`}>
                    Most Popular</p>

                    <p onClick={() => setMostPopularCourses(!MostPopularCourses)}
                    className={`font-inter text-md cursor-pointer py-2 px-2
                    ${!MostPopularCourses ? "text-yellow-50 border-b-[1px] border-yellow-50" : "text-richblack-300"}`}>
                    New</p>

                </div>
                {
                    MostPopularCourses ? <CourseSlider Courses={catalogPageData?.data?.mostSellingCourses} /> 
                    : <CourseSlider Courses={catalogPageData?.data?.NewCourses} />
                }
            </div>  

            {/* section2 */}
            <div>
                <h2 className='text-3xl font-semibold font-inter mb-4'>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</h2>
                <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
            </div>

            {/* section3 */}
            <div>
                <h2 className='text-3xl font-semibold font-inter mb-4'>Frequently Bought Together</h2>
                <div className='py-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4'>
                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                            .map((course, index) => (
                                // eslint-disable-next-line
                                <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
        
        <Footer />
        </div>)
         
    )
}

export default Catalog
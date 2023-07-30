import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import IconButton from '../../common/IconButton';
import Spinner from '../../common/Spinner';
import { useState } from 'react';
import { AddCategoryData } from '../../../services/operations/categoriesAPI';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddCategory = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("categoryName", "");
    setValue("categoryShortDesc", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const SubmitCourseInfo = async (data) => {
    const formData = new FormData();
    formData.append("name", data.categoryName);
    formData.append("description", data.categoryShortDesc);

    setLoading(true);
    const result = await AddCategoryData(formData,token);
    if(result){
      navigate("/dashboard/all-categories");
    }
    setLoading(false);
  }

  const PreventDefaultBehaviour = (event) => {
    if(event.key === "Enter"){
      event.preventDefault();
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      
      { loading ? (<div className="w-full h-screen flex flex-col justify-center items-center"><Spinner /></div>) : 
      (<div className='flex flex-col gap-y-14 px-2 py-2 w-full'>

        <h1 className='text-3xl text-white font-semibold font-inter'>Add Category</h1>

        <div className='w-[500px] flex mx-auto'>

          <form onSubmit={handleSubmit(SubmitCourseInfo)} className='flex flex-col gap-5 px-5 py-5 w-full bg-richblack-800 rounded-md'>

            {/* Category Name */}
            <div className='flex flex-col items-start px-2 py-2'>
              <label htmlFor='categoryName' className='text-base text-richblack-50 font-inter mb-2'>
                Category Name <sup className='text-[#ff0000] text-sm'>*</sup>
              </label>
              <input onKeyDown={PreventDefaultBehaviour}
                  className='bg-richblack-700 text-white px-3 py-3 
                  rounded-md w-full border-b-2 border-richblack-100'
                  type='text'
                  name='categoryName'
                  id='categoryName'
                  placeholder='Enter Category Name'
                  {...register("categoryName",{required: true})}
              />
              {
                  errors.categoryName && (
                      <span className='text-[#FF0000]'>
                          Please Enter Category Name
                      </span>
                  )
              }  
            </div>

            {/* Category Short Description */}
            <div className='flex flex-col items-start px-2 py-2'>
              <label htmlFor='categoryShortDesc' className='text-base text-richblack-50 font-inter mb-2'>
                Category Short Description <sup className='text-[#ff0000] text-sm'>*</sup>
              </label>
              <textarea rows={5} cols={30} onKeyDown={PreventDefaultBehaviour}
                className='bg-richblack-700 text-white px-3 py-3 
                rounded-md w-full border-b-2 border-richblack-100'
                type='text'
                name='categoryShortDesc'
                id='categoryShortDesc'
                placeholder='Please Enter your short description here'
                {...register("categoryShortDesc",{required: true})}
              />
              {
                  errors.categoryShortDesc && (
                      <span className='text-[#FF0000]'>
                          Please Enter Category Short Description
                      </span>
                  )
              }  
            </div>

            <IconButton type={"submit"}
                  text={"Submit"}
                  customClasses={"bg-yellow-50 text-black hover:scale-95 transition-all duration-200 text-center text-[14px] px-6 py-3 rounded-md font-bold"}
            />

          </form>

        </div>

      </div>)}

    </div>
  )
}

export default AddCategory
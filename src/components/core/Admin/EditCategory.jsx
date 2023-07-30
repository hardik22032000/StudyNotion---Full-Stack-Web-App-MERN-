import React from 'react'
import { setCategory } from '../../../slices/categorySlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { getCatalogPageData } from '../../../services/operations/categoriesAPI';
import Spinner from '../../common/Spinner';
import { toast } from 'react-hot-toast';
import IconButton from '../../common/IconButton';
import { EditCategoryData } from '../../../services/operations/categoriesAPI';
import { resetCategoryState } from '../../../slices/categorySlice';

const EditCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryId } = useParams()
    const { category } = useSelector((state) => state.category)
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        getValues,
      } = useForm();
  
    useEffect(() => {
      const GetCategoryDetails = async () => {
        setLoading(true)
        const result = await getCatalogPageData(categoryId)
        if(result?.success){
            dispatch(setCategory(result?.data?.selectedCategory));
        }
        setLoading(false)
      }
  
      GetCategoryDetails();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.categoryShortDesc !== category?.description)
            return true;
        else
            return false;
    }

    const EditCategoryInfo = async (data) => {
        if(isFormUpdated()){
            const currentValues = getValues();
            let description = null;

            if(currentValues.categoryShortDesc !== category?.description)
                description = data.categoryShortDesc;

            setLoading(true);
            const APIdata = {
                categoryId,
                description
            };
            const response = await EditCategoryData(APIdata,token);
            if(response){
                dispatch(resetCategoryState());
                navigate("/dashboard/all-categories");
            }
            setLoading(false);
        }
        else
            toast.error("No Changes made so far");
    }
  
    if (loading) {
      return (
        <div className="flex flex-col h-screen w-full justify-center items-center">
            <Spinner />
        </div>
      )
    }
  
    return (
      <div className='flex flex-col'>
        <h1 className="mt-5 mb-2 text-3xl font-semibold text-richblack-5">
          Edit Category
        </h1>
        <h2 className="mb-10 text-md font-semibold text-richblack-300">
          You can only edit category description so that user experience is not impacted.
        </h2>

        <div className="mx-auto w-full">
          {category ? (
            
            <form onSubmit={handleSubmit(EditCategoryInfo)} className='flex flex-col gap-5 px-5 py-5 w-full bg-richblack-800 rounded-md'>

            {/* Category Name */}
            <div className='flex flex-col items-start px-2 py-2'>
              <label htmlFor='categoryName' className='text-base text-richblack-50 font-inter mb-2'>
                Category Name <sup className='text-[#ff0000] text-sm'>*</sup>
              </label>
              <input 
                  className='bg-richblack-900 text-white px-3 py-3 
                  rounded-md w-full border-b-2 border-richblack-100'
                  type='text'
                  name='categoryName'
                  id='categoryName'
                  defaultValue={category?.name}
                  disabled={true}
              /> 
            </div>

            {/* Category Short Description */}
            <div className='flex flex-col items-start px-2 py-2'>
              <label htmlFor='categoryShortDesc' className='text-base text-richblack-50 font-inter mb-2'>
                Category Short Description <sup className='text-[#ff0000] text-sm'>*</sup>
              </label>
              <textarea rows={5} cols={30}
                className='bg-richblack-700 text-white px-3 py-3 
                rounded-md w-full border-b-2 border-richblack-100'
                type='text'
                name='categoryShortDesc'
                id='categoryShortDesc'
                defaultValue={category?.description}
                {...register("categoryShortDesc")}
              />  
            </div>

            <IconButton type={"submit"}
                  text={"Save Changes"}
                  customClasses={"bg-yellow-50 text-black hover:scale-95 transition-all duration-200 text-center text-[14px] px-6 py-3 rounded-md font-bold"}
            />

          </form>







          ) : (
            <p className="mt-14 text-center h-screen text-3xl font-semibold text-[#ff0000]">
              Category not found. Please Try Again
            </p>
          )}
        </div>
      </div>
    )
}

export default EditCategory
import React from 'react';
import {FiUpload} from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import IconButton from '../../common/IconButton';
import { updateDisplayPicture } from '../../../services/operations/SettingsAPI';

const ChangeProfilePicture = () => {
   
   const { token } = useSelector((state) => state.auth)
   const {user} = useSelector((state) => state.profile);
   const dispatch = useDispatch();
   
   const [loading, setLoading] = useState(false)
   const [imageFile, setImageFile] = useState(null)
   const [previewSource, setPreviewSource] = useState(null);
   const fileInputRef = useRef(null);

   const handleFileChange = (e) => {
        const file = e.target.files[0]
        // console.log(file)
        if (file) {
            setImageFile(file)
            previewFile(file)
        }
   }

   const handleClick = () => {
    fileInputRef.current.click()
   }

   const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
        setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = () => {
        try {
          setLoading(true)
          const formData = new FormData()
          formData.append("displayPicture", imageFile)
          
          dispatch(updateDisplayPicture(token, formData)).then(() => {
            setLoading(false)
          })
        } catch (error) {
          console.log("ERROR MESSAGE - ", error.message)
        }
    }

    useEffect(() => {
        if (imageFile) {
          previewFile(imageFile)
        }
    }, [imageFile])

   return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className='flex flex-row items-center gap-6'>
            
            <img
                src={previewSource || user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[78px] rounded-full object-cover"
            />

            <div className='flex flex-col gap-2'>
                
                <p className='font-inter text-richblack-25 font-semibold text-lg'>Change Profile Picture</p>
                
                <div className='flex flex-row gap-2'>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/png, image/gif, image/jpeg, image/jpg"
                    />
                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >Select</button>
                    
                    <div className='flex flex-row items-center justify-center gap-x-2 bg-yellow-50 font-semibold px-2 rounded-md text-black cursor-pointer'>
                        <IconButton
                            text={loading ? "Uploading..." : "Upload"}
                            onclick={handleFileUpload}
                        /> 
                        {!loading && (
                            <FiUpload className="text-lg" />
                        )} 
                    </div>


                </div>

            </div>

        </div>
    </div>
   )
}

export default ChangeProfilePicture
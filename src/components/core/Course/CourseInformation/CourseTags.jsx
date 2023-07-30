import React, { useState } from 'react';
import {RxCross2} from "react-icons/rx";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CourseTags = ({label,name,placeholder,register,setValue,errors}) => {

  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const {course, editCourse} = useSelector((state)=>state.course);

  useEffect(()=> {
    register(name, {required:true});

    if(editCourse){
      setTagList([]);
      const courseTags = course?.tag[0].toString().split(",");
      for(const tag in courseTags){
        if(!tagList.includes(courseTags[tag]))
        tagList.push(courseTags[tag])
      }
      setTagList(tagList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=> {
    setValue(name, tagList); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tagList]);

  const handleTagChange = (e) => {
    setTag(e.target.value);
  }

  const handleTagRegister = (event) => {
    if(event.key === "Enter"){
      event.preventDefault();
    }
    if(event.key === "Enter" && tag.length !== 0){ 
      setTagList([...tagList, tag]);
      setTag("");   
    }
  }

  const handleTagRemoval = (index) => {
    tagList.splice(index, 1);
    const updatedTagsList = [...tagList];
    setTagList(updatedTagsList);
  }

  return (
    <div className='flex flex-col items-start px-2 py-2'>

        <label htmlFor={name} className='text-base text-richblack-50 font-inter mb-2'>
            {label} <sup className='text-[#ff0000] text-sm'>*</sup>
        </label>

        <div className='flex flex-row flex-wrap gap-2 mb-4'>
            {
                tagList.map((tagName, index) => (
                    <div key={index} className='flex flex-row gap-1 items-center justify-center bg-yellow-800 text-yellow-50 rounded-xl px-2 py-2 h-max w-max'>
                        <p>{tagName}</p>
                        <RxCross2 className={"text-richblack-5 cursor-pointer"} onClick={() => handleTagRemoval(index)}/>
                    </div>
                ))
            }
        </div>

        <input
            className='bg-richblack-700 text-white px-3 py-3 
            rounded-md w-full border-b-2 border-richblack-100'
            type='text'
            id={name}
            value={tag}
            name={name}
            placeholder={placeholder}
            onChange={handleTagChange}
            onKeyDown={handleTagRegister}
        />
        {
            errors[name] && (
                <span className='text-[#FF0000]'>
                    Please Enter {label}.
                </span>
            )
        }
        
    </div>
  )
}

export default CourseTags;
import React, { useState } from 'react';
import {RxCross2} from "react-icons/rx";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CourseRequirements = ({label,name,placeholder,register,setValue,errors}) => {

  const [Requirement, setRequirement] = useState("");
  const [RequirementList, setRequirementList] = useState([]);
  const {course, editCourse} = useSelector((state)=>state.course);

  useEffect(()=> {
    register(name, {required:true});

    if(editCourse){
      setRequirementList([]);
      const courseRequirements = course.instructions.toString().split(",");
      for(const requirement in courseRequirements){
        if(!RequirementList.includes(courseRequirements[requirement]))
        RequirementList.push(courseRequirements[requirement])
      }
      setRequirementList(RequirementList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=> {
    setValue(name, RequirementList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[RequirementList]);

  const PreventDefaultBehaviour = (event) => {
    if(event.key === "Enter"){
      event.preventDefault();
    }
  }

  const handleRequirementChange = (e) => {
    setRequirement(e.target.value);
  }

  const handleRequirementRegister = () => {
    if(Requirement.length !== 0){
        setRequirementList([...RequirementList, Requirement]);
        setRequirement("");   
    }
  }

  const handleRequirementRemoval = (index) => {
    RequirementList.splice(index, 1);
    const updatedRequirementList = [...RequirementList];
    setRequirementList(updatedRequirementList);
  }

  return (
    <div className='flex flex-col items-start px-2 py-2'>

        <label htmlFor={name} className='text-base text-richblack-50 font-inter mb-2'>
            {label} <sup className='text-[#ff0000] text-sm'>*</sup>
        </label>

        <input onKeyDown={PreventDefaultBehaviour}
            className='bg-richblack-700 text-white px-3 py-3 
            rounded-md w-full border-b-2 border-richblack-100'
            type='text'
            id={name}
            value={Requirement}
            name={name}
            placeholder={placeholder}
            onChange={handleRequirementChange}
        />
        {
            errors[name] && (
                <span className='text-[#FF0000]'>
                    Please Enter {label}.
                </span>
            )
        }

        <button className='text-yellow-50 mt-2 mb-2'
        onClick={handleRequirementRegister}
        type="button">Add</button>

        <div className='mt-2 flex flex-col flex-wrap gap-2'>
            {
                RequirementList.map((RequirementName, index) => (
                    <div key={index} className='flex flex-row gap-1 items-center justify-center bg-yellow-800 text-yellow-50 rounded-xl px-2 py-2 h-max w-max'>
                        <p key={index}>{RequirementName}</p>
                        <RxCross2 className={"text-richblack-5 cursor-pointer"} onClick={() => handleRequirementRemoval(index)}/>
                    </div>
                ))
            }
        </div>
        
    </div>
  )
}

export default CourseRequirements;
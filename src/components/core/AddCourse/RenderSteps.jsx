import React from 'react'
import { useSelector } from 'react-redux'
import CourseInformation from "../Course/CourseInformation";
import CourseBuilder from "../Course/CourseBuilder";
import CoursePublish from "../Course/CoursePublish";
import {TiTick} from "react-icons/ti";

const RenderSteps = () => {

  const {step, completedStep} = useSelector((state) => state.course);

  const stages = [
    {
      id: 1,
      stageName: "Course Information"
    },
    {
      id: 2,
      stageName: "Course Builder"
    },
    {
      id: 3,
      stageName: "Publish"
    },
  ]

  return (
    <div className='flex flex-col gap-4'>

      <div className='flex flex-row items-center px-2  mx-auto'>
        {
          stages.map((stage) => (

            <div key={stage.id} className='flex flex-col'>

             <div className='flex flex-row items-center gap-[1px]'>

              <div
              className={`mx-auto rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer
              ${step === stage.id ? "bg-yellow-900 border-2 border-yellow-50 text-yellow-50" : "bg-richblack-800 text-richblack-300 border-2 border-richblack-300" }
              ${completedStep >= stage.id ? "bg-yellow-50 border-2 border-yellow-900 text-yellow-900" : "bg-richblack-800 text-richblack-300 border-2 border-richblack-300"} `}>
                  {(completedStep >= stage.id) ? <TiTick className='text-xl'/> : stage.id}
              </div>
              { (stage.id !== stages.length) ?
              (<div className={`border-dashed border-t-[2px] w-[200px] translate-x-[1%] translate-y-[50%]
              ${completedStep >= stage.id ? "border-yellow-50" : "border-richblack-600"}`}></div>)
              : (<div></div>)
              }
             </div>

              <div className={`font-inter flex flex-row items-center translate-x-[-10%] mt-2
              ${step >= stage.id ? "text-richblack-5" : "text-richblack-500"}`}>
                {stage.stageName}
              </div>

            </div>

          ))
        }
      </div>

      <div>

      {step === 1 && <CourseInformation />}
      {step === 2 && <CourseBuilder />}
      {step === 3 && <CoursePublish />}

      </div>
        
    </div>
  )
}

export default RenderSteps
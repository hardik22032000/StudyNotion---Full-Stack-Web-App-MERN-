import React, { useState } from 'react';
import {RxDropdownMenu} from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import {MdEdit} from "react-icons/md";
import {RiDeleteBin6Line} from "react-icons/ri";
import {AiFillCaretDown} from "react-icons/ai"; 
import {AiOutlinePlus} from "react-icons/ai";
import {deleteSection, deleteSubSection} from "../../../../services/operations/courseAPI";
import { setCourse } from '../../../../slices/courseSlice';
import SubSectionPopups from './SubSectionPopups';

const NestedView = ({handleChangeEditSectionName}) => {

  const dispatch = useDispatch();
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      {sectionId,courseId: course._id},
      token
    );

    if(result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({SubsectionId: subSectionId, sectionId, token});
    if(result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      ) 
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  }

  return (
    <>
      <div>
          <div className='rounded-lg bg-richblack-700 py-5 px-5 mt-8'>
            {
              course?.courseContent?.map((section) => (
                <details key={section._id} open>

                  <summary className='flex items-center justify-between gap-x-3 border-b-[1px] border-richblack-500 cursor-pointer text-richblack-300 text-lg py-2'>
                    <div className='flex flex-row items-center gap-x-3'>
                            <RxDropdownMenu />
                            <h3 className='text-richblack-25 font-semibold'>{section.sectionName}</h3>
                    </div>
                    <div className='flex flex-row items-center gap-x-3'>
                          <button
                            onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                              <MdEdit />
                          </button>

                          <button
                          onClick={() => {
                              setConfirmationModal({
                                  text1: "Delete this Section",
                                  text2: "All the lectures in this section wil be deleted",
                                  btn1Text: "Delete",
                                  btn2Text: "Cancel",
                                  btn1Handler: () => handleDeleteSection(section._id),
                                  btn2Handler: () => setConfirmationModal(null),
                              })
                          }}
                          >
                            <RiDeleteBin6Line />
                          </button>
                        
                          <span>|</span>
                          <AiFillCaretDown className={`text-lg`} />
                    </div>
                  </summary>

                  <div>
                    {
                      section?.subSection?.map((data) => (
                        <div
                        key={data?._id} 
                        onClick={() => setViewSubSection(data)}
                        className='flex items-center justify-between gap-x-3 border-b-[1px] border-richblack-500 cursor-pointer text-richblack-300 text-lg py-2'>

                            <div className='flex items-center gap-x-3 pl-5'>
                                <RxDropdownMenu />
                                <h3 className='text-richblack-25 font-medium text-lg'>{data.title}</h3>
                            </div>      

                            <div onClick={(e) => e.stopPropagation()}
                            className='flex items-center gap-x-3'>
                                
                                <button
                                    onClick={() => setEditSubSection({...data, sectionId:section._id})}
                                    >
                                      <MdEdit />
                                </button>

                                <button
                                    onClick={() => setConfirmationModal({
                                      text1: "Delete this Sub Section",
                                      text2: "selected Lecture will be deleted",
                                      btn1Text: "Delete",
                                      btn2Text: "Cancel",
                                      btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                      btn2Handler: () => setConfirmationModal(null), })}
                                    >
                                      <RiDeleteBin6Line />       
                                </button>

                            </div>

                        </div>
                      ))
                    }

                    <button
                      onClick={() => setAddSubSection(section._id)}
                      className='mt-4 mb-4 flex items-center gap-x-1 text-yellow-50 font-semibold'
                      >
                          <AiOutlinePlus className='text-lg'/>
                          <p>Add Lecture</p>
                    </button>

                  </div>

                </details>
              ))
            }
          </div>
      
      </div>
    
      <SubSectionPopups 
      addSubSection = {addSubSection}
      setAddSubSection = {setAddSubSection}
      viewSubSection = {viewSubSection}
      setViewSubSection = {setViewSubSection}
      editSubSection = {editSubSection}
      setEditSubSection = {setEditSubSection}
      confirmationModal = {confirmationModal}
      />

    </>
  )
}

export default NestedView
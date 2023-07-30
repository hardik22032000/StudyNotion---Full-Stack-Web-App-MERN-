import React from 'react';
import IconButton from "./IconButton";

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='bg-richblack-900 px-5 py-5 w-[350px] rounded-md border-2 
        border-richblack-200'>
            <h1 className='font-inter font-semibold text-2xl text-white mb-2'>{modalData.text1}</h1>
            <p className='font-inter text-base text-richblack-300'>{modalData.text2}</p>
            
            <div className='flex flex-row justify-end gap-4 mt-5'>
                {modalData?.btn1Text && <IconButton 
                customClasses={"bg-[#ff0000] text-black px-2 py-2 rounded-md"}
                onclick={modalData?.btn1Handler}
                text={modalData?.btn1Text}
                />}
                <button className='bg-[#00ff00] text-black px-2 py-2 rounded-md '
                onClick={modalData?.btn2Handler}>
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>

    </div>
  )
}

export default ConfirmationModal;
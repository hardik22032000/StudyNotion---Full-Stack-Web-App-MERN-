import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../services/operations/SettingsAPI"
import IconButton from "../../common/IconButton";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showconfirmNewPassword, setShowconfirmNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    // console.log("password Data - ", data)
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>

        <div className=" flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 lg:px-12 md:px-6 sm:px-4">
          <h2 className="font-inter text-richblack-25 font-semibold text-xl">Password</h2>
          
          <div className="flex flex-row flex-wrap gap-y-5">
            
            <div className="relative flex flex-col gap-2 w-[50%]">
              <label htmlFor="oldPassword" className="font-inter font-semibold text-richblack-300 text-[16px]">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="w-[90%] bg-richblack-600 px-2 py-2 rounded-md border-b-2 border-b-richblack-100 text-richblack-5"
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute lg:right-14 md:right-8 sm:right-6 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-[#ff0000]">
                  Please enter your Current Password.
                </span>
              )}
            </div>

            <div className="relative flex flex-col gap-2 w-[50%]">
              <label htmlFor="newPassword" className="font-inter font-semibold text-richblack-300 text-[16px]">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="w-[90%] bg-richblack-600 px-2 py-2 rounded-md border-b-2 border-b-richblack-100 text-richblack-5"
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute lg:right-14 md:right-8 sm:right-6 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-[#ff0000]">
                  Please enter your New Password.
                </span>
              )}
            </div>

            <div className="relative flex flex-col gap-2 w-[50%]">
              <label htmlFor="confirmNewPassword" className="font-inter font-semibold text-richblack-300 text-[16px]">
                Confirm New Password
              </label>
              <input
                type={showconfirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                id="confirmNewPassword"
                placeholder="Confirm New Password"
                className="w-[90%] bg-richblack-600 px-2 py-2 rounded-md border-b-2 border-b-richblack-100 text-richblack-5"
                {...register("confirmNewPassword", { required: true })}
              />
              <span
                onClick={() => setShowconfirmNewPassword((prev) => !prev)}
                className="absolute lg:right-14 md:right-8 sm:right-6 top-[38px] z-[10] cursor-pointer"
              >
                {showconfirmNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.confirmNewPassword && (
                <span className="-mt-1 text-[12px] text-[#ff0000]">
                  Please confirm your New Password.
                </span>
              )}
            </div>

            <div className="relative flex flex-row gap-2 w-[50%] justify-end pt-8 ">
              <button
                onClick={() => {
                  navigate("/dashboard/my-profile")
                }}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 h-10"
              >
                Cancel
              </button>
              <IconButton type="submit" text="Update" customClasses={"bg-yellow-50 w-20 rounded-md font-semibold text-richblack-900 h-10"} />
            </div>
        
          </div>

      </div>

    </form>
  )
}
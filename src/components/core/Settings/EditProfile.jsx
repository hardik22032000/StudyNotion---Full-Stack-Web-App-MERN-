import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../services/operations/SettingsAPI"
import IconButton from "../../common/IconButton";

const genders = ["Male", "Female", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
      <form onSubmit={handleSubmit(submitProfileForm)}>

        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 lg:px-12 md:px-6 sm:px-4">
          
          <h2 className="font-inter text-richblack-25 font-semibold text-xl">
            Profile Information
          </h2>

          <div className="flex flex-row gap-y-5 flex-wrap">

                  <div className="flex flex-col gap-2 w-[50%]">
                    <label htmlFor="firstName" className="font-inter font-semibold text-richblack-300 
                    text-[16px]">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter first name"
                      className="w-[90%] bg-richblack-600 px-2 py-2 rounded-md border-b-2 border-b-richblack-100 text-richblack-5"
                      {...register("firstName", { required: true })}
                      defaultValue={user?.firstName}
                    />
                    {errors.firstName && (
                      <span className="-mt-1 text-[12px] text-[#ff0000]">
                        Please enter your first name.
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 w-[50%]">
                    <label htmlFor="lastName" className="font-inter font-semibold text-richblack-300 text-[16px]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter first name"
                      className="w-[90%] bg-richblack-600 px-2 py-2 rounded-md border-b-2 border-b-richblack-100 text-richblack-5"
                      {...register("lastName")}
                      defaultValue={user?.lastName}
                    />
                  </div>
                
                  <div className="flex flex-col gap-2 w-[50%]">
                    <label htmlFor="dateOfBirth" className="font-inter font-semibold text-richblack-300 text-[16px]">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      className="w-[90%] bg-richblack-600 px-2 py-2 rounded-md border-b-2 border-b-richblack-100 text-richblack-5"
                      {...register("dateOfBirth", {
                        max: {
                          value: new Date().toISOString().split("T")[0],
                          message: "Date of Birth cannot be in the future.",
                        },
                      })}
                      defaultValue={user?.additionalDetails?.dateOfBirth}
                    />
                    {errors.dateOfBirth && (
                      <span className="-mt-1 text-[12px] text-[#ff0000]">
                        {errors.dateOfBirth.message}
                      </span>
                    )} 
                  </div>

                  <div className="flex flex-col gap-2 w-[50%]">
                    <label htmlFor="gender" className="font-inter font-semibold text-richblack-300 text-[16px]">
                      Gender
                    </label>
                    <select
                      type="text"
                      name="gender"
                      id="gender"
                      className="w-[90%] bg-richblack-600 px-2 py-2 rounded-md border-b-2 border-b-richblack-100 text-richblack-5 border-r-8 border-r-transparent"
                      {...register("gender", { required: true })}
                      defaultValue={user?.additionalDetails?.gender}
                    >
                      {genders.map((ele, i) => {
                        return (
                          <option key={i} value={ele}>
                            {ele}
                          </option>
                        )
                      })}
                    </select>
                    {errors.gender && (
                      <span className="-mt-1 text-[12px] text-[#ff0000]">
                        Please select your Gender.
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 w-[50%]">
                    <label htmlFor="contactNumber" className="font-inter font-semibold text-richblack-300 text-[16px]">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      id="contactNumber"
                      placeholder="Enter Contact Number"
                      className="w-[90%] bg-richblack-600 px-2 py-2 rounded-md border-b-2 border-b-richblack-100 text-richblack-5"
                      {...register("contactNumber", {
                        required: {
                          value: true,
                          message: "Please enter your Contact Number.",
                        },
                        maxLength: { value: 12, message: "Invalid Contact Number" },
                        minLength: { value: 10, message: "Invalid Contact Number" },
                      })}
                      defaultValue={user?.additionalDetails?.contactNumber}
                    />
                    {errors.contactNumber && (
                      <span className="-mt-1 text-[12px] text-[#ff0000]">
                        {errors.contactNumber.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 w-[50%]">
                    <label htmlFor="about" className="font-inter font-semibold text-richblack-300 text-[16px]">
                      About
                    </label>
                    <input
                      type="text"
                      name="about"
                      id="about"
                      placeholder="Enter Bio Details"
                      className="w-[90%] bg-richblack-600 px-2 py-2 rounded-md border-b-2 border-b-richblack-100 text-richblack-5"
                      {...register("about")}
                      defaultValue={user?.additionalDetails?.about}
                    />
                  </div>

          </div>
    

          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                navigate("/dashboard/my-profile")
              }}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Cancel
            </button>
            <IconButton type="submit" text="Save" customClasses={"bg-yellow-50 w-20 rounded-md font-semibold text-richblack-900"}/>
          </div>
        </div>

      </form>
  )
}
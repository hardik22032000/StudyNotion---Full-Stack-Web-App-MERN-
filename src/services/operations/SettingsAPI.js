import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { apiconnector } from "../apiconnector";
import { settingsEndpoints } from "../apis"
import { setToken } from "../../slices/authSlice";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
  GET_USER_DETAILS_API
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorisation: `Bearer ${token}`,
        }
      )
      // console.log(
      //   "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
      //   response
      // )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
    } catch (error) {
      //console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
  }
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorisation: `Bearer ${token}`,
      })
      //console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.userdetails.image
        ? response.data.userdetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userdetails.firstName} ${response.data.userdetails.lastName}`
      
      
      dispatch(
        setUser({ ...response.data.userdetails, image: userImage })
      )
      toast.success("Profile Updated Successfully")
    } catch (error) {
      //console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorisation: `Bearer ${token}`,
    })
    //console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    //console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export function deleteProfile(token, navigate) {
  return async () => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("DELETE", DELETE_PROFILE_API, null, {
        Authorisation: `Bearer ${token}`,
      })
      //console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setToken(null);
      setUser(null);
      navigate("/");
      window.location.reload();

    } catch (error) {
      //console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }
}

export function getUserDetails(token,user) {
  return async (dispatch) => { 
      try {
        const response = await apiconnector(
          "GET",
          GET_USER_DETAILS_API,
          user,
          {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
          }
        )
        // console.log(
        //   "GET_USER_DETAILS_API API RESPONSE............",
        //   response
        // )

        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        dispatch(setUser(response.data.userdetails))
      } catch (error) {
        //console.log("GET_USER_DETAILS_API API ERROR............", error)
      }
    }
}
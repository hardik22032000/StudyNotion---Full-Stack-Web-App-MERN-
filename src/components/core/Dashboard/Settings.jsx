import React from 'react';
import ChangeProfilePicture from "../Settings/ChangeProfilePicture";
import EditProfile from "../Settings/EditProfile";
import UpdatePassword from "../Settings/UpdatePassword";
import DeleteAccount from "../Settings/DeleteAccount";


const Settings = () => {
  
  return (
    <div className='flex flex-col gap-4 mt-5'>
        <h1 className='text-3xl text-white font-semibold font-inter'>Edit Profile</h1>
        
        {/* Change Profile Picture */}
        <ChangeProfilePicture />

        {/* Profile */}
        <EditProfile />

        {/* Password */}
        <UpdatePassword />

        {/* Delete Account */}
        <DeleteAccount />

    </div>
  )
}

export default Settings

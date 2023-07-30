import React, { useState } from 'react';
import {sidebarLinks} from "../../../data/dashboard-links";
import {logout} from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from 'react-redux';
import SideBarLink from "../Dashboard/SideBarLink";
import { useNavigate } from 'react-router-dom';
import {VscSignOut} from "react-icons/vsc";
import Spinner from '../../common/Spinner';
import ConfirmationModal from "../../common/ConfirmationModal";

const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, loading: profileloading} = useSelector((state) => state.profile);
  const {loading: authloading} = useSelector((state) => state.auth);
  const [confirmationModal, setconfirmationModal] = useState(null);

  if(profileloading || authloading){
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <Spinner />
        </div>
    );
  }

  return (
    <>
        <div className='flex lg:min-w-[250px] md:min-w-[200px] flex-col border-r-[1px] border-r-richblack-700
        h-screen bg-richblack-800 py-10 relative'>

            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link, index) => {
                        if(link.type && user?.accountType !== link.type) 
                        return null;
                        return (
                            <SideBarLink key={link.id} link={link} iconName={link.icon}/>
                        )
                    })
                }
            </div>

            <hr className='mx-auto mt-4 mb-4  w-10/12 bg-richblack-100 border-1  border-[#424854]'></hr>
            
            <div className='flex flex-col'>
                <SideBarLink link={{name:"Settings",path:"dashboard/settings"}} iconName={"VscSettingsGear"} />
            
                <button 
                onClick={() => setconfirmationModal({
                    text1: "Are you sure ?",
                    text2: "You will be logged out of your account",
                    btn1Text:"Log out",
                    btn2Text:"Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setconfirmationModal(null)
                })}
                className='text-sm font-medium text-richblack-300'
                >

                    <div className='flex items-center gap-x-2 px-8 py-2 text-sm font-medium text-richblack-300'>
                            <VscSignOut className='text-lg'/>
                            <span>Logout</span>
                    </div>

                </button>
            
            
            </div>

        </div>

    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default Sidebar
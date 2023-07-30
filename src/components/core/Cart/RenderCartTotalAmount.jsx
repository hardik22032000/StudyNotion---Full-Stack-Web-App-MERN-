import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from "../../common/IconButton";
import { useNavigate } from 'react-router-dom';
import {buyCourse} from "../../../services/operations/PaymentAPI";

const RenderCartTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought these course:", courses);
        if(token) {
          buyCourse(token, courses, user, navigate, dispatch);
          return;
        }
    }
  return (
    <div className='flex flex-col gap-y-4 bg-richblack-800 py-5 px-5 h-max mt-5 lg:w-[30%] rounded-md border-[1px] border-richblack-600 '>

        <p className='text-richblack-300 font-inter'>Total:</p>
        <h2 className='text-yellow-50 text-2xl font-semibold'>Rs {total}</h2>

        <IconButton 
            text="Buy Now"
            onclick={handleBuyCourse}
            customClasses={"w-full flex items-center justify-center bg-yellow-50 text-black font-inter font-semibold py-2 px-2 rounded-md hover:scale-95 transition-all duration-200"}
        />
        
    </div>
  )
}

export default RenderCartTotalAmount

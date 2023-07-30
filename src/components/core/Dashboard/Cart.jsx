import { useSelector } from "react-redux";

import RenderCartCourses from "../Cart/RenderCartCourses";
import RenderCartTotalAmount from "../Cart/RenderCartTotalAmount";


export default function Cart() {

    const {total, totalItems} = useSelector((state)=>state.cart);

    return (
        <div className="py-5">
            <p className='text-richblack-300 font-medium font-inter mb-4'>{`Home / Dashboard / `}
            <span className='text-yellow-50 font-semibold font-inter'>Cart</span>
            </p>
            <h2 className="text-3xl font-inter font-semibold text-white">My Cart</h2>
            <div className="text-lg text-richblack-300 font-inter pt-5 border-b-[1px] border-richblack-300">
            {totalItems} Courses in Cart</div>

            {total > 0 
            ? (<div className="flex lg:flex-row lg:gap-y-0 md:flex-col md:gap-y-10 sm:flex-col sm:gap-y-10 gap-x-4 justify-between">
                <RenderCartCourses />
                <RenderCartTotalAmount />
            </div>)
            : (<p className="flex flex-col justify-center items-center h-screen text-3xl text-white font-semibold font-inter">Your Cart is Empty</p>)}
        </div>
    )
}
import { useSelector } from "react-redux";
import RenderWishlistCourses from "../Wishlist/RenderWishlistCourses";
import RenderWishlistTotalAmount from "../Wishlist/RenderWishlistTotalAmount";

export default function Wishlist() {

    const {totalWishlist, totalItemswishlist} = useSelector((state)=>state.wishlist);

    return (
        <div className="py-5">
            <p className='text-richblack-300 font-medium font-inter mb-4'>{`Home / Dashboard / `}
            <span className='text-yellow-50 font-semibold font-inter'>Wishlist</span>
            </p>
            <h1 className="text-3xl font-inter font-semibold text-white">My Wishlist</h1>
            <div className="text-lg text-richblack-300 font-inter pt-5 border-b-[1px] border-richblack-300"
            >{totalItemswishlist} Courses in Wishlist</div>

            {totalWishlist > 0 
            ? (<div className="flex lg:flex-row lg:gap-y-0 md:flex-col md:gap-y-10 sm:flex-col sm:gap-y-10 gap-x-4 justify-between">
                <RenderWishlistCourses />
                <RenderWishlistTotalAmount />
            </div>)
            : (<p className="flex flex-col justify-center items-center h-screen text-3xl text-white font-semibold font-inter">Your Wishlist is Empty</p>)}
        </div>
    )
}
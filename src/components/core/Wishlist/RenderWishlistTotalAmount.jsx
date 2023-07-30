import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from "../../common/IconButton";
import { addToCart } from '../../../slices/cartSlice';

const RenderWishlistTotalAmount = () => {

    const {totalWishlist, wishlist} = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    const handleCartAddition = () => {
        wishlist.map((course) => {
          return dispatch(addToCart(course));
        });
        
    }
  return (
    <div className='flex flex-col gap-y-4 bg-richblack-800 py-5 px-5 h-max mt-5 lg:w-[30%] rounded-md border-[1px] border-richblack-600 '>

        <p className='text-richblack-300 font-inter'>Total:</p>
        <h2 className='text-yellow-50 text-2xl font-semibold'>Rs {totalWishlist}</h2>

        <IconButton 
            text="Add to Cart"
            onclick={handleCartAddition}
            customClasses={"w-full flex items-center justify-center bg-yellow-50 text-black font-inter font-semibold py-2 px-2 rounded-md hover:scale-95 transition-all duration-200"}
        />
        
    </div>
  )
}

export default RenderWishlistTotalAmount

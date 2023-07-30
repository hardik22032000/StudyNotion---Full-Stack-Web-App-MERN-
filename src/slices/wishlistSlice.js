import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

const initialState = {
    wishlist: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
    totalWishlist: localStorage.getItem("totalWishlist")
    ? JSON.parse(localStorage.getItem("totalWishlist"))
    : 0,
    totalItemswishlist: localStorage.getItem("totalItemswishlist") 
    ? JSON.parse(localStorage.getItem("totalItemswishlist")) 
    : 0,
}

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState: initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const course = action.payload
            const index = state.wishlist.findIndex((item) => item._id === course._id)
      
            if (index >= 0) {
              // If the course is already in the wishlist, do not modify the quantity
              toast.error("Course already in wishlist")
              return
            }
            // If the course is not in the wishlist, add it to the wishlist
            state.wishlist.push(course)
            // Update the total quantity and price
            state.totalItemswishlist++
            state.totalWishlist += course.price
            // Update to localstorage
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist))
            localStorage.setItem("totalWishlist", JSON.stringify(state.totalWishlist))
            localStorage.setItem("totalItemswishlist", JSON.stringify(state.totalItemswishlist))
            // show toast
            toast.success("Course added to Wishlist")
          },
          removeFromWishlist: (state, action) => {
            const courseId = action.payload
            const index = state.wishlist.findIndex((item) => item._id === courseId)
      
            if (index >= 0) {
              // If the course is found in the wishlist, remove it
              state.totalItemswishlist--
              state.totalWishlist -= state.wishlist[index].price
              state.wishlist.splice(index, 1)
              // Update to localstorage
              localStorage.setItem("wishlist", JSON.stringify(state.wishlist))
              localStorage.setItem("totalWishlist", JSON.stringify(state.totalWishlist))
              localStorage.setItem("totalItemswishlist", JSON.stringify(state.totalItemswishlist))
              // show toast
              toast.success("Course removed from wishlist")
            }
          },
          resetWishlist: (state) => {
            state.wishlist = []
            state.totalWishlist = 0
            state.totalItemswishlist = 0
            // Update to localstorage
            localStorage.removeItem("wishlist")
            localStorage.removeItem("totalWishlist")
            localStorage.removeItem("totalItemswishlist")
          },
    }
})

export const {addToWishlist, removeFromWishlist, resetWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;
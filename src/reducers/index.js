import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import wishlistReducer from "../slices/wishlistSlice";
import courseReducer from "../slices/courseSlice";
import viewCourseReducer from "../slices/viewCourseSlice";
import categoryReducer from "../slices/categorySlice";

const rootReducer = combineReducers({
        auth: authReducer,
        profile: profileReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        course: courseReducer,
        viewCourse: viewCourseReducer,
        category: categoryReducer,
})

export default rootReducer;
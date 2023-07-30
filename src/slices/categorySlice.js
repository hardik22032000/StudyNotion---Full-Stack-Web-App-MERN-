import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: null,
    editCategory: false,
}

const categorySlice = createSlice({
    name:"category",
    initialState: initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setEditCategory: (state, action) => {
            state.editCategory = action.payload
        },
        resetCategoryState: (state) => {
            state.category = null
            state.editCategory = false
        },
    }
})

export const {setCategory,setEditCategory,resetCategoryState} = categorySlice.actions;
export default categorySlice.reducer;

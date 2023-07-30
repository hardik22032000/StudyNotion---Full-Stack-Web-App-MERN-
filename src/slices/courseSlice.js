import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 1,
    completedStep: 0,
    course: null,
    editCourse: false,
    paymentLoading: false,
}

const courseSlice = createSlice({
    name:"course",
    initialState: initialState,
    reducers: {
        setstep(state,value){
            state.step = value.payload;
        },
        setcompletedStep(state,value){
            state.completedStep = value.payload;
        },
        setCourse: (state, action) => {
            state.course = action.payload
        },
        setEditCourse: (state, action) => {
            state.editCourse = action.payload
        },
        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload
        },
        resetCourseState: (state) => {
            state.step = 1
            state.completedStep = 0
            state.course = null
            state.editCourse = false
        },
    }
})

export const {setstep, setcompletedStep,setCourse,setEditCourse,setPaymentLoading,resetCourseState} = courseSlice.actions;
export default courseSlice.reducer;

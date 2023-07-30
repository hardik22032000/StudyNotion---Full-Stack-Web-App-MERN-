// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const { auth, isStudent, isInstructor, isAdmin } = require("../middlewares/auth");
const { DeleteAccount, UpdateProfile, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard, adminDashboard } = require("../controllers/Profile");

// ************************************************************************************************************************************
//                                      Profile routes
// ************************************************************************************************************************************

// Delete User Account
router.delete("/deleteProfile", auth, DeleteAccount);
//Update Profile
router.put("/updateProfile", auth, UpdateProfile);
//Get user details
router.get("/getUserDetails", auth, getAllUserDetails);
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, isStudent, getEnrolledCourses);
//Update display picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
//Get Instructor Dashboard Details
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);
//Get Admin Dashboard Details
router.get("/adminDashboard", auth, isAdmin, adminDashboard);

// Export the router for use in the main application
module.exports = router;
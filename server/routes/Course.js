// Import the required modules
const express = require("express");
const router = express.Router();

// Import the Controllers

// Course Controllers Import
const { CreateCourse, ShowAllCourses, GetCourseDetails, editCourse, getInstructorCourses, deleteCourse, getFullCourseDetails } = require("../controllers/Course");

// Categories Controllers Import
const { CreateCategory, ShowAllCategories, categoryPageDetails, editCategory } = require("../controllers/Categories");

// Sections Controllers Import
const { CreateSection, UpdateSection, DeleteSection } = require("../controllers/Section");

// Sub-Sections Controllers Import
const { CreateSubSection, UpdateSubSection, DeleteSubSection } = require("../controllers/SubSection");

// Rating Controllers Import
const { CreateRatingAndReview, GetAverageRating, GetAllRatingAndReviews } = require("../controllers/RatingAndReview");

// Course Progress Controllers Import
const { updateCourseProgress } = require("../controllers/CourseProgress");

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, CreateCourse);
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, CreateSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, UpdateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, DeleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, UpdateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, DeleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, CreateSubSection);
// Get all Registered Courses
router.get("/getAllCourses", ShowAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", GetCourseDetails);
// Edit Course details
router.post("/editCourse",auth, isInstructor, editCourse);
// Get Instructor Courses
router.get("/getInstructorCourses",auth,isInstructor, getInstructorCourses);
// Delete Instructor Course
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
// Get Full Details of Course
router.post("/getFullCourseDetails",auth,getFullCourseDetails);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

router.post("/createCategory", auth, isAdmin, CreateCategory);
router.get("/showAllCategories", ShowAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);
router.post("/editCategory", auth, isAdmin, editCategory);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.post("/createRating", auth, isStudent, CreateRatingAndReview);
router.get("/getAverageRating", GetAverageRating);
router.get("/getReviews", GetAllRatingAndReviews);

// ********************************************************************************************************
//                                      Course Progress
// ********************************************************************************************************

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// Export the router for use in the main application
module.exports = router;
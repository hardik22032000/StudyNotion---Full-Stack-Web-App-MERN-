const Course = require("../models/Course");
const Category = require("../models/category");
const User = require("../models/User");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const {uploadToCloudinary} = require("../utils/FileUploader");
const CourseProgress = require("../models/CourseProgress")
const {convertSecondsToDuration} = require("../utils/secToDuration");
const mongoose = require("mongoose");
require("dotenv").config();

//Function - CreateCourse
exports.CreateCourse = async (req,res) => {
    try{
        //Fetch Data from request body
        const {courseName, courseDescription, whatYouWillLearn, price, category, tags, instructions, status} = req.body;

        //Get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !instructions || !status){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        
        //Instructor fetch
        const userid = req.user.id;
        const Instructor = await User.findById(userid);
        console.log("Instructor Details: ", Instructor);

        if(!Instructor){
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found"
            })
        }

        //Check given category is valid or not
        const CategoryDetails = await Category.findOne({name: category});
        if(!CategoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category Details not found"
            })
        }

        //Upload Image to cloudinary
        const thumbnailImage = await uploadToCloudinary(thumbnail,process.env.FOLDER_NAME);
        
        //Create Entry in DB
        const NewCourse = await Course.create({
            courseName, 
            courseDescription, 
            instructor: Instructor._id,
            whatYouWillLearn,
            price,
            category: CategoryDetails._id,
            tag: tags,
            thumbnail: thumbnailImage.secure_url,
            instructions,
            status
        })

        //Add new course to user scema of instructor
        const UpdatedInstructor = await User.findByIdAndUpdate(
            {_id: Instructor._id},
            {
                $push: {
                    courses: NewCourse._id
                }
            },
            {new: true}
        )

        //Add new course to category schema
        const UpdatedCategory = await Category.findByIdAndUpdate(
            {_id: CategoryDetails._id},
            {
                $push: {
                    courses: NewCourse._id
                }
            }
        )

        //return response
        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            NewCourse
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course. Please Try Again",
            error: error.message
        })
    }
}

//Function - ShowAllCourses
exports.ShowAllCourses = async (req,res) => {
    try{
        //Fetch all courses from DB
        const allCourses = await Course.find(
            {status: "Published"},
            {
            courseName: true, 
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true
        }).populate("instructor").exec();

        //Successful Response
        return res.status(200).json({
            success: true,
            message: "All Courses returned successfully",
            data: allCourses
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Function - GetCourseDetails
exports.GetCourseDetails = async (req,res) => {
    try{
        //Fetch Id
        const {courseId} = req.body;

        //Find Course Details
        const courseDetails = await Course.find({_id: courseId})
                              .populate(
                                {
                                    path:"instructor",
                                    populate:{
                                        path:"AdditionalDetails"
                                    }
                                }
                              )
                              .populate("category")
                              .populate("ratingAndReviews")
                              .populate({
                                path: "courseContent",
                                populate: {
                                  path: "subSection",
                                  select: "-videoUrl",
                                },
                              })
                              .exec();
        
        //Validation
        if(!courseDetails){
            return res.status(403).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
            })
        }

        //Return response
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            courseDetails
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Please Try Again"
        })
    }
}

// Function - Edit Course Details
exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }

      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if(key==="category"){
            const CategoryDetails = await Category.findOne({name: updates[key]});
            course[key] = CategoryDetails._id;
          }
          else{
          course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "AdditionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } 
    catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Please Try Again",
        error: error.message,
      })
    }
}

// Function - Get Full Course Details
exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "AdditionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Please Try Again",
      })
    }
}

// Function - Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      }).exec();
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses. Please Try Again",
        error: error.message,
      })
    }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
    return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
    await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
    })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
    // Delete sub-sections of the section
    const section = await Section.findById(sectionId)
    if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
        await SubSection.findByIdAndDelete(subSectionId)
        }
    }

    // Delete the section
    await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
    success: true,
    message: "Course deleted successfully",
    })
} catch (error) {
    console.error(error)
    return res.status(500).json({
    success: false,
    message: "Please Try Again",
    error: error.message,
    })
  }
}
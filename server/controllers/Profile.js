const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const {uploadToCloudinary} = require("../utils/FileUploader");
const {convertSecondsToDuration} = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");
const category = require("../models/category");

//Function - UpdateProfile
exports.UpdateProfile = async (req,res) => {
    try{
        //Fetch Data from request body
        const {firstName, lastName="", dateOfBirth="", about="", contactNumber, gender} = req.body;

        //Get UserId
        const id = req.user.id;
         
        //Validation
        if(!contactNumber || !gender || !id){
            return res.status(404).json({
                success: false,
                message: "All Fields are required"
            })
        }
        
       //Update First Name & Last Name and display picture
        const updatedUser = await User.findByIdAndUpdate(
            {_id: id},
            {
                firstName: firstName,
                lastName: lastName,
            },
            {new: true}
        );

        //default image present
        if(updatedUser.image.includes("api.dicebear.com")){
            updatedUser.image = `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`
            await updatedUser.save();
        }

        //Find profile
        const userdetails = await User.findById(id);
        const ProfileId = userdetails.AdditionalDetails;
        const ProfileDetails = await Profile.findById(ProfileId);

        //Update Profile
        ProfileDetails.dateOfBirth = dateOfBirth;
        ProfileDetails.about = about;
        ProfileDetails.contactNumber = contactNumber;
        ProfileDetails.gender = gender;
        await ProfileDetails.save();

        //Return response
        return res.status(200).json({
            success: true,
            message: "Profile Updated successfully",
            ProfileDetails,
            userdetails
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to update profile. Please try again."
        })
    }
}

//Function - DeleteAccount
exports.DeleteAccount = async (req,res) => {
    try{
        //Fetch Id
        const id = req.user.id;

        //validate id
        const userdetails = await User.findById(id);
        if(!userdetails){
            return res.status(404).json({
                success: false,
                message: "User not found. Please try again."
            })
        }

        //Delete Profile
        await Profile.findByIdAndDelete({_id:userdetails.AdditionalDetails});
        
        //Delete User
        await User.findByIdAndDelete({_id:id});
        
        //Return response
        return res.status(200).json({
            success: true,
            message: "Account Deleted successfully.",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete account. Please try again."
        })
    }
}

//Function - getAllUserDetails
exports.getAllUserDetails = async (req,res) => {
    try{
        //Fetch Id
        const id = req.user.id;

        //validate id
        const userdetails = await User.findById(id).populate("AdditionalDetails").exec();
        if(!userdetails){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //Return response
        return res.status(200).json({
            success: true,
            message: "User Data Fetched successfully.",
            userdetails
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch user details. Please try again."
        })
    }
}

//Function - updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
    try {
      //Fetch Display Picture and user id
      const displayPicture = req?.files?.displayPicture;
      const userId = req.user.id;

      if(!userId || !displayPicture){
        return res.status(404).json({
          success: false,
          message: `Please provide Display Picture`,
        })
      }

      //Upload image to cloudinary
      const image = await uploadToCloudinary(displayPicture,process.env.FOLDER_NAME,1000,1000);
      
      //Update display picture in DB
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      );

      //return response
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error occured while updating display picture. Please try again",
      })
    }
};
  
//Function - getEnrolledCourses
exports.getEnrolledCourses = async (req, res) => {
    try {
      //Fetch user
      const userId = req.user.id;

      //Get user from DB
      let userDetails = await User.findOne({_id: userId})
      .populate({
        path: "courses",
        populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
        }
      })
      .exec();

      userDetails = userDetails.toObject()
	  var SubsectionLength = 0

	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0

		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {

            for(var k = 0; k < userDetails.courses[i].courseContent[j].subSection.length; k++){
                let hours = userDetails.courses[i].courseContent[j].subSection[k].timeDuration.split(":")[0];
                let minutes = userDetails.courses[i].courseContent[j].subSection[k].timeDuration.split(":")[1];
                let seconds = userDetails.courses[i].courseContent[j].subSection[k].timeDuration.split(":")[2];
            
                totalDurationInSeconds += ((hours*60*60) + (minutes*60) + seconds);
            }

            userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)
		    SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length
		}

		let courseProgressCount = await CourseProgress.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }

      //validation
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }

      //return  response
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } 
    catch (error) {
        console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

//Function - instructorDashboard
exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } 
  catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

//Function - adminDashboard
exports.adminDashboard = async (req, res) => {
  try {
    const AllCategories = await category.find({})
    .populate({
      path: "courses",
      populate: {
        path: "instructor",
      },
    }).exec();

    const categoryData = AllCategories.map((category) => {
      const totalcourses = category?.courses?.length
      let totalUniqueInstructors = []

      category?.courses?.map((course) => (
        !totalUniqueInstructors.includes(course?.instructor?._id) ?
        totalUniqueInstructors.push(course?.instructor?._id) : ""
      ));

      // Create a new object with the additional fields
      const categoryDataWithStats = {
        _id: category._id,
        categoryName: category.name,
        categoryDescription: category.description,
        // Include other course properties as needed
        totalcourses,
        totalUniqueInstructors,
      }

      return categoryDataWithStats
    })

    res.status(200).json({ categories: categoryData })
  } 
  catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}
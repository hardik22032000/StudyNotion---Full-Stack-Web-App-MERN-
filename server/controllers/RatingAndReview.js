const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

//Function - CreateRatingAndReview
exports.CreateRatingAndReview = async (req,res) => {
    try{
        //Get User Id
        const userId = req.user.id;

        //Fetch Data from request body
        const {rating, review, courseId} = req.body;

        //Check if user is enrolled or not
        const courseDetails = await Course.findOne({
            _id: courseId, 
            studentsEnrolled: {
                $elemMatch: {$eq: userId}
            }
        });

        if(!courseDetails){
            return res.status(401).json({
                success: false,
                message: `Student is not enrolled in the course`,
            })
        }

        //Check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId, course: courseId
        });

        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: `Student already reviewed the course with ${courseId}`,
            })
        }

        //Create Rating and review
        const ratingReview = await RatingAndReview.create({
            rating,review,
            course: courseId,
            user: userId
        });

        //Update Course with this rating/review
        await Course.findByIdAndUpdate(
            {_id: courseId},
            {
                $push: {
                    ratingAndReviews: ratingReview._id
                }
            },
            {new: true}
        )

        //Return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully",
            ratingReview
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

//Function - GetAverageRating
exports.GetAverageRating = async (req,res) => {
    try{
        //Fetch Course Id
        const {courseId} = req.body;

        //Calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating: {$avg: "$rating"}
                }
            }
        ])

        //Return rating
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                message: "Average Rating calculated successfully",
                averageRating: result[0].averageRating
            })
        }

        //if no rating/review exist
        return res.status(403).json({
            success: false,
            message: "Average Rating = 0, no ratings given till now",
            averageRating: 0
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

//Function - GetAllRatingAndReviews
exports.GetAllRatingAndReviews = async (req,res) => {
    try{
        //Fetch all reviews
        const allReviews = await RatingAndReview.find({})
                           .sort({rating: "desc"})
                           .populate({
                            path:"user",
                            select:"firstName lastName email image"
                           })
                           .populate({
                            path:"course",
                            select:"courseName"
                           })
                           .exec();
        
        //Return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review returned successfully",
            allReviews
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
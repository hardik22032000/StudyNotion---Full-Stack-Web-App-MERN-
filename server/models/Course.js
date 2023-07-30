const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type:String,
        required: true
    },
    courseDescription: {
        type:String,
        trim: true
    },
    instructor: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    whatYouWillLearn: {
        type:String,
        trim: true
    },
    courseContent: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type:Number,
        required: true,
        trim: true
    },
    thumbnail:{
        type:String
    },
    tag: {
		type: [String],
		required: true,
	},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    instructions: {
        type: String,
        required: true,
    },
    studentsEnrolled: [{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }],
    status: {
        type:String,
        required:true,
    }
},{ timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
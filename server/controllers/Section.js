const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");

//Function - CreateSection
exports.CreateSection = async (req,res) => {
    try{
        //Fetch Data from request body
        const {SectionName, courseID} = req.body;

        //Data Validation
        if(!SectionName || !courseID){
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            })
        }

        //Create Section
        const NewSection = await Section.create({
            sectionName: SectionName
        })

        //Update course with Section ObjectId
        const UpdatedCourse = await Course.findByIdAndUpdate(
            {_id: courseID},
            {
                $push: {
                    courseContent: NewSection._id
                }
            },
            {new: true}
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        //Return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully.",
            UpdatedCourse
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to create section. Please try again."
        })
    }
}

//Function - UpdateSection
exports.UpdateSection = async (req,res) => {
    try{
        //Fetch Data from request body
        const {NewSectionName, sectionId, courseId} = req.body;

        //Data Validation
        if(!NewSectionName || !sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            })
        }

        //Update Data
        const UpdatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId},
            {sectionName: NewSectionName},
            {new: true}
        )

        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

        //Return response
        return res.status(200).json({
            success: true,
            message: "Section Updated successfully.",
            UpdatedSection,
            data: course
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to update section. Please try again."
        })
    }
}

//Function - DeleteSection
exports.DeleteSection = async (req,res) => {
    try{
        //Fetch Data from request body
        const {sectionId, courseId} = req.body;

        //Data Validation
        if(!sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            })
        }

        //delete sub section
		await SubSection.deleteMany({_id: {$in: Section.subSection}});

        //Delete Section
        await Section.findByIdAndDelete({_id:sectionId});

        //find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

        //Return response
        return res.status(200).json({
            success: true,
            message: "Section Deleted successfully.",
            data: course
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete section. Please try again."
        })
    }
}
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadToCloudinary} = require("../utils/FileUploader");
require("dotenv").config();

//Function - CreateSubSection
exports.CreateSubSection = async (req,res) => {
    try{
        //Fetch Data from request body
        const {title, timeDuration, description, SectionId} = req.body;

        //Extract Video
        const video = req.files.video;

        //Data Validation
        if(!title || !timeDuration || !description || !SectionId || !video){
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            })
        }

        //Upload Video to Cloudinary
        const UploadDetails = await uploadToCloudinary(video, process.env.FOLDER_NAME);

        //Create SubSection
        const subsection = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: UploadDetails.secure_url
        })

        //Update Section with this sub section object id
        const updatedSection = await Section.findByIdAndUpdate(
            {_id: SectionId},
            {
                $push:{
                    subSection: subsection._id
                }
            },
            {new: true}
        ).populate("subSection").exec()

        //Return response
        return res.status(200).json({
            success: true,
            message: "Sub Section created successfully.",
            data: updatedSection
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to create SubSection. Please try again."
        })
    }
}

//Function - UpdateSubSection
exports.UpdateSubSection = async (req,res) => {
    try{
        //Fetch Data from request body
        const {sectionId, subsectionId, title, timeDuration, description} = req.body;

        //Extract Video
        const video = req?.files?.video;

        //Data Validation
        if(!sectionId || !subsectionId){
            return res.status(400).json({
                success: false,
                message: "Sub section Id is required"
            })
        }

        const subSection = await SubSection.findById(subsectionId)

        if (title !== undefined) {
            subSection.title = title
        }
    
        if (description !== undefined) {
            subSection.description = description
        }
        if(timeDuration !== undefined){
            subSection.timeDuration = timeDuration
        }
        if (video !== undefined) {
        const uploadDetails = await uploadToCloudinary(
            video,
            process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = ((timeDuration!== undefined) ? timeDuration :`${uploadDetails.duration}`)
        }
    
        await subSection.save()
    
        const updatedSection = await Section.findById(sectionId).populate("subSection").exec();

        return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to update Subsection. Please try again.",
            err: error.message
        })
    }
}

//Function - DeleteSubSection
exports.DeleteSubSection = async (req,res) => {
    try{
        //Fetch Data from request body
        const {sectionId, SubsectionId} = req.body;

        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
              $pull: {
                subSection: SubsectionId,
              },
            }
        )

        //Data Validation
        if(!SubsectionId){
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            })
        }

        //Delete Section
        await SubSection.findByIdAndDelete({_id:SubsectionId});

        const updatedSection = await Section.findById(sectionId).populate("subSection").exec();

        //Return response
        return res.status(200).json({
            success: true,
            message: "SubSection Deleted successfully.",
            data: updatedSection
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
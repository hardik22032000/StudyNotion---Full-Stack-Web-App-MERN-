const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");

//initiate the razorpay order
exports.capturePayment = async(req, res) => {

    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.status(400).json({success:false, message:"Please provide Course Id"});
    }

    let totalAmount = 0;

    for(const course_id of courses) {
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(404).json({success:false, message:"Could not find the course"});
            }

            const uid  = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(403).json({success:false, message:"Student is already Enrolled"});
            }

            totalAmount += course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.status(200).json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }

}


//verify the payment
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(400).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        else
        return res.status(400).json({success:"false", message:"Payment Failed"});

}


const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(404).json({success:false,message:"Course not Found"});
        }

        const courseProgress = await CourseProgress.create({
            courseID:courseId,
            userId:userId,
            completedVideos: [],
        })

        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
                courseProgress: courseProgress._id,
            }},{new:true})
            
        ///bachhe ko mail send kardo
        const emailResponse = await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName} - StudyNotion`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
        )    
        console.log("Email Sent Successfully", emailResponse);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved - SudyNotion`,
             paymentSuccessEmail(`${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}




// //capture the payment and initiate the razorpay order
// exports.CapturePayment = async (req,res) => {
//     try{
//         //Get CourseId And UserId
//         const {courseId} = req.body;
//         const userId = req.user.id;

//         //Validation

//         //Valid CourseId
//         if(!courseId){
//             return res.status(404).json({
//                 success: false,
//                 message: 'Please provide valid course Id'
//             })
//         }

//         //valid course details
//         const course = await Course.findById(courseId);
//         if(!course){
//             return res.status(404).json({
//                 success: false,
//                 message: 'Could not find course'
//             })
//         }

//         //check user already bought the course or not
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(403).json({
//                 success: false,
//                 message: 'Student is already Enrolled'
//             })
//         }

//         //Order Create
//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount*100,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes:{
//                 courseId: courseId,
//                 userId: userId
//             }
//         };

//         //Initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         //Return response
//         return res.status(200).json({
//             success: true,
//             message: "Initiated payment for order",
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount
//         });
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// //Verify Signature of Razorpay and server
// exports.verifySignature = async (req,res) => {
//     try{
//         const webhookSecret = "12345678";
//         const signature = req.headers("x-razorpay-signature");

//         const shasum = crypto.createHmac("sha256",webhookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");

//         if(signature === digest){
//             console.log("Payment is authorized");

//             const {courseId, userId} = req.body.payload.payment.entity.notes;

//             //Find the course and enroll the student in it
//             const enrolledCourse = await Course.findByIdAndUpdate(
//                 {_id: courseId},
//                 {
//                     $push: {
//                         studentsEnrolled: userId
//                     }
//                 },
//                 {new: true}
//             );

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Course not found'
//                 })
//             }
//             console.log(enrolledCourse);

//             //Find the student and add course to list of enrolledcourses
//             const EnrolledStudent = await User.findByIdAndUpdate(
//                 {_id: userId},
//                 {
//                     $push: {
//                         courses: courseId
//                     }
//                 },
//                 {new: true}
//             );
//             console.log(EnrolledStudent);

//             //Send Confirmation mail
//             const EmailResponse = await mailSender(EnrolledStudent.email,"Cngratulations - StudyNotion","Congratulations, you are onboarded into new StudyNotion Course");
//             console.log(EmailResponse);

//             //Return response
//             return res.status(200).json({
//                 success: true,
//                 message: "Signature verified and course added",
//             });
//         }
//         else{
//             return res.status(400).json({
//                 success: true,
//                 message: "Invalid request",
//             });
//         }
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
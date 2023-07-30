const User = require("../models/User");
const Profile = require("../models/Profile")
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const passwordUpdated = require("../mail/templates/passwordUpdate");
require("dotenv").config();

//Function - SendOTP
exports.SendOTP = async (req,res) => {
    try{
        //fetch email from request body
        const {email} = req.body;
        
        //check if user already exists
        const checkUserPresent = await User.findOne({email});

        //If User Already Present, send response
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User Already Exists"
            })
        }

        //Generate OTP
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        //check Unique otp or not
        const result = await OTP.findOne({otp: otp});

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email,otp};

        //create entry in db for otp
        const otpBody = await OTP.create(otpPayload);

        //Return successful Response
        res.status(200).json({
            success: true,
            message: "otp sent successfully",
            otp
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Sending OTP"
        })
    }
}

//Function - SignUp
exports.SignUp = async (req,res) => {
    try{
        //data fetch from request body
        const {firstName, lastName, email, password, 
        confirmPassword, accountType, contactNumber, otp} = req.body;

        //validate data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success: false,
                message: "All Fields are Required"
            })
        }

        //check 2 passwords equality
        if(password !== confirmPassword){
            return res.status(403).json({
                success: false,
                message: "Password & Confirm Password does not match"
            })
        }

        //check if user already exists
        const checkUserPresent = await User.findOne({email});

        //If User Already Present, send response
        if(checkUserPresent){
            return res.status(403).json({
                success: false,
                message: "User Already Exists"
            })
        }

        //Find most recent otp
        const recentotp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        
        //validate otp
        if(recentotp.length == 0){
            //otp not found
            return res.status(404).json({
                success: false,
                message: 'OTP Timeout. Please try again'
            })   
        }
        else if(otp !== recentotp[0].otp){
            //Invalid otp
            return res.status(403).json({
                success: false,
                message: `Invalid OTP`
            }) 
        }
        
        //Hash Password
        const hashedPassword = await bcrypt.hash(password,10);

        //create entry in db
        const ProfileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber:null
        })

        const user = await User.create({
            firstName, 
            lastName, 
            email, 
            password:hashedPassword,
            accountType, 
            contactNumber, 
            AdditionalDetails: ProfileDetails._id,
            image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`
        })

        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: "2h",
        });
        user.token = token;
        user.password = undefined;

        //Return successful Response
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user,token
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User registeration failed. Please try again"
        })
    }
}

//Function - Login
exports.Login = async (req,res) => {
    try{
        //Fetch data from request body
        const {email,password} = req.body;

        //validate data
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "All Fields are Required"
            })
        }

        //check if user already exists
        const user = await User.findOne({email}).populate("AdditionalDetails").exec();

        //If User Already not Present, send response
        if(!user){
            return res.status(403).json({
                success: false,
                message: "User does not exists. Please sign up first."
            })
        }

        //Match Password and generate jwt
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined; 

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }

            res.cookie("token",token,options).status(200).json({
                success: true,
                token,user,
                message: "Logged In Successfully"
            })
        }
        else{
            return res.status(403).json({
                success: false,
                message: "Password is incorrect."
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure. Please try again"
        })
    }
}

async function sendPasswordUpdationEmail(email, name) {
    try{
        const mailResponse = await mailSender(email, "Password Updated Successfully - StudyNotion", passwordUpdated(email,name));
        console.log("Email sent Successfully: ", mailResponse);
    }
    catch(error) {
        console.log("error occured while sending mails: ", error);
        throw error;
    }
}

//Function - changePassword
exports.changePassword = async(req,res) => {
    try{
        //Fetch Data from request body
        const {oldPassword, newPassword, confirmNewPassword} = req.body;
        const userId = req.user.id;

        //validate data
        if(!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(403).json({
                success: false,
                message: "All Fields are Required"
            })
        }

        if(oldPassword == newPassword){
            return res.status(403).json({
                success: false,
                message: "New Password must be different than old password."
            })
        }

        if(newPassword !== confirmNewPassword){
            return res.status(403).json({
                success: false,
                message: "Password & Confirm Password Value does not match."
            })
        }

        //Match old password & Update Password in DB
        const user = await User.findOne({_id:userId});

        //Match old password
        if(await bcrypt.compare(oldPassword,user.password) === false){
            return res.status(401).json({
                success: false,
                message: "Old Password is incorrect."
            })
        }
        
        //Update password
        const newhashedPassword = await bcrypt.hash(newPassword,10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: newhashedPassword },
            { new: true }
        );

        //Send Mail -> password updated
        const name = user.firstName;
        await sendPasswordUpdationEmail(updatedUserDetails.email,name);
        
        //Return successful Response
        res.status(200).json({
            success: true,
            message: "User password changed successfully"
        }) 
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Password Change Failure. Please try again"
        })
    }
}
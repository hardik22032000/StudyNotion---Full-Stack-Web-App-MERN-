const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const passwordUpdated = require("../mail/templates/passwordUpdate");

//Function - ResetPasswordToken
exports.resetPasswordToken = async (req,res) => {
    try{
        //Fetch Email from Request Body
        const {email} = req.body;

        //Email Validation
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Email is not registered with us."
            })
        }

        //Generate token
        const token = crypto.randomUUID();

        //update user by adding token & expiration time
        const updatedUser = await User.findOneAndUpdate(
            {email: email},
            {
                token: token,
                resetPasswordExpires: Date.now() + 5*60*1000,
            },
            {new: true}
        )
        
        //create url
        const url = `http://localhost:3000/updatePassword/${token}`;

        //Send mail Containing the Url
        await mailSender(email,"Password Reset Link - StudyNotion",`Password Reset Link: ${url}`);

        //return response
        return res.status(200).json({
            success: true,
            message: "Email sent successfully. Please check email to reset password."
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while generating token for resetting the password."
        })
    }
}

//Function - ResetPassword
exports.ResetPassword = async (req,res) => {
    try{
        //Fetch Data
        const {password, confirmPassword, token} = req.body;

        //validation
        if(password !== confirmPassword){
            return res.status(403).json({
                success: false,
                message: "Password not matching."
            })
        }

        //Get User Details from DB using token
        const userDetails = await User.findOne({token: token});

        //if no entry - invalid token
        if(!userDetails){
            return res.status(403).json({
                success: false,
                message: "Token Invalid."
            })
        }

        //token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(403).json({
                success: false,
                message: "Token expired. Regenerate your token."
            })
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //Password update
        const UpdatedUser = await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new: true}
        );

        //return response
        return res.status(200).json({
            success: true,
            message: "Password reset successfully."
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting the password."
        })
    }
}

//Function - Reset Password Confirmation
exports.resetPasswordConfirmation = async (req,res) => {
    try{
        //Fetch token from Request Body
        const {token} = req.body;

        //token Validation
        const user = await User.findOne({token: token});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Email is not registered with us."
            })
        }

        //Send mail confirmation
        await mailSender(user.email,"Password Updated Successfully - StudyNotion",passwordUpdated(user.email,user.firstName));

        //return response
        return res.status(200).json({
            success: true,
            message: "Email sent successfully. Password Updated Successfully."
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending email for password reset confirmation.",
            error: error.message
        })
    }
}
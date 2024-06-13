const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//middleware - auth
exports.auth = async (req,res,next) => {
    try{
        //extract token
        const token = req.cookies.token || req.body.token || 
                      req.header("Authorisation").replace("Bearer ","");
        
        //If token missing, return response
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }

        //verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        }
        catch(err){
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token.",
            error: error.message
        });
    }
}

//middleware - isStudent
exports.isStudent = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Students only."
            });
        }
        next();
    }
    catch{
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying user role"
        });
    }
}

//middleware - isInstructor
exports.isInstructor = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor only."
            });
        }
        next();
    }
    catch{
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying user role"
        });
    }
}

//middleware - isAdmin
exports.isAdmin = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only."
            });
        }
        next();
    }
    catch{
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying user role"
        });
    }
}
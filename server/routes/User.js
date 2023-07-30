// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const { Login, SignUp, SendOTP, changePassword } = require("../controllers/Auth");
const { resetPasswordToken, ResetPassword, resetPasswordConfirmation } = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/auth");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", Login)

// Route for user signup
router.post("/signup", SignUp)

// Route for sending OTP to the user's email
router.post("/sendotp", SendOTP)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password routes
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", ResetPassword)

// Route for sending reset password confirmation email
router.post("/reset-password-confirmation", resetPasswordConfirmation)

// Export the router for use in the main application
module.exports = router
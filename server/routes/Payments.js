// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payments");
const { auth, isStudent } = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Payment routes
// ********************************************************************************************************

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

// Export the router for use in the main application
module.exports = router;
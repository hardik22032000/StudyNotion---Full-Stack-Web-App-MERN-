const express = require("express")
const router = express.Router()
const { contactUsController } = require("../controllers/ContactUs")

// ********************************************************************************************************
//                                      Contact Us
// ********************************************************************************************************

router.post("/contact-here", contactUsController)

module.exports = router
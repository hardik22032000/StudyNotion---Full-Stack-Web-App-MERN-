const express = require("express");
const app = express();

const UserRoutes = require("./routes/User");
const ProfileRoutes = require("./routes/Profile");
const PaymentRoutes = require("./routes/Payments");
const CourseRoutes = require("./routes/Course");
const ContactRoutes = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//Database connect
database.connect();

//Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:"*",
        credentials: true,
    })
)

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir:"/tmp"
    })
)

//Cloudinary connection
cloudinaryConnect();

//routes mounting
app.use("/api/v1/auth",UserRoutes);
app.use("/api/v1/profile",ProfileRoutes);
app.use("/api/v1/payment",PaymentRoutes);
app.use("/api/v1/course",CourseRoutes);
app.use("/api/v1/course",CourseRoutes);
app.use("/api/v1/contact",ContactRoutes);

//default route
app.get("/", (req,res) => {
    return res.json({
        success: true,
        message: `Your server is up and running...`
    });
});

//Server activation
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
})

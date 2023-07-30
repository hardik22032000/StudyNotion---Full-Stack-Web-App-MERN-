import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPasswordConfirmation from "./pages/ResetPasswordConfirmation";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import { useSelector } from "react-redux";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Wishlist from "./components/core/Dashboard/Wishlist";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import Course from "./pages/Course";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import InstructorDashboard from "./components/core/InstructorDashboard/InstructorDashboard";
import AdminDashboard from "./components/core/Admin/AdminDashboard";
import AddCategory from "./components/core/Admin/AddCategory";
import AllCategories from "./components/core/Admin/AllCategories";
import EditCategory from "./components/core/Admin/EditCategory";

function App() {

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="/courses/:courseId" element={<Course />} />
 
        <Route path="/signup" element={
          <OpenRoute>
              <Signup />
          </OpenRoute>
        }/>

        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        }/>

        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        }/>

        <Route path="/updatePassword/:id" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        }/>

        <Route path="/verify-email" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        }/>

        <Route path="/reset-password-confirmation" element={
          <OpenRoute>
            <ResetPasswordConfirmation />
          </OpenRoute>
        }/>

        <Route path="/about" element={
            <AboutUs />
        }/>

        <Route path="/contact" element={
            <ContactUs />
        }/>

        <Route path="" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>

          <Route path="/dashboard/my-profile" element={
              <MyProfile />
          }/>

          <Route path="/dashboard/settings" element={
              <Settings />
          }/>

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="dashboard/wishlist" element={<Wishlist />} />
              <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path="dashboard/instructor-dashboard" element={<InstructorDashboard />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <>
              <Route path="dashboard/admin-dashboard" element={<AdminDashboard />} />
              <Route path="dashboard/add-category" element={<AddCategory />} />
              <Route path="dashboard/all-categories" element={<AllCategories />} />
              <Route path="dashboard/edit-category/:categoryId" element={<EditCategory />} />
              </>
            )
          }

        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>

        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route 
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )
        }

      </Route>

      <Route path="*" element={<Error />} />

      </Routes>
    </div>
  );
}

export default App;

import { Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "./components/shared/PageNotFound";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Login from "./components/Forms/Login";
import SignUp from "./components/Forms/SignUp";
import Home from "./pages/Home";
import ForgotPassword from "./components/Forms/ForgotPassword";
import ResetPassword from "./components/Forms/ResetPassowrd";
import EmailVerify from "./components/Forms/EmailVerify";
import UserProfile from "./components/Forms/UserProfile";
import LoginWithGoogle from "./components/Forms/LoginWithGoogle";
import Subscription from "./pages/Subscription";
import Listing from "./pages/listing/Listing";
import TeacherLayout from "./components/layout/AdminLayout";
import UploadCource from "./components/dashboard/teacher/UploadCourse";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isUserRoute = location.pathname.startsWith("/user");
  const isTeacherRoute = location.pathname.startsWith("/teacher");

  return (
    <div>
      {!isAdminRoute && !isTeacherRoute && !isUserRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/login-with-google" element={<LoginWithGoogle />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/course/:id" element={<Listing />} />

      

        {/* teacher  */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route path="upload-course" element={<UploadCource />} />
        </Route>

        <Route path="/*" element={<PageNotFound />} />
      </Routes>

      {!isAdminRoute && !isUserRoute && !isTeacherRoute && <Footer />}
    </div>
  );
}

export default App;

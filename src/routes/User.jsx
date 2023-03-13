import React from "react";
import { Route, Routes } from "react-router-dom";
import EmailVerify from "../components/User/Emailverify/EmailVerify";
import Hotale404Page from "../pages/Hotale404Page";

import LoginPage from "../pages/Login/LoginPage";
import SignupPage from "../pages/Signup/SignupPage";
import BookingPage from "../pages/User/BookingPage";
import HomePage from "../pages/User/HomePage";
import HotelDetailsPage from "../pages/User/HotelDetailsPage";
import HotelsPage from "../pages/User/HotelsPage";
import MyBookings from "../pages/User/MyBookings";
import SuccessPage from "../pages/User/SuccessPage";
import UserProfilePage from "../pages/User/UserProfilePage";

function User() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotelDetails" element={<HotelDetailsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
        <Route path="/*" element={<Hotale404Page />} />
      </Routes>
    </div>
  );
}

export default User;

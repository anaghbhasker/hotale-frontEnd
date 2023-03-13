import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminDashboardPage from "../pages/Admin/AdminDashboardPage";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import AdminShowOwnerPage from "../pages/Admin/AdminShowOwnerPage";
import AdminShowUsersPage from "../pages/Admin/AdminShowUsersPage";
import AdminShowHotelPage from "../pages/Admin/AdminShowHotelPage";
import AdminHotelView from "../pages/Admin/AdminHotelView";
import ShowMessagePage from "../pages/Admin/ShowMessagePage";
import AdminBookingDetailsPage from "../pages/Admin/AdminBookingDetailsPage";
import AdminNotification from "../pages/Admin/AdminNotification";
import Hotale404Page from "../pages/Hotale404Page";

function Admin() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminDashboardPage />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/showUsers" element={<AdminShowUsersPage />} />
        <Route path="/showOwners" element={<AdminShowOwnerPage />} />
        <Route path="/showHotel" element={<AdminShowHotelPage />} />
        <Route path="/hotelView" element={<AdminHotelView />} />
        <Route path="/showMessages" element={<ShowMessagePage />} />
        <Route path="/bookings" element={<AdminBookingDetailsPage />} />
        <Route path="/notification" element={<AdminNotification />} />
        <Route path="/*" element={<Hotale404Page />} />
      </Routes>
    </div>
  );
}

export default Admin;

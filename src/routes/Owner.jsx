import React from "react";
import { Route, Routes } from "react-router-dom";

import OwnerLoginPage from "../pages/Owner/OwnerLoginPage";
import OwnerOtp from "../pages/Owner/OwnerOtp";
import OwnerSignUppage from "../pages/Owner/OwnerSignUppage";
import OwnerDashBoardPage from "../pages/Owner/OwnerDashBoardPage";
import OwnerHotelPage from "../pages/Owner/OwnerHotelPage";
import OwnerAddHotelPage from "../pages/Owner/OwnerAddHotelPage";
import LocationFinderPage from "../pages/Owner/LocationFinderPage";
import OwnerThanksPage from "../pages/Owner/OwnerThanksPage";
import OwnerEditHotelPage from "../pages/Owner/OwnerEditHotelPage";
import OwnerProfilePage from "../pages/Owner/OwnerProfilePage";
import OwnerMessages from "../pages/Owner/OwnerMessages";
import Hotale404Page from "../pages/Hotale404Page";

function Owner() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<OwnerDashBoardPage />} />
        <Route path="/login" element={<OwnerLoginPage />} />
        <Route path="/signup" element={<OwnerSignUppage />} />
        <Route path="/getotp" element={<OwnerOtp />} />
        <Route path="/showHotels" element={<OwnerHotelPage />} />
        <Route path="/addHotel" element={<OwnerAddHotelPage />} />
        <Route path="/mapLocation" element={<LocationFinderPage />} />
        <Route path="/thankYou" element={<OwnerThanksPage />} />
        <Route path="/editHotel" element={<OwnerEditHotelPage />} />
        <Route path="/profileView" element={<OwnerProfilePage />} />
        <Route path="/messages" element={<OwnerMessages />} />
        <Route path="/*" element={<Hotale404Page />} />
      </Routes>
    </div>
  );
}

export default Owner;

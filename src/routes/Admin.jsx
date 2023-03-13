import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AdminDashboardPage from '../pages/Admin/AdminDashboardPage'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'
import AdminShowOwnerPage from '../pages/Admin/AdminShowOwnerPage'
import AdminShowUsersPage from '../pages/Admin/AdminShowUsersPage'
import AdminShowHotelPage from '../pages/Admin/AdminShowHotelPage'
import AdminHotelView from '../pages/Admin/AdminHotelView'
import ShowMessagePage from '../pages/Admin/ShowMessagePage'
import AdminBookingDetailsPage from '../pages/Admin/AdminBookingDetailsPage'
import AdminNotification from '../pages/Admin/AdminNotification'

function Admin() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<AdminDashboardPage/>}/>
        </Routes>
        <Routes>
          <Route path='/login' element={<AdminLoginPage/>}/>
        </Routes>
        <Routes>
          <Route path='/showUsers' element={<AdminShowUsersPage/>}/>
        </Routes>
        <Routes>
          <Route path='/showOwners' element={<AdminShowOwnerPage/>}/>
        </Routes>
        <Routes>
          <Route path='/showHotel' element={<AdminShowHotelPage/>}/>
        </Routes>
        <Routes>
          <Route path='/hotelView' element={<AdminHotelView/>}/>
        </Routes>
        <Routes>
          <Route path='/showMessages' element={<ShowMessagePage/>}/>
        </Routes>
        <Routes>
          <Route path='/bookings' element={<AdminBookingDetailsPage/>}/>
        </Routes>
        <Routes>
          <Route path='/notification' element={<AdminNotification/>}/>
        </Routes>
    </div>
  )
}

export default Admin
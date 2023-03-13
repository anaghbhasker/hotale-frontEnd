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
          <Route path='/' element={<AdminDashboardPage/>}/>

          <Route path='/login' element={<AdminLoginPage/>}/>

          <Route path='/showUsers' element={<AdminShowUsersPage/>}/>

          <Route path='/showOwners' element={<AdminShowOwnerPage/>}/>

          <Route path='/showHotel' element={<AdminShowHotelPage/>}/>

          <Route path='/hotelView' element={<AdminHotelView/>}/>
   
          <Route path='/showMessages' element={<ShowMessagePage/>}/>

          <Route path='/bookings' element={<AdminBookingDetailsPage/>}/>

          <Route path='/notification' element={<AdminNotification/>}/>
    </div>
  )
}

export default Admin
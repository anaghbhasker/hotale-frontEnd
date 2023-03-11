import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EmailVerify from '../components/User/Emailverify/EmailVerify'


import LoginPage from '../pages/Login/LoginPage'
import SignupPage from '../pages/Signup/SignupPage'
import BookingPage from '../pages/User/BookingPage'
import HomePage from '../pages/User/HomePage'
import HotelDetailsPage from '../pages/User/HotelDetailsPage'
import HotelsPage from '../pages/User/HotelsPage'
import MyBookings from '../pages/User/MyBookings'
import SuccessPage from '../pages/User/SuccessPage'
import UserProfilePage from '../pages/User/UserProfilePage'



function User() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
        </Routes>
        <Routes>
          <Route path='/signup' element={<SignupPage/>}/>
        </Routes>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
        <Routes>
          <Route path='/users/:id/verify/:token'  element={<EmailVerify/>} />
        </Routes>
        <Routes>
          <Route path='/hotels' element={<HotelsPage/>}/>
        </Routes>
        <Routes>
          <Route path='/hotelDetails' element={<HotelDetailsPage/>}/>
        </Routes>
        <Routes>
          <Route path='/booking' element={<BookingPage/>}/>
        </Routes>
        <Routes>
          <Route path='/success' element={<SuccessPage/>}/>
        </Routes>
        <Routes>
          <Route path='/mybookings' element={<MyBookings/>}/>
        </Routes>
        <Routes>
          <Route path='/userprofile' element={<UserProfilePage/>}/>
        </Routes>
    </div>
  )
}

export default User
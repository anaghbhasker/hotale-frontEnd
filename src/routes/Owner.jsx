import React, { } from 'react'
import { Route, Routes } from 'react-router-dom'



import OwnerLoginPage from '../pages/Owner/OwnerLoginPage'
import OwnerOtp from '../pages/Owner/OwnerOtp'
import OwnerSignUppage from '../pages/Owner/OwnerSignUppage'
import OwnerDashBoardPage from '../pages/Owner/OwnerDashBoardPage'
import OwnerHotelPage from '../pages/Owner/OwnerHotelPage'
import OwnerAddHotelPage from '../pages/Owner/OwnerAddHotelPage'
import LocationFinderPage from '../pages/Owner/LocationFinderPage'
import OwnerThanksPage from '../pages/Owner/OwnerThanksPage'
import OwnerEditHotelPage from '../pages/Owner/OwnerEditHotelPage'
import OwnerProfilePage from '../pages/Owner/OwnerProfilePage'
import OwnerMessages from '../pages/Owner/OwnerMessages'

function Owner() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<OwnerDashBoardPage/>}/>
            </Routes>
            <Routes>
                <Route path='/login' element={<OwnerLoginPage/>}/>
            </Routes>
            <Routes>
                <Route path='/signup' element={<OwnerSignUppage/>} />
            </Routes>
            <Routes>
                <Route path='/getotp' element={<OwnerOtp/>}/>
            </Routes>
            <Routes>
                <Route path='/showHotels' element={<OwnerHotelPage/>}/>
            </Routes>
            <Routes>
                <Route path='/addHotel' element={<OwnerAddHotelPage/>}/>
            </Routes>
            <Routes>
                <Route path='/mapLocation' element={<LocationFinderPage/>}/>
            </Routes>
            <Routes>
                <Route path='/thankYou' element={<OwnerThanksPage/>}/>
            </Routes>
            <Routes>
                <Route path='/editHotel' element={<OwnerEditHotelPage/>}/>
            </Routes>
            <Routes>
                <Route path='/profileView' element={<OwnerProfilePage/>}/>
            </Routes>
            <Routes>
                <Route path='/messages' element={<OwnerMessages/>}/>
            </Routes>
        </div>
    )
}

export default Owner
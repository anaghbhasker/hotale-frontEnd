import React from 'react'

import { UserIcon,HomeModernIcon } from "@heroicons/react/24/solid"
import { Email ,DashboardCustomize} from "@mui/icons-material"
import SidebarLinks from './SidebarLinks';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate=useNavigate()
    return (
        <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
        <div className="flex item-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
         {/* <Image  src={'/images/log_transparent.png'} alt='fds' width={300} height={300}></Image> */}
        <h4 className="text-white text-lg ml-2 xl:ml-8 font-bold p-2 ">Hotale</h4>
        </div>
        <button onClick={()=>{navigate('/owner/addHotel')}} className="hidden xl:inline ml-auto bg-white text-[#000] rounded-md w-52 h-[38px] text-lg font-bold shadow-md hover:bg-[#2f2e2e] hover:text-white ">Add Hotel</button>
        <div className="space-y-10 mt-4 mb-2.5 xl:ml-24">
            <div>
            <Link to={'/owner/'}>
                <SidebarLinks text='Dashboard' Icon={DashboardCustomize} active={false} />
            </Link>
            </div>
            <div>
            <Link to={'/owner/showHotels'}>
                <SidebarLinks text='Hotel Details' Icon={HomeModernIcon} active={false} /> 
            </Link>
            </div>
            <div>
            <Link to={'/owner/profileView'}>
                <SidebarLinks text='My Profile' Icon={UserIcon} active={false}/>
            </Link>
            </div>
            <div>
            <Link to={'/owner/messages'}>
                <SidebarLinks text='Messages' Icon={Email} active={false}/>
            </Link>
            </div>
        </div>
    </div>
    )
}

export default Sidebar
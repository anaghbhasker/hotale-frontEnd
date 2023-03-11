import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BriefcaseIcon ,BuildingOffice2Icon  } from '@heroicons/react/24/solid'
import { Logout } from '@mui/icons-material'

import Sidebar from '../../components/Owner/Sidebar'
import DashboardOwner from '../../components/Owner/DashboardOwner'
import Bottomnavigate from '../../components/Owner/Bottomnavigate'
import { getOwner } from '../../config/Service/OwnerRequest'

function OwnerDashBoardPage() {
    const navigate=useNavigate()
    const [ownerName,setOwnerName]=useState()
    const [ownerEmail,setOwnerEmail]=useState()

    useEffect(()=>{
        async function invoke(){
            const data=await getOwner()
            if(data.status==="success"){
                setOwnerName(data.ownerName)
                setOwnerEmail(data.ownerEmail)
            }else{
                navigate('/owner/login')
            }
        }invoke()
    },[navigate])

    const logout=()=>{
        localStorage.removeItem('ownertoken')
        navigate('/owner/login')
    }
    return (
        <>
        <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
            <Sidebar/>
            <div className="flex-grow border-l border-r border-gray-700 max-w sm:ml-[73px] xl:ml-[370px]">
            <div className="flex item-center px-1.5 py-2 border-b border-r border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
                <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
                <BriefcaseIcon className="h-7 text-white" />
                </div>
                Dashboard
            <div className="text-[#d9d9d9] flex item-center justify-center hoverAnimation sm:ml-auto xl:-mr-5 ml-auto mt-auto">
            <BuildingOffice2Icon className="h-10 w-10 rounded-full xl:mr-2.5"/>
                <div className="hidden xl:inline leading-4">
                    <p className="font-medium text-base">{ownerName}</p>
                    <p className="text-[#6e767d] text-sm">{ownerEmail}</p>
                </div>
                
            </div>
                <Logout onClick={logout} className={" mt-4 rounded-full xl:mr-2.5 cursor-pointer"}/>
            </div>
            <DashboardOwner/>
            <div className="pb-72"></div>
            </div>
            <Bottomnavigate/>
        </main>
    </>
    )
}

export default OwnerDashBoardPage
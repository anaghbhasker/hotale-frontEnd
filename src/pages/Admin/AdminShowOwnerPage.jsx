import React from 'react'

import { BriefcaseIcon } from '@heroicons/react/24/solid'
import { Logout } from '@mui/icons-material'

import { useNavigate } from 'react-router-dom'

import AdminSidebar from '../../components/Admin/AdminSidebar'
import BotNavigateAdmin from '../../components/Admin/BotNavigateAdmin'
import AdminShowOwners from '../../components/Admin/AdminShowOwners'

function AdminShowOwnerPage() {
    const navigate=useNavigate()

    const logout=()=>{
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
    }
    return (
        <>
        <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
            <AdminSidebar/>
            <div className="flex-grow border-l border-r border-gray-700 max-w sm:ml-[73px] xl:ml-[370px]">
            <div className="flex item-center px-1.5 py-2 border-b border-r border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
                <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
                <BriefcaseIcon className="h-7 text-white" />
                </div>
                OWNERS
                <div className="text-[#d9d9d9] flex item-center justify-center hoverAnimation sm:ml-auto xl:-mr-5 ml-auto mt-auto">
                
                </div>
                <Logout onClick={logout} className={" mt-4 rounded-full xl:mr-2.5 cursor-pointer"}/>
            </div>
            <AdminShowOwners/>
            </div>
            <BotNavigateAdmin/>
        </main>
    </>
    )
}

export default AdminShowOwnerPage
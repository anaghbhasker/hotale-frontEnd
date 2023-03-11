import React from 'react'
import { UserIcon,HomeModernIcon ,ClipboardDocumentCheckIcon} from "@heroicons/react/24/solid"
import { Email,DashboardCustomize,SettingsAccessibility} from "@mui/icons-material"
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { Link } from 'react-router-dom'

function BotNavigateAdmin() {
    return (
        <section id="bottom-navigation" className="sm:hidden  md:hidden xl:hidden lg:hidden fixed inset-x-0 bottom-0 z-10 bg-black text-white shadow">
    <div id="tabs" className="flex justify-between">
        <Link to={'/admin'} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
            <DashboardCustomize className="inline-block mb-1 h-7 " />
            <span className="tab tab-home block text-xs">Dashboard</span>
        </Link>
        <Link to={'/admin/showUsers'} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
            <UserIcon className="inline-block mb-1 h-7 "/>
            <span className="tab tab-kategori block text-xs">Users</span>
        </Link>
        <Link to={'/admin/showOwners'} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
            <SettingsAccessibility className="inline-block mb-1 h-7 "/>
            <span className="tab tab-explore block text-xs">Owners</span>
        </Link>
        <Link to={'/admin/showHotel'} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
           <HomeModernIcon className="inline-block mb-1 h-7 " />
            <span className="tab tab-whishlist block text-xs">Hotels</span>
        </Link>
        <Link to={'/admin/bookings'} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
           <ClipboardDocumentCheckIcon className="inline-block mb-1 h-7 "/>
            <span className="tab tab-account block text-xs">Bookings</span>
        </Link>
        <Link to={'/admin/notification'} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
           <NotificationImportantIcon className="inline-block mb-1 h-7 "/>
            <span className="tab tab-account block text-xs">Notification</span>
        </Link>
        <Link to={'/admin/showMessages'} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
            <Email className="inline-block mb-1 h-7 "/>
            <span className="tab tab-account block text-xs">Message</span>
        </Link>
    </div>
</section>
    )
}

export default BotNavigateAdmin
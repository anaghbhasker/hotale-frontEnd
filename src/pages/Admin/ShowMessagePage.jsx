import React from 'react'

import { BriefcaseIcon } from '@heroicons/react/24/solid'
import { Logout } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import AdminSidebar from '../../components/Admin/AdminSidebar'
import BotNavigateAdmin from '../../components/Admin/BotNavigateAdmin'
import AdminChatWidget from '../../components/Admin/Chat/AdminChatWidget'
import AdminChatBox from '../../components/Admin/Chat/AdminChatBox'

import { useState } from 'react'
import jwt_decode from "jwt-decode";
import { useEffect } from 'react'

import { AdminContext } from '../../context/AdminContext'
import { useContext } from 'react'

function ShowMessagePage() {

    const ownertoken = localStorage.getItem("adminToken");
    const decoded = jwt_decode(ownertoken);
    
    const navigate=useNavigate()

    const [onlineUsers,setOnlineUsers]=useState([])
    const [sendMessage,setSendMessage]=useState(null)
    const [recieveMessage,setRecieveMessage]=useState(null)
    
    const {socket}= useContext(AdminContext)

    // socket implementation


    // send message to the socket server
    useEffect(()=>{
      if(sendMessage!==null){
        socket.emit('send-message',sendMessage)
      }
    },[socket,sendMessage])

    useEffect(()=>{
      socket.emit('new-user-add',decoded._id)
      socket.on('get-users',(users)=>{
        setOnlineUsers(users)
      })
    },[socket,decoded._id])

    // receive message to the socket server
    useEffect(()=>{
      socket.on('receive-message',(data)=>{
        setRecieveMessage(data)
      })
    },[socket])

    // socket implementation

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
            Messages
            <div className="text-[#d9d9d9] flex item-center justify-center hoverAnimation sm:ml-auto xl:-mr-5 ml-auto mt-auto">
            
            </div>
            <Logout onClick={logout} className={" mt-4 rounded-full xl:mr-2.5 cursor-pointer"}/>
        </div>
        

        <div className="flex h-screen antialiased gap-3 text-gray-800">
            <div className="flex flex-row h-full w-full  overflow-x-hidden">
              <AdminChatWidget setSendMessage={setSendMessage} recieveMessage={recieveMessage}
              />
            </div>

            <AdminChatBox onlineUsers={onlineUsers}
            />
          </div>

        </div>
        <BotNavigateAdmin/>
      </main>
    </>
    )
}

export default ShowMessagePage
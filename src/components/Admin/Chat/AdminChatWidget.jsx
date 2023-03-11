import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/AdminContext";
import jwt_decode from "jwt-decode";
import {
  adminDetails,
  adminGetAllmessages,
  getOwner,
} from "../../../config/Service/AdminRequest";
import Moment from "react-moment";
import InputEmoji from "react-input-emoji";
import { postMessage } from "../../../config/Service/OwnerRequest";
import { useRef } from "react";

function AdminChatWidget({setSendMessage,recieveMessage}) {
  const { chatAdmin } = useContext(AdminContext);
  const ownertoken = localStorage.getItem("adminToken");
  const decoded = jwt_decode(ownertoken);

  const [messages, setMessages] = useState([]);
  const [owner, setOwner] = useState();
  const [admin, setAdmin] = useState();
  const [text, setText] = useState("");

  const scroll=useRef()

  useEffect(()=>{
    if (recieveMessage !== null && recieveMessage.chatId===chatAdmin?._id) {
      setMessages([...messages,recieveMessage])
    }
  },[recieveMessage,chatAdmin?._id])

  useEffect(() => {
    async function invoke() {
      const data = await adminGetAllmessages(chatAdmin?._id);
      setMessages(data.result);
    }
    if (chatAdmin !== null) invoke();
  }, [chatAdmin]);

  useEffect(() => {
    async function invoke() {
      const ownerId = chatAdmin.members.find((id) => id !== decoded._id);
      const result = await getOwner(ownerId);
      setOwner(result.ownerDetails);
    }
    if (chatAdmin !== null) invoke();
  }, [chatAdmin, decoded._id]);

  useEffect(() => {
    async function invoke() {
      const data = await adminDetails(decoded._id);
      setAdmin(data.adminDetails);
    }
    if (chatAdmin !== null) invoke();
  }, [chatAdmin, decoded._id]);


  async function handleOnEnter(text) {
    if(text){
      let obj={
        senderId: decoded._id,
        text:text,
        chatId:chatAdmin?._id
      }
      const data=await postMessage(obj)
      setMessages([...messages,data.result])

      // send message to socket server
    
      const receiverId = chatAdmin?.members.find((id) => id !== decoded._id);
      setSendMessage({...obj,receiverId})
    }
  }

  async function handleButton(text){
    if(text){
      const message=text
      setText('')
      let obj={
        senderId: decoded._id,
        text:message,
        chatId:chatAdmin?._id
      }
      const data=await postMessage(obj)
      setMessages([...messages,data.result])

      // send message to socket server
    
      const receiverId = chatAdmin?.members.find((id) => id !== decoded._id);
      setSendMessage({...obj,receiverId})
    }
  }


  // Always scrool to last message
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  return (
    <>
      {chatAdmin ? (
        <div className="flex flex-col flex-auto h-[90vh] ">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col overflow-x-auto h-full mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {messages?.map((message) => (
                    <>
                      {message?.senderId === decoded._id && (
                        <div ref={scroll} className="col-start-6 col-end-13 p-3 rounded-lg">
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center uppercase h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                              {admin?.email.substring(0, 1)}
                            </div>
                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              <div>{message?.text}</div>
                              <p className="text-xs text-green-600 font-thin">
                                <Moment fromNow>{message?.createdAt}</Moment>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {message?.senderId !== decoded._id && (
                        <div ref={scroll} className="col-start-1 col-end-8 p-3 rounded-lg">
                          <div className="flex flex-row items-center">
                            {owner?.profilephoto ? (
                              <img
                                src={owner?.profilephoto}
                                className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                alt="..."
                              />
                            ) : (
                              <div className="flex items-center justify-center uppercase h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                {owner?.firstname.substring(0, 1)}
                              </div>
                            )}
                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                              <div>{message?.text}</div>
                              <p className="text-xs text-green-600 font-thin">
                                <Moment fromNow>{message?.createdAt}</Moment>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div className="flex-grow ml-4">
                <InputEmoji
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  onEnter={handleOnEnter}
                  placeholder="Type a message"
                />
              </div>
              <div className="ml-4">
                <button onClick={()=>{handleButton(text)}} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-auto h-[90vh] ">
          <div className="flex flex-col flex-auto text-center flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <p className="text-2xl font-medium italic">
              Tap on a Chat to start Conversation..
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminChatWidget;

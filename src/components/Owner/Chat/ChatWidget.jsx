import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import jwt_decode from "jwt-decode";
import {
  getAdmin,
  getAllmessages,
  myPic,
  postMessage,
} from "../../../config/Service/OwnerRequest";
import Moment from "react-moment";
import InputEmoji from "react-input-emoji";
import { useRef } from "react";





function ChatWidget({setSendMessage,recieveMessage}) {
  const { chat } = useContext(AppContext);
  const ownertoken = localStorage.getItem("ownertoken");
  const decoded = jwt_decode(ownertoken);

  const [admin, setAdmin] = useState();
  const [owner, setOwner] = useState();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const scroll=useRef()
  

  useEffect(()=>{
    if (recieveMessage !== null && recieveMessage.chatId===chat?._id) {
      setMessages([...messages,recieveMessage])
    }
  },[recieveMessage,chat?._id])

  useEffect(() => {
    async function invoke() {
      const adminId = chat.members.find((id) => id !== decoded._id);
      const result = await getAdmin(adminId);
      setAdmin(result.adminDetails);
    }
    if (chat !== null) invoke();
  }, [chat, decoded._id]);

  useEffect(() => {
    async function invoke() {
      const data = await getAllmessages(chat?._id);
      setMessages(data.result);
    }
    if (chat !== null) invoke();
  }, [chat]);

  useEffect(() => {
    async function invoke() {
      const data = await myPic(decoded._id);
      setOwner(data.result);
    }
    if (chat !== null) invoke();
  }, [chat, decoded._id]);

  // console.log(chat?._id);
  // console.log(decoded._id);
  // console.log(admin);
  // console.log(messages)
  // console.log(owner);

  async function handleOnEnter(text) {
    if(text){
      let obj={
        senderId: decoded._id,
        text:text,
        chatId:chat?._id
      }
      const data=await postMessage(obj)
      setMessages([...messages,data.result])

      // send message to socket server
    
      const receiverId = chat?.members.find((id) => id !== decoded._id);
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
        chatId:chat?._id
      }
    
      const data=await postMessage(obj)
      setMessages([...messages,data.result])

      // send message to socket server
    
      const receiverId = chat?.members.find((id) => id !== decoded._id);
      setSendMessage({...obj,receiverId})
    }
    
  }

  // Always scrool to last message
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[messages])



  return (
    <>
      {chat ? (
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
                            {owner?.profilephoto ? (
                              <img
                                src={owner?.profilephoto}
                                alt=".."
                                className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-10 w-10 rounded-full uppercase bg-indigo-500 flex-shrink-0">
                                {owner?.firstname.substring(0,1)}
                              </div>
                            )}
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
                            <div className="flex items-center justify-center h-10 w-10 rounded-full uppercase bg-indigo-500 flex-shrink-0">
                              {admin?.email.substring(0, 1)}
                            </div>
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
            <p className="text-2xl font-medium italic">Tap on a Chat to start Conversation..</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatWidget;

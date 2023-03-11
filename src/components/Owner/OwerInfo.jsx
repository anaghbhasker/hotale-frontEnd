import React, { useEffect, useState } from "react";
import { createChat, fullDetails, getAllAdmin } from "../../config/Service/OwnerRequest";
import MessageIcon from "@mui/icons-material/Message";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

function OwerInfo() {
  const navigate=useNavigate()
  const [owner, setOwner] = useState();
  const [admins, setAdmins] = useState([]);

  const ownertoken= localStorage.getItem('ownertoken')

  useEffect(() => {
    async function invoke() {
      const data = await fullDetails();
      setOwner(data.owner);
    }
    invoke();
  }, []);

  useEffect(() => {
    async function invoke() {
      const data = await getAllAdmin();
      setAdmins(data.admins);
    }
    invoke();
  }, []);

  const chatStart=async(receiverId)=>{
    const decoded = jwt_decode(ownertoken);
    let obj={
      senderId:decoded._id,
      receiverId:receiverId
    }
    await createChat(obj)
    navigate('/owner/messages')
  }

  return (
    <div className="text-gray-400 mt-4">
      <div className="border border-r border-gray-700">
        <h3 className="text-white ml-3 mt-2 font-semibold">
          Profile Information
        </h3>
        <div className="grid grid-cols-2 ml-3 mt-2 mb-3 font-normal">
          <div className="mt-3">Email: {owner?.email}</div>
          <div className="mt-3">Phone: {owner?.phone}</div>
          <div className="mt-3 inline-flex">
            City:{" "}
            {owner?.city ? (
              <p>{owner.city}</p>
            ) : (
              <p className="text-red-500 italic">Please add your city</p>
            )}
          </div>
          <div className="mt-3 inline-flex">
            State:{" "}
            {owner?.state ? (
              <p>{owner.state}</p>
            ) : (
              <p className="text-red-500 italic">Please add your city</p>
            )}
          </div>
          <div className="mt-3 inline-flex">
            Zip:{" "}
            {owner?.zip ? (
              <p>{owner.zip}</p>
            ) : (
              <p className="text-red-500 italic">Please add your city</p>
            )}
          </div>
        </div>
        <h3 className="text-white ml-3 mt-5 font-semibold">Help Lines</h3>

        {admins?.map((admin,i) => (
          <div onClick={()=>{chatStart(admin?._id)}} className="flex ml-8 mt-3 hover:cursor-pointer">
            <MessageIcon />
            <p class="text-sky-500 hover:text-sky-600 ">Line-{i+1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwerInfo;

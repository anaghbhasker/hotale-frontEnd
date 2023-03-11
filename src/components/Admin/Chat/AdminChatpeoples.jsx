import React, { useState, useEffect, useContext  } from "react";
import { getOwner } from "../../../config/Service/AdminRequest";
import { AdminContext } from "../../../context/AdminContext";

function AdminChatpeoples({ data, currentAdminId ,onlineUsers}) {

  const { setChatAdmin }=useContext(AdminContext)

  const [owner, setOwner] = useState();

  useEffect(() => {
    async function invoke() {
      const ownerId = data.members.find((id) => id !== currentAdminId);
      const result = await getOwner(ownerId);

      let status = false;
      onlineUsers.forEach((online) => {
        if (status) {
        } else {
          status = online?.userId === result?.ownerDetails?._id;
        }
      });
      let obj = {
        ...result.ownerDetails,
        onlineStatus: status,
      };





      setOwner(obj);
    }
    invoke();
  }, [data, currentAdminId,onlineUsers]);

  const showMessage=async()=>{
    setChatAdmin(data)
  }
  return (
    <>
      <button onClick={()=>{showMessage()}} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
        {owner?.profilephoto ? (
          <img
            src={owner?.profilephoto}
            className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full"
            alt="...."
          />
        ) : (
          <div className="flex items-center justify-center uppercase h-8 w-8 bg-gray-200 rounded-full">
            {owner?.firstname.substring(0, 1)}
          </div>
        )}
        <div className="ml-2 text-sm font-semibold">
          {owner?.firstname} {owner?.lastname}
        </div>
        {owner?.onlineStatus&&(
        <div className="flex items-center justify-center ml-auto text-xs text-green-500 bg-green-500 h-4 w-4 rounded-xl leading-none">
          2
        </div>
        )}
      </button>
    </>
  );
}

export default AdminChatpeoples;

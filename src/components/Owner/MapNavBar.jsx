import React, { useEffect, useState } from "react";
import Image from "../../Assets/Screenshot 2023-01-29 010123.png";
import PersonIcon from "@mui/icons-material/Person";
import { getOwner } from "../../config/Service/OwnerRequest";
import { useNavigate } from "react-router-dom";

function MapNavbar() {
  const navigate=useNavigate()
  const [ownerName,setOwnerName]=useState('')

  useEffect(()=>{

    async function invoke(){
      const data=await getOwner()
      if(data.status==="success"){
          setOwnerName(data.ownerName)
      }else{
          navigate('/owner/login')
      }
  }invoke()

  },[navigate])


  return (
    <>
      <div className=" w-full h-28 shadow-lg bg-slate-50 ">
        <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
          <img src={Image} alt="/" width="150" height="80" />
          <div className="text-black">
            <ul className="flex hover:border h-16 w-40 hover:bg-slate-50 text-sky-600 hover:bg-gray-100 ">
              <p className="text-stone-700 cursor-pointer mt-5 ml-12 font-bold text-lg text-sky-700">
                <PersonIcon />
                {ownerName}
              </p>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default MapNavbar;

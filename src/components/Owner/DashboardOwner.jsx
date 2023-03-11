import React, { useEffect } from 'react'
import { useState } from 'react'
import { ownerDashBoard } from '../../config/Service/OwnerRequest'
import OwnerChart from './OwnerChart'

function DashboardOwner() {

    const [ownerDash,setOwnerDash]=useState(null)

    useEffect(()=>{
        async function invoke(){
            const data=await ownerDashBoard()
            setOwnerDash(data);
        }invoke()
    },[])


    return (
        <div>
        <div className=" flex  justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">


            <div className="flex justify-between">
                <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-black shadow-lg border">
                <img
                    className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                    src="https://hbr.org/resources/images/article_assets/2021/03/ICF.SC_.Article.2.image_.-HBR-positive-reinforcement_1099307402.jpg"
                    alt="null"
                />
                <div className="p-6 flex flex-col justify-start">
                    <h5 className="text-gray-300 text-xl font-medium mb-2">
                    BOOKINGS
                    </h5>
                    <h3 className="text-gray-300 text-6xl mb-4">
                    {ownerDash?.Totalbooking}
                    </h3>
                </div>
                </div>
            </div>


            <div className="flex justify-between">
                <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-black shadow-lg border">
                <img
                    className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                    src="https://www.skytechindia.com/images/company.jpg"
                    alt=""
                />
                <div className="p-6 flex flex-col justify-start">
                    <h5 className="text-gray-300 text-xl font-medium mb-2">
                    Total Hotels
                    </h5>
                    <h3 className="text-gray-300 text-6xl mb-4">
                    {ownerDash?.Totalhotels}
                    </h3>
                </div>
                </div>
            </div>


            
            <div className="flex justify-between">
                <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-black shadow-lg border">
                <img
                    className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                    src="https://images.ctfassets.net/pdf29us7flmy/6CUCq15966GPkPR9gJbPSP/2fd7431ed38ec4fb8ca16365868e7c8e/Virtual_Interview_8.png"
                    alt=""
                />
                <div className="p-6 flex flex-col justify-start">
                    <h5 className="text-gray-300 text-xl font-medium mb-2">
                    TOTAL PAYMENTS
                    </h5>
                    <h3 className="text-gray-300 text-2xl mb-4">
                    {(ownerDash?.Totalamount*90)/100}
                    </h3>
                </div>
                </div>
            </div>
            <OwnerChart/>
            </div>
        </div>
        </div>
    )
}

export default DashboardOwner
import React, { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { getOwnerHotel, hotelbann } from "../../config/Service/OwnerRequest";

function Showhotels() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);

  const [isBann, setIsbann] = useState(false);

  useEffect(() => {
    async function invoke() {
      const data = await getOwnerHotel();
      setHotels(data.hotels);
    }
    invoke();
  }, [isBann]);

  const editHotel = async (hotelId) => {
    navigate("/owner/editHotel", { state: { id: hotelId } });
  };

  const hotelBann = async (hoteId) => {
    const data=await hotelbann(hoteId)
    if(data.status==="success"){
      setIsbann(!isBann)
    }else{
      toast.error(`OOPS!!Something Error`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex pl-4 mt-5">
        <div className="text-white">
          <h4 className="text-lg font-semibold">Hotels</h4>
        </div>

        <div className="text-white ml-auto mr-6">
          <button
            onClick={() => {
              navigate("/owner/addHotel");
            }}
            className="bg-[#100072] font-semibold px-4 py-1 rounded hover:bg-[#2c2b36ad]"
          >
            Add hotel
          </button>
        </div>
      </div>

      <div className="mt-4 ml-4 mr-6">
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block  xs:w-1/3 w-1/3 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Hotel name"
              required
            />
          </div>
        </form>
      </div>

      {hotels.map((hotel, i) => (
        <div className="ml-4 mr-4 mt-4">
          <div className="w-full p-4 text-center  border rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700">
            <div className="flex justify-between space-y-4 sm:flex sm:space-y-0 sm:space-x-4 text-white">
              <div className="max-w-sm">
                <h4 className="">Hotal Name</h4>
                <p className="text-gray-500 font-normal break-all ">
                  {hotel.hotelname}
                </p>
              </div>

              <div className="relative">
                <h4>Total Available Rooms</h4>
                <p className="text-gray-500 font-normal break-all">
                  {hotel.totalrooms}
                </p>
              </div>

              <div>
                <h4>Action</h4>

                {hotel.isOwnerStoped? (
                  <button
                    type="button"
                    onClick={() => {
                      hotelBann(hotel._id);
                    }}
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-6 py-2.5 text-center mr-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Unhide
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      hotelBann(hotel._id);
                    }}
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Hide
                  </button>
                )}
              </div>

              <div>
                <h4>waiting for admin approval</h4>

                {hotel.isApproved ? (
                  <p className="text-green-600 font-extrabold break-all">
                    Approved
                  </p>
                ) : (
                  <p className="text-yellow-600 font-extrabold break-all">
                    Pending
                  </p>
                )}
              </div>

              <button
                onClick={() => {
                  editHotel(hotel._id);
                }}
                type="button"
                data-dial-toggle="speed-dial-menu-dropdown"
                aria-controls="speed-dial-menu-dropdown"
                aria-expanded="false"
                className="flex items-center justify-center ml-auto text-black bg-white rounded-full w-14 h-14 hover:bg-blue-800  dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
                <span className="sr-only">Open actions menu</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Showhotels;

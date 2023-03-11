import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getThathotel, hotelBann } from "../../config/Service/AdminRequest";

function HotelView() {
  const location = useLocation();
  const hotelId = location.state.id;
  const [hotel, setHotel] = useState();
  const [isBann,setIsBann]=useState(false)

  useEffect(() => {
    async function invoke() {
      const data = await getThathotel(hotelId);
      setHotel(data.hotel);
    }
    invoke();
  }, [isBann,hotelId]);

  const hotelDisable = async (hotelId) => {
    const data = await hotelBann(hotelId);
    if(data.status==="success"){
        setIsBann(!isBann)
    }
  };

  return (
    <>
      <div className="mx-auto  flex justify-center items-center py-12 px-4 sm:px-10">
        <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0">
          <div className="w-80 sm:w-auto flex flex-col justify-start items-start">
            <div>
              <p className="text-3xl xl:text-4xl font-semibold leading-9 text-white dark:text-white">
                {hotel?.hotelname}
              </p>
            </div>
            <div className="mt-4 lg:w-4/5 xl:w-3/5">
              <p className="text-base leading-6 text-gray-600 dark:text-white">
                {hotel?.description}
              </p>
            </div>
            <div className="mt-16 w-full">
              {hotel?.isAdminBanned ? (
                <button
                  onClick={() => {
                    hotelDisable(hotel._id);
                  }}
                  className="px-4 bg-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100  flex justify-between items-center w-full lg:w-72 h-14 text-white hover:bg-gray-700 focus:ring-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 dark:hover:bg-gray-100"
                >
                  <p className="text-xl font-medium leading-5 ">Remove Ban</p>
                  <img
                    class="dark:hidden"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/hero-II-svg1.svg"
                    alt="arrow"
                  />
                  <img
                    class="dark:block hidden"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/hero-II-svg1dark.svg"
                    alt="arrow"
                  ></img>
                </button>
              ) : (
                <button
                  onClick={() => {
                    hotelDisable(hotel._id);
                  }}
                  className="px-4 bg-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200  flex justify-between items-center w-full lg:w-72 h-14 text-white hover:bg-gray-700 focus:ring-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 dark:hover:bg-gray-100"
                >
                  <p className="text-xl font-medium leading-5 ">
                    Temporary Disabled
                  </p>
                  <img
                    class="dark:hidden"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/hero-II-svg1.svg"
                    alt="arrow"
                  />
                  <img
                    class="dark:block hidden"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/hero-II-svg1dark.svg"
                    alt="arrow"
                  ></img>
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row jusitfy-center items-center sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0">
            <div className="">
              <img className="hidden lg:block" src={hotel?.photo1} alt="sofa" />
              <img
                className="w-80 sm:w-auto lg:hidden"
                src={hotel?.photo1}
                alt="sofa"
              />
            </div>
            <div className="flex flex-col justify-center items-center space-y-4 sm:space-y-0 sm:space-y-5 lg:space-y-5 xl:space-y-8">
              <div>
                <img className="hidden lg:block" src={hotel?.photo2} alt="" />
                <img
                  className="w-80 sm:w-auto lg:hidden"
                  src={hotel?.photo2}
                  alt="chairs"
                />
              </div>
              <div>
                <img
                  className="hidden lg:block"
                  src={hotel?.photo3}
                  alt="chairs"
                />
                <img
                  className="w-80 sm:w-auto lg:hidden"
                  src={hotel?.photo3}
                  alt="chairs"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="2xl:container 2xl:mx-auto md:py-0 py-9">
        <p className="text-3xl xl:text-4xl font-semibold leading-9 text-white dark:text-white px-10">
          Fesility
        </p>
        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-12 gap-14 lg:px-20 lg:py-12 py-10 md:px-12 px-4">
          {hotel?.fesility.map((fesility) => (
            <div class="">
              <h3 class="text-xl leading-5 dark:text-white font-semibold text-gray-800 lg:mt-10 mt-8">
                {fesility}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="text-gray-400 mt-4">
        <div className="border border-r border-gray-700">
          <h3 className="text-white ml-3 mt-2 font-semibold">
            Profile Information
          </h3>
          <div className="grid grid-cols-2 ml-3 mt-2 mb-3 font-normal">
            <div className="mt-3">
              OwnerName: {hotel?.ownerId?.firstname} {hotel?.ownerId?.lastname}
            </div>
            <div className="mt-3">Owner Number: {hotel?.ownerId?.phone}</div>
            <div className="mt-3">Total Rooms: {hotel?.totalrooms}</div>
            <div className="mt-3">Price: {hotel?.price}</div>
            <div className="mt-3">Location: {hotel?.location}</div>
            <div className="mt-3">Zip: {hotel?.zip}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelView;

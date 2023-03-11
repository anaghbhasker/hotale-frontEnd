import React, { useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link } from "react-router-dom";
import { topRated } from "../../config/Service/UserRequest";

function Review() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function invoke() {
      const data = await topRated();
      setHotels(data.hotels);
    }
    invoke();
  }, []);
  return (
    <>
      {hotels?.map((hotel) => (
        <div className="bg-white ml-8  rounded-lg pb-6  shadow-2xl sm:items-center min-h-[445px] max-w-[80%] group">
          <div className="overflow-hidden">
            <img
              className="group-hover:scale-110 rounded h-60 transition-all duration-300 w-full"
              src={hotel?.photo2}
              alt=""
            />
          </div>
          <div className="bg-white  border-b-2 shadow-xl   max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center font-bold text-gray-500 tracking-[1px] text-base">
            <div className="flex justify-between w-[80%]">
              <div className="flex items-center gap-x-2">
                <div className="text-sky-600">
                  <PeopleAltIcon className="text-[17px]" />
                </div>
                <div className="flex gap-x-1">
                  <div>max </div>
                  <div>4</div>
                </div>
              </div>

              <div className="flex items-center gap-x-2 ml-2">
                <div className="text-sky-600">
                  <CurrencyRupeeIcon className="text-[15px]" />
                </div>
                <div className="flex gap-x-1">
                  <div>Rs.</div>
                  <div>{hotel?.price}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center -mt-6">
            <Link to={"/"}>
              <h3 className="font-semibold">{hotel?.hotelname}</h3>
            </Link>
            <p className="max-w-[300px] mx-auto mb-3 lg:mb-6 text-gray-400">
              {hotel?.description.substring(0,120)}...
            </p>
          </div>
          {/* <div className="flex flex-col items-center">
            <button className="bg-sky-600  rounded hover:bg-sky-800 text-white  border p-2 px-12 text-semibold max-w-[240px]">
              Book Now
            </button>
          </div> */} 
        </div>
      ))}
    </>
  );
}

export default Review;

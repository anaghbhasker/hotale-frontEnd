import React, { useEffect, useState } from "react";
import { keralaHotels } from "../../config/Service/UserRequest";

function ExploreKerala() {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    async function invoke() {
      const data = await keralaHotels();
      setHotels(data.hotels);
    }
    invoke();
  }, []);
  return (
    <div className="2xl:mx-auto 2xl:container">
      <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8">
        <h1 className="lg:text-4xl text-3xl font-semibold text-gray-800 text-center">
          Explore Kerala
        </h1>
        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 lg:mt-16 md:mt-12 mt-8 items-center">
            {hotels?.map((hotel) => (
              <div className="relative flex flex-col">
                <img
                  src={hotel?.photo1}
                  alt="black guy"
                  className="w-full h-52"
                />
                <div className="absolute m-6 bottom-0 z-30">
                  <p className="text-sm leading-none text-white">
                    {hotel?.location}
                  </p>
                  <h1 className="w-64 text-2xl font-semibold leading-8 mt-2 text-white">
                    {hotel?.hotelname}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreKerala;

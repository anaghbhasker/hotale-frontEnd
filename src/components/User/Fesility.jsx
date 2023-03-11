import React, { useEffect, useState } from "react";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import WifiIcon from "@mui/icons-material/Wifi";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WashIcon from "@mui/icons-material/Wash";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PoolIcon from "@mui/icons-material/Pool";
import AirIcon from "@mui/icons-material/Air";
import { useLocation } from "react-router-dom";
import { hoteView } from "../../config/Service/UserRequest";

function Fesility() {
  const location = useLocation();
  const hotelId = location.state.hotelId;
  const [hotel, setHotel] = useState();

  useEffect(() => {
    async function invoke() {
      const data = await hoteView(hotelId);
      setHotel(data.hotel);
    }
    invoke();
  }, [hotelId]);

  return (
    <div className="flex-col w-full h-40 items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Fesility
        </h5>

        <div className="flex gap-10 px-5 pt-5">
          {hotel?.fesility.includes("free-cancelation") ? (
            <span>
              <CancelScheduleSendIcon />
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Free Cancelation
              </p>
            </span>
          ) : (
            ""
          )}

          {hotel?.fesility.includes("All-day-service") ? (
            <span>
              <MiscellaneousServicesIcon />
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                All-day Service
              </p>
            </span>
          ) : (
            ""
          )}

          {hotel?.fesility.includes("Wifi") ? (
            <span>
              <WifiIcon />
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Wifi
              </p>
            </span>
          ) : (
            ""
          )}

          {hotel?.fesility.includes("Restaurant") ? (
            <span>
              <RestaurantIcon />
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Restaurant
              </p>
            </span>
          ) : (
            ""
          )}

          {hotel?.fesility.includes("Washing-Service") ? (
            <span>
              <WashIcon />
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Washing-Service
              </p>
            </span>
          ) : (
            ""
          )}

          {hotel?.fesility.includes("Car-Park") ? (
            <span>
              <LocalParkingIcon />
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Parking
              </p>
            </span>
          ) : (
            ""
          )}

          {hotel?.fesility.includes("Gym") ? (
            <span>
              <FitnessCenterIcon />
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Gym
              </p>
            </span>
          ) : (
            ""
          )}

          {hotel?.fesility.includes("Swimming-Pool") ? (
            <span>
              <PoolIcon />
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Swimming-Pool
              </p>
            </span>
          ) : (
            ""
          )}

          {hotel?.fesility.includes("Air-conditionar") ? (
            <span>
              <AirIcon />
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Air-conditionar
              </p>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Fesility;

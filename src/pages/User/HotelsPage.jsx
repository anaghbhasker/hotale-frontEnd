import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarNew from "../../components/User/NavbarNew";
import "../User/Hotels.css";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import HotelList from "../../components/User/HotelList";
import { gethotel } from "../../config/Service/UserRequest";
import Footer from "../../components/User/Footer/Footer";
import Maillist from "../../components/User/Maillist/Maillist";
import LoadingPage from "./LoadingPage";

function HotelsPage() {
  const [isLoading,setIsloading]=useState(false)
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.place);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const options=location.state.options
  const [hotel,setHotel]=useState([])
  const [suggestions, setSuggestions] = useState([]);



  useEffect(()=>{
    async function invoke(){ 
        setIsloading(true)       
        const data=await gethotel(destination)
        setIsloading(false)
        setHotel(data.hotel)
    }invoke()
  },[destination])


  const handleInput = async (event) => {
    setDestination(null)
    const query = event.target.value;
    if (!query) {
    setSuggestions([]);
    return;
    }
    const url = `${process.env.REACT_APP_MAPBOX_GEOCODING}/${encodeURIComponent(
    query
    )}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    setSuggestions(data.features.map((f) => f.place_name));
};

const handlePickup = async (suggestion) => {
    const pla=suggestion
    setDestination(pla)
    setSuggestions([])
  };


  return (
    <div>
      {isLoading?<LoadingPage/>:
      <>
      <NavbarNew />
      <div className="listContainer mb-5">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input value={destination} type="text" onChange={handleInput}/>
            </div>

            {suggestions.length > 0 && (
                        <div className="">
                    <ul className=" z-10 bg-white border border-gray-400 w-full max-h-48 overflow-y-scroll mt-5 rounded shadow-md">
                        {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handlePickup(suggestion)}
                            className="text-black cursor-pointer hover:bg-gray-200 p-2 hover:text-black border-b border-gray-400"
                        >
                            {suggestion}
                        </li>
                        ))}
                    </ul>
                        </div>
                    )}



            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
               
                
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.adult}

                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    value={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.room}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="listResult">
            <HotelList hotel={hotel} date={date} option={options}/>
          </div>
        </div>
      </div>
      <Maillist/>
      <Footer/>
      </>
    }
    </div>
  );
}

export default HotelsPage;

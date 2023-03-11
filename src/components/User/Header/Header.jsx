import React, { useState } from "react";
import "./Header.css";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate=useNavigate()

  const [suggestions, setSuggestions] = useState([]);
  const [place,setPlace]=useState(null)
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });


  const handleInput = async (event) => {
    setPlace(null)
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
  setPlace(pla)
  setSuggestions([])
};


  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { place, date, options } });
  };

  return (
    <div className="header bg-gray-800 bg-opacity-80">
      <div className="headerContainer">
        
        
        <h1 className="font-extrabold text-2xl">A lifetime of discounts? It's Genius.</h1>
        <p className="headerDesc">
        By continuing, you agree to let hotale.com email you regarding your property registration.Registration is free and can take as little as 15 minutes to complete..
        </p>
        <button onClick={()=>{navigate('/owner/login')}} className="headerBtn">Sign in / Register</button>









        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              value={place}
              placeholder="Where are you going?"
              className="headerSearchInput text-black"
              onChange={handleInput}
            />
          </div>


          



          <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                  date[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>


          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className="headerSearchText"
            >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
            {openOptions && (
              <div className="options">
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.adult <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.children <= 0}
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.children}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.room <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        {suggestions.length > 0 && (
                        <div className="absolute mt-16">
                    <ul className=" z-10 bg-white border border-gray-400 w-full max-h-48 overflow-y-scroll mt-14 rounded shadow-md">
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





      </div>
    </div>
  );
}

export default Header;

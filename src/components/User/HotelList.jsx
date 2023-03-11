import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import "./HotelList.css";

function HotelList(props) {
  const navigate=useNavigate()
  const [hotels, setHotels] = useState([]);
  const date=props.date
  const option=props.option
  useEffect(() => {
    setHotels(props.hotel);
  }, [props.hotel]);
  
  const handleHotelView=async(hotelId)=>{
    navigate('/hotelDetails',{ state : { hotelId , date, option }})
  }
  
  return (
    <>
      {hotels?.map((hotel) => (
        <div className="searchItem">
          <img src={hotel.photo1} alt="" className="siImg" />
          <div className="siDesc">
            <h1 className="siTitle">{hotel.hotelname}</h1>
            <span className="siDistance">{hotel.location}</span>
            <span className="siTaxiOp">{hotel.contact}</span>

            <span className="siFeatures">{hotel.description}</span>
            {hotel.fesility.includes("free-cancelation") ? (
              <span className="siCancelOp">Free cancellation </span>
            ) : (
              ""
            )}
            {hotel.fesility.includes("free-cancelation") ? (
              <span className="siCancelOpSubtitle">
                {" "}
                You can cancel later, so lock in this great price today!{" "}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="siDetails">
            <div className="siRating">
              <span>Excellent</span>
              <button>8.9</button>
            </div>
            <div className="siDetailTexts">
              <span className="siPrice">{hotel.price}₹</span>
              <span className="siTaxOp">Includes taxes and fees</span>
              <button onClick={()=>{handleHotelView(hotel._id)}} className="siCheckButton">See availability</button>
            </div>
          </div>
        </div>
      ))}
      <Pagination count={3} color="secondary" />
      
    </>
  );
}

export default HotelList;

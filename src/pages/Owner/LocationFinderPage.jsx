import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { addLocation } from "../../config/Service/OwnerRequest";
import MapNavbar from "../../components/Owner/MapNavBar";

const LocationFinderPage = () => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    const navigate=useNavigate()
    const location=useLocation()
    const hotelId=location.state.id

    const [suggestions, setSuggestions] = useState([]);
    const [place,setPlace]=useState(null)
    const [plongitude,setLongitude]=useState('76.2673')
    const [platitude,setLatitude]=useState('9.9312')


    useEffect(() => {
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v12",
            center: [plongitude, platitude],
            zoom: 7,
        });
        const coordinates = [plongitude, platitude];
        addToMap(map, coordinates);
    }, [plongitude,platitude]);
    const addToMap = (map, coordinates) => {
        const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
        console.log(marker)
    };


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
        const url=`${process.env.REACT_APP_MAPBOX_GEOCODING}/${suggestion}.json?limit=1&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
        const response= await fetch(url)
        const data = await response.json();
        const longitude = data.features[0].geometry.coordinates[0]
        const latitude = data.features[0].geometry.coordinates[1]
        setLongitude(longitude)
        setLatitude(latitude)
    };

    const addMark=async(e)=>{
        let obj={
            hotelId:hotelId,
            location:place,
            longitude:plongitude,
            latitude:platitude
        }
        if(obj.hotelId&&obj.location&&obj.longitude&&obj.latitude){
            const data=await addLocation(obj)
            if(data.status==="success"){
                navigate('/owner/thankYou')
            }else{
                toast.error(`Something error`, {
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
        }else{
            toast.error(`Please Mark your Location`, {
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
    }

    return (
        <>
        <MapNavbar/>
        <div className="flex h-screen w-screen  justify-center p-5 fixed z-10 top-0 left-0">
        <ToastContainer />
            <div className="rounded-lg h-20  bg-gray-200 p-5 sm:w-5/12">
            <div className="flex">
                <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="pointer-events-none absolute w-5 fill-gray-500 transition"
                >
                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                </svg>
                </div>
                <input
                type="text"
                placeholder="Please Add your Hotel location"
                value={place}
                onChange={handleInput}
                className="w-full bg-white pl-2 text-base font-semibold outline-0"
                id=""
                />
                <input
                type="button"
                
                onClick={(e)=>{addMark(e)}}
                value="Add Mark"
                className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
                />

                    {suggestions.length > 0 && (
                        <div className="absolute">
                    <ul className=" z-10 bg-black border border-gray-400 w-full max-h-48 overflow-y-scroll mt-14 rounded shadow-md">
                        {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handlePickup(suggestion)}
                            className="text-white cursor-pointer hover:bg-gray-200 p-2 hover:text-black border-b border-gray-400"
                        >
                            {suggestion}
                        </li>
                        ))}
                    </ul>
                        </div>
                    )}


            </div>
            </div>
        </div>
        <div className="flex-1 h-screen w-full fixed" id="map" />
        </>
    );
};

export default LocationFinderPage;

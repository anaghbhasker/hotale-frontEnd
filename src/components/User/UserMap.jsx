import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { hoteView } from "../../config/Service/UserRequest";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;


function UserMap() {
  const location = useLocation();
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYW5hZ2hiaGFza2VyIiwiYSI6ImNsZTRoOXczZjAzMGEzcW1tdWpienV1YTcifQ._VZD7do8MH-f0_p76quyYQ";
  const hotelId = location.state.hotelId;
  const [p1, setP1] = useState(75.373804);
  const [p2, setP2] = useState(11.876225);
  useEffect(() => {
    async function invoke() {
      const data = await hoteView(hotelId);
      setP1(data.longitude);
      setP2(data.latitude);
    }
    invoke();
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [p1, p2],
      zoom: 8,
    });
    const coordinates = [p1, p2];
    addToMap(map, coordinates);
  }, [p1, p2, hotelId]);
  const addToMap = (map, coordinates) => {
    const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    console.log(marker);
  };
  return (
    <div
      id="map"
      className="flex flex-col w-full h-80 items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    ></div>
  );
}

export default UserMap;

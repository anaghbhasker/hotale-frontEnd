import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";
import { Box, ThemeProvider } from "@mui/material";
import { useEffect } from 'react';
import { totalBookings } from '../../config/Service/AdminRequest';
import { useState } from 'react';


const theme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      body1: {
        color: "#fff",
      },
    },
  });

function AdminShowBookings() {

    const [bookings,setbookings]=useState([])


    useEffect(()=>{
        async function invoke(){
            const data=await totalBookings()
            setbookings(data.totals);
        }invoke()
    },[])



    const columns = [
        { field: "_id", headerName: "BookingId", width: 150 },
        { field: "check_in", headerName: "Check-In", width: 150 },
        { field: "check_out", headerName: "Check-Out", width: 150 },
        { field: "bookingdate", headerName: "Booking Date", width: 150 },
        { field: "totalprice", headerName: "Price", width: 150 },
        { field: "firstname", headerName: "Customer Name", width: 150 },
        { field: "hotelName", headerName: "Hotal Name", width: 170 },
    ];
    



    return (
        <ThemeProvider theme={theme}>
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
              placeholder="Search User name"
              required
            />
          </div>
        </form>
      </div>
      <Box
        sx={{
          mt: 3,
          color: "#fff",
          height: 500,
          width: "100%",
        }}
      >
        <DataGrid
          rows={bookings}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(bookings) => bookings._id}
        />
      </Box>
    </ThemeProvider>
    )
}

export default AdminShowBookings
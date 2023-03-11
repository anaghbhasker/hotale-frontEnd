import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";
import { Box, ThemeProvider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getBookings } from "../../config/Service/OwnerRequest";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

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
function BookingDetails() {
  const location = useLocation();
  const hotelId = location.state.id;

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function invoke() {
      const data = await getBookings(hotelId);
      setBookings(data.bookings);
    }
    invoke();
  }, [hotelId]);

  const columns = [
    { field: "_id", headerName: "BookingId", width: 150 },
    { field: "check_in", headerName: "Check_in", width: 200 },
    { field: "check_out", headerName: "Check_out", width: 200 },
    { field: "bookingdate", headerName: "BookingDate", width: 200 },
    { field: "totaldays", headerName: "TotalDays", width: 100 },
    { field: "totalprice", headerName: "TotalPrice", width: 200 },
  ];
  return (
    <>
      {bookings?.length === 0 ? (
        <div className="flex text-red-600 justify-center mt-5 mb-5 font-bold text-lg">
            <h1>No bookings...</h1>
            <SentimentVeryDissatisfiedIcon/>
        </div>
      ) : (
        <div className="mt-10">
          <ThemeProvider theme={theme}>
            <h1 className="text-white text-2xl font-bold italic ml-5">
              Booking Details
            </h1>
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
                getRowId={(users) => users._id}
              />
            </Box>
          </ThemeProvider>
        </div>
      )}
    </>
  );
}

export default BookingDetails;

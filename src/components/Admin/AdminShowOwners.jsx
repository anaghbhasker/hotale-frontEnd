import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

import MessageIcon from "@mui/icons-material/Message";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";
import { Box, ThemeProvider } from "@mui/material";

import { adminCreateChat, doOwnerBlk, getOwners } from "../../config/Service/AdminRequest";

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

function AdminShowOwners() {
  const [owners, setOwner] = useState([]);
  const [ownerStatus, setOwnerStatus] = useState(false);
  const navigate = useNavigate();

  const admintoken= localStorage.getItem('adminToken')

  useEffect(() => {
    async function invoke() {
      const data = await getOwners();
      if (data.status === "failed") {
        navigate("/admin/login");
      } else {
        setOwner(data.owners);
      }
    }
    invoke();
  }, [ownerStatus, navigate]);

  const ownerBlk = async (ownerId) => {
    const data = await doOwnerBlk(ownerId);
    if (data.status === "success") {
      setOwnerStatus(!ownerStatus);
    }
  };

  const columns = [
    { field: "firstname", headerName: "Firstname", width: 200 },
    { field: "lastname", headerName: "Lastname", width: 150 },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 200,
    },
    {
      field: "isBanned",
      headerName: "Status",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <div>
          {!params.row.isBanned ? (
            <p className="text-green-500 py-1 px-3 font-bold">Active</p>
          ) : (
            <p className="text-red-600 py-1 px-3 font-bold">Inactive</p>
          )}
        </div>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <div>
          {!params.row.isBanned ? (
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => {
                swal({
                  title: "Are you sure?",
                  text: "Once Banned, you will be able to unblock this owner !",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    swal("Poof! This Owner has been banned!", {
                      icon: "success",
                    });
                    ownerBlk(params.row._id);
                  } else {
                    swal("This Owner is safe!");
                  }
                });
              }}
            >
              Block
            </button>
          ) : (
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => {
                swal({
                  title: "Good job!",
                  text: "Unbloked this owner",
                  icon: "success",
                  button: "Click!",
                });
                ownerBlk(params.row._id);
              }}
            >
              Unblock
            </button>
          )}{" "}
        </div>
      ),
    },
    {
      field: "Message",
      headerName: "Message",
      width: 100,
      editable: true,
      renderCell: (params) => (
        <div onClick={()=>{chatStart(params.row._id)}} className="hover:cursor-pointer">          
          <MessageIcon/>
        </div>
      ),
    },
  ];

  const chatStart=async(ownerId)=>{
    const decoded = jwt_decode(admintoken);
    let obj={
      senderId:decoded._id,
      receiverId:ownerId
    }
    await adminCreateChat(obj)
    navigate('/admin/showMessages')
  }
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
              placeholder="Search Owner name"
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
          rows={owners}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(owners) => owners._id}
        />
      </Box>
    </ThemeProvider>
  );
}

export default AdminShowOwners;

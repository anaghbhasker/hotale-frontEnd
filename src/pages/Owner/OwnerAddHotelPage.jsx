import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Multiselect from "multiselect-react-dropdown";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { toBase64 } from "../../Extra/Base64";
import { addHotel, getOwner } from "../../config/Service/OwnerRequest";
function OwnerAddHotelPage() {
  const navigate = useNavigate();
  


  function onSelectFesility(val, changeVal) {
    setFesility(val);
  }



  useEffect(()=>{
    async function invoke(){
      const data=await getOwner()
      if(data.status==="success"){
          console.log("Owner verified")
      }else{
          navigate('/owner/login')
      }
  }invoke()
  },[navigate])


  const [fesility, setFesility] = useState([]);
  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);

    const basePhoto1 = await toBase64(photo1);
    const basePhoto2 = await toBase64(photo2);
    const basePhoto3 = await toBase64(photo3);

    let obj = {
      ownerToken: localStorage.getItem("ownertoken"),
      hotelname: data.get("hotelname"),
      description: data.get("description"),
      totalrooms: data.get("totalrooms"),
      contact: data.get("contact"),
      price: data.get("price"),
      city: data.get("city"),
      state: data.get("state"),
      zip: data.get("zip"),
      photo1: basePhoto1,
      photo2: basePhoto2,
      photo3: basePhoto3,
      fesility: fesility,
    };

    if (
      obj.hotelname &&
      obj.description &&
      obj.totalrooms &&
      obj.contact &&
      obj.price &&
      obj.city &&
      obj.state &&
      obj.zip &&
      obj.photo1 &&
      obj.photo2 &&
      obj.photo3
    ) {
      let mob = /^([+]\d{2})?\d{10}$/;
      let zip = /^([+]\d{2})?\d{6}$/;
      if (zip.test(obj.zip.toString())) {
          if (mob.test(obj.contact.toString())) {
            const data = await addHotel(obj)
            if (data.status === "success") {
              const id = data.hotelId;
              navigate("/owner/mapLocation", { state: { id: id } });
            } else {
              toast.error(`OOPS! Something Error`, {
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
          } else {
            setError("Please enter your valid contact number");
          }
      } else {
        setError("Your hotel zip address has an invalid zip format");
      }
    } else {
      toast.error(`OOPS! All fields are required`, {
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
  };

  return (
    <>
      {error ? (
        <div
          className="bg-red-400 border-t-4 top-0 w-full  border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">
                There was a problem with your request!
              </p>
              <p className="text-sm">{error}</p>
              <span
                class="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => {
                  setError("");
                }}
              >
                <svg
                  class="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <section className="w-full h-[100vh] bg-gray-800 text-gray-50">
        <ToastContainer />
        <div className="overflow-x-hidden">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="container flex flex-col mx-auto space-y-12 md:w-3/5"
          >
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-900">
              <div className="space-y-2 col-span-full lg:col-span-1">
                <p className="font-extrabold text-lg text-red-700">
                  Personal Inormation
                </p>
                <p className="text-xs text-white tracking-wide font-sans ">
                  A guest profile is a record of the guests who stayed at your
                  property and usually consists of important information like:
                  name, email, address, contact details, which we'll discuss
                  later on.
                </p>
                <p className="text-xs  tracking-wide font-sans">
                  Once the owner has completed all the above steps, the hotel
                  will be activated and they can begin accepting stays
                </p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">What is hotel name?</span>
                    </label>
                    <input
                      type="text"
                      name="hotelname"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs px-3 p-2 rounded-md text-gray-900 outline-none"
                    />
                  </div>
                </div>
                <div className="col-span-full sm:col-span-3">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs  px-3 p-2 rounded-md text-gray-900 outline-none"
                    />
                  </div>
                </div>
                <div className="col-span-full sm:col-span-3">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Total Rooms</span>
                    </label>
                    <input
                      type="number"
                      name="totalrooms"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs px-3 p-2 rounded-md text-gray-900 outline-none"
                    />
                  </div>
                </div>
                <div className="col-span-full sm:col-span-3">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Contact</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      name="contact"
                      className="input input-bordered w-full max-w-xs px-3 p-2 rounded-md text-gray-900 outline-none"
                    />
                  </div>
                </div>{" "}
                <div className="col-span-full sm:col-span-3">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Price</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      name="price"
                      className="input input-bordered w-full max-w-xs px-3 p-2 rounded-md text-gray-900 outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-around w-full col-span-full sm:col-span-2 gap-2">
                  <div className="col-span-full sm:col-span-2">
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">City</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        name="city"
                        className="input input-bordered w-full max-w-xs px-3 p-2 rounded-md text-gray-900 outline-none"
                      />
                    </div>
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text"> State / Province</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        name="state"
                        className="input input-bordered w-full max-w-xs  px-3 p-2 rounded-md text-gray-900 outline-none"
                      />
                    </div>
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text"> ZIP / Postal</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        name="zip"
                        className="input input-bordered w-full max-w-xs px-3 p-2 rounded-md text-gray-900 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-900">
              <div className="space-y-2 col-span-full lg:col-span-1">
                <p className="font-extrabold text-lg text-red-700 ">
                  Registration Details
                </p>
                <p className="text-xs  tif (response === 200)racking-wide font-sans">
                  Submit an application with their personal information, hotel
                  information
                </p>
                <p className="text-xs  tracking-wide font-sans">
                  The hotel must pass a hotel inspection to ensure it meets the
                  company's safety standards
                </p>
                <p className="text-xs tracking-wide font-sans">
                  The hotel and owner must continue to meet the company's
                  standards, and the owner must regularly update their
                  information to maintain their eligibility to stay for the
                  service.
                </p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Photo 1</span>
                    </label>
                    <input
                      type="file"
                      placeholder="Type here"
                      onChange={(e) => {
                        setPhoto1(e.target.files[0]);
                      }}
                      name="photo1"
                      className="input input-bordered input-accent w-full max-w-xs"
                    />
                  </div>
                </div>
                <div className="col-span-full sm:col-span-3">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text"> Room Fesility</span>
                    </label>
                    <Multiselect
                      style={{
                        chips: {
                          background: "black",
                        },
                        multiselectContainer: {
                          color: "black",
                        },
                        searchBox: {
                          padding: "8px",
                        },
                        optionContainer: {
                          color: "white",
                        },
                        option: {
                          background: "#2C2C32",
                        },
                        groupHeading: {
                          background: "black",
                        },
                      }}
                      isObject={false}
                      placeholder="select job type"
                      className="  bg-white border rounded-md border-gray-200 text-gray focus:outline-none focus:bg-white focus:border-gray-500"
                      options={[
                        "free-cancelation",
                        "All-day-service",
                        "Wifi",
                        "Restaurant",
                        "Washing-Service",
                        "Car-Park",
                        "Gym",
                        "Swimming-Pool",
                        "Air-conditionar",
                      ]} // Options to display in the dropdown
                      // selectedValues={} // Preselected value to persist in dropdown
                      onSelect={onSelectFesility} // Function will trigger on select event
                      // onRemove={this.onRemove} // Function will trigger on remove event
                      // Property name to display in the dropdown options
                    />
                  </div>
                </div>
                <div className="col-span-full sm:col-span-3">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Photo 2</span>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        setPhoto2(e.target.files[0]);
                      }}
                      placeholder="Type here"
                      name="photo2"
                      className="input input-bordered input-accent w-full max-w-xs"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label className="label">
                    <span className="label-text">Photo 3</span>
                  </label>
                  <div className="flex  items-center space-x-2">
                    <div className="form-control w-full max-w-xs">
                      <input
                        type="file"
                        onChange={(e) => {
                          setPhoto3(e.target.files[0]);
                        }}
                        name="photo3"
                        className="file-input file-input-bordered w-full max-w-xs"
                      />
                    </div>
                    {/* {preview && (
                  <img src={preview} alt="" width="100px" height="100px" />
                )} */}
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="md:mx-96 md:mt-5 flex justify-center w-full ">
              <button
                className="btn btn-active px-20 md:px-auto  place-items-center bg-black text-white transition hover:bg-white p-2 rounded-full hover:text-black "
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default OwnerAddHotelPage;

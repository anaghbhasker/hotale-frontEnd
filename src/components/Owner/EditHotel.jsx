import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import Swal from "sweetalert2";
import Hotel from "../../Assets/hotel.png";
import Compensation from "../../Assets/compensation.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deletehotel,
  editHotel,
  getBookings,
  getEdithotel,
} from "../../config/Service/OwnerRequest";
import BookingDetails from "./BookingDetails";

function EditHotel() {
  const location = useLocation();
  const hotelId = location.state.id;

  const navigate = useNavigate();

  const [hotel, setHotel] = useState();

  const [selectFesility, setSelectFesility] = useState([]);
  const [removeFesility, setRemoveFesility] = useState([]);
  const [isFesility, setIsFesility] = useState(false);

  const [hotelErr, setHotelErr] = useState(false);
  const [hotelErrerrMessage, setHotelerrMessage] = useState("");

  const [bookingCount,setBookingCount]=useState(0)
  const [totalAmount,setTotalAmount]=useState(0)


  function onSelecthotelFesility(val, setVal) {
    setSelectFesility(val);
  }

  function onRemovehotelFesility(val, setVal) {
    setIsFesility(true);
    setRemoveFesility(val);
  }

  useEffect(() => {
    async function invoke() {
      const responseData = await getEdithotel(hotelId);
      if (responseData.status === "success") {
        setHotel(responseData.hotel);
      } else {
        navigate("/owner/login");
      }
    }
    invoke();
  }, [hotelId, navigate]);


  useEffect(()=>{
    async function invoke(){
      const data=await getBookings(hotelId)
      setBookingCount(data.bookingCount)
      setTotalAmount(data.totalAmount)
    }invoke()
  },[hotelId])

  async function sendJobPost(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let newFesility;

    if (selectFesility.length === 0 && removeFesility.length === 0) {
      newFesility = hotel.fesility;
    } else if (isFesility) {
      newFesility = removeFesility;
    } else {
      newFesility = selectFesility;
    }

    let obj = {
      hotelId: hotelId,
      hotelname: data.get("hotelname"),
      description: data.get("hoteldescription"),
      totalrooms: data.get("totalrooms"),
      contact: data.get("contact"),
      price: data.get("price"),
      city: data.get("city"),
      state: data.get("state"),
      zip: data.get("zip"),
      fesility: newFesility,
    };
    newFesility = null;

    if (
      obj.hotelname &&
      obj.description &&
      obj.totalrooms &&
      obj.contact &&
      obj.price &&
      obj.city &&
      obj.state &&
      obj.zip
    ) {
      setHotelErr(false);
      setHotelerrMessage("");
      let mob = /^([+]\d{2})?\d{10}$/;
      let zip = /^([+]\d{2})?\d{6}$/;
      if (zip.test(obj.zip.toString())) {
        setHotelErr(false);
        setHotelerrMessage("");
        if (mob.test(obj.contact.toString())) {
          setHotelErr(false);
          setHotelerrMessage("");
          const data = await editHotel(obj);
          if (data.status === "success") {
            Swal.fire(
              "Good job!",
              "Success fully updated your hotel",
              "success"
            ).then((result) => {
              navigate("/owner/showHotels");
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="">Why do I have this issue?</a>',
            }).then((result) => {
              navigate("/owner/showHotels");
            });
          }
        } else {
          setHotelErr(true);
          setHotelerrMessage("Please enter your valid contact number");
        }
      } else {
        setHotelErr(true);
        setHotelerrMessage("Your hotel zip address has an invalid zip format");
      }
    } else {
      setHotelErr(true);
      setHotelerrMessage("All fields are required");
    }
  }

  const deleteHotel = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this hotel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await deletehotel(hotelId);
        console.log(data);
        Swal.fire("Deleted!", "Your hotel has been deleted.", "success").then(
          () => {
            navigate("/owner/showHotels");
          }
        );
      }
    });
  };

  return (
    <div>
      <div className="bg-white pb-4 ml-2 mt-2 mr-5 rounded-2xl">
        <div className="flex pt-4 ml-3 mr-3 pb-4">
          <div>
            <h4 className="font-bold text-lg">
              You can change your hotel information{" "}
            </h4>



            {hotel?.isAdminBanned ? (
              <div className="flex">
                <svg
                  className="fill-current h-6 w-6 text-red-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
                <p className="text-red-500 font-bold text-xs italic">
                  Your hotel have been banned for some suspicion..Please contact
                  to admin for more details
                </p>
              </div>
            ) : (
              <p className="text-red-500 font-bold text-xs italic">
                  
                </p>
            )}



          </div>
          <div className="ml-auto mt-1 mr-4">
            <img src={Hotel} alt={"loading"} height={40} width={40} />
          </div>
          <button
            type="button"
            onClick={() => {
              deleteHotel();
            }}
            className="bg-red-500 text-white px-5 font-bold rounded py-2 hover:text-red-600 hover:bg-black"
          >
            Delete hotel
          </button>
        </div>
      </div>

      <div className=" border-2 border-gray-500 pb-4 ml-2 mt-2 mr-5 rounded-2xl">
        <form className="mt-4 mr-3 ml-3 pt-4 " onSubmit={sendJobPost}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Hotel Name
              </label>
              <input
                className="appearance-none block w-full bg-white text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                name="hotelname"
                defaultValue={hotel?.hotelname}
                type="text"
                placeholder="hotel name"
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Room Fesilty(Optional)
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
                placeholder="select fesilities"
                selectedValues={hotel?.fesility}
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
                // Preselected value to persist in dropdown
                onRemove={onRemovehotelFesility}
                onSelect={onSelecthotelFesility} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                // Property name to display in the dropdown options
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Contact Number
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id=""
                defaultValue={hotel?.contact}
                name="contact"
                type="number"
                placeholder="phone number"
              />
              <p className="text-gray-200 text-xs italic">
                where is your job location
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                City
              </label>
              <input
                className="appearance-none block w-full bg-white text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                name="city"
                defaultValue={hotel?.city}
                type="text"
                placeholder="kozhikode"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                State
              </label>
              <div className="relative">
                <select
                  name="state"
                  defaultValue={hotel?.state}
                  className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option value="Andhra Pradesh">{hotel?.state}</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Dadar and Nagar Haveli">
                    Dadar and Nagar Haveli
                  </option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Zip
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="number"
                defaultValue={hotel?.zip}
                name="zip"
                placeholder="90210"
              />
              <p className="text-gray-200 text-xs italic">Pin code</p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Hotel description
              </label>
              <textarea
                name="hoteldescription"
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 min-h-[70px]"
                id="grid-password"
                defaultValue={hotel?.description}
                placeholder="hotel description"
              />
              <p className="text-gray-200 text-xs italic">
                Make it a good description
              </p>
            </div>
          </div>

          <div className="text-black py-4 bg-white font-bold text-lg rounded-md">
            <div className="flex">
              <div>
                <h2 className="ml-3">Include Compensation</h2>
                <p className="ml-6 mt-2 text-lg font-semibold leading-none text-gray-800">Total Booking:{bookingCount}</p>    
                <p className="ml-6 text-2xl leading-none text-gray-600 pt-2 pb-2">Total Amount:{totalAmount}</p>
              </div>
              <div className="ml-auto mr-4">
                <img
                  src={Compensation}
                  height={50}
                  width={50}
                  alt="compensation"
                ></img>
              </div>
            </div>
          </div>

          <div className="text-white py-4  font-semibold text-lg rounded-md"></div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                room amount
              </label>
              <input
                name="price"
                className="appearance-none block w-full bg-white text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                defaultValue={hotel?.price}
                type="number"
                placeholder="price"
              />

              {hotelErr && (
                <p className="text-red-500 text-xs italic">
                  {hotelErrerrMessage}
                </p>
              )}
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Total rooms
              </label>
              <input
                name="totalrooms"
                className="appearance-none block w-full bg-white text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                defaultValue={hotel?.totalrooms}
                type="number"
                placeholder="total rooms"
              />
            </div>
          </div>

          <div className="text-white flex">
            <div className="ml-auto">
              <button
                type="submit"
                className="bg-[#444d48]   text-white px-14 font-bold rounded py-2 hover:text-black hover:bg-white"
              >
                Update now
              </button>
            </div>
          </div>
        </form>
      <BookingDetails/>
      </div>
    </div>
  );
}

export default EditHotel;

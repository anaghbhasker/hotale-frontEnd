import React, { useEffect, useState, Fragment } from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import "./hotelDeatils.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarNew from "../../components/User/NavbarNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleIcon from "@mui/icons-material/Circle";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Maillist from "../../components/User/Maillist/Maillist";
import Footer from "../../components/User/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { coupenApply, hoteView } from "../../config/Service/UserRequest";
import UserMap from "../../components/User/UserMap";
import Fesility from "../../components/User/Fesility";
import { useSelector } from "react-redux";

import { Transition } from "@headlessui/react";
import { useTimeoutFn } from "react-use";
import UsersReviews from "../../components/User/UsersReviews";

function HotelDetailsPage() {
  let [isOpen, setIsOpen] = useState(false);
  let [isShowing, setIsShowing] = useState(false);
  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500);

  const navigate = useNavigate();
  const location = useLocation();
  const hotelId = location.state.hotelId;
  const date = location.state.date;
  const option = location.state.option;
  const peoples = (option.adult + option.children) / 4;
  const { token } = useSelector((state) => state.userLogin);

  const startDate = new Date(date[0].startDate);
  const endDate = new Date(date[0].endDate);
  const diffInMs = Math.abs(startDate - endDate);
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const [hotel, setHotel] = useState();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);

  const [coupencode, SetcoupenCode] = useState("");
  const [codeErr, setCodeErr] = useState(false);
  const [coupenErr, setCoupenErr] = useState("");
  const [newPrice, setNewPrice] = useState(null);

  useEffect(() => {
    async function invoke() {
      const data = await hoteView(hotelId);
      setHotel(data.hotel);
    }
    invoke();
  }, [hotelId]);


  let totalPrice = hotel?.price * diffInDays * option.room;

  const photos = [
    {
      src: hotel?.photo1,
    },
    {
      src: hotel?.photo2,
    },
    {
      src: hotel?.photo3,
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 2 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 2 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleBooking = async () => {
    if (option.room >= peoples) {
      setErr(false);
      if (token) {
        setErr(false);
        if (option.room <= hotel?.totalrooms) {
          setErr(false);
          if (diffInDays !== 0) {
            setErr(false);
            let obj = {
              usertoken: token,
              hotelId: hotelId,
              peoples: option,
              date: date,
              totaldays: diffInDays,
              totalprice: newPrice ? newPrice : totalPrice,
            };
            setIsOpen(true);
            setIsShowing(false);
            resetIsShowing();
            setTimeout(() => {
              setIsOpen(false);
              navigate("/booking",{state:{obj:obj}});
            }, 3500);
          } else {
            toast.error(`Please select your days!!!`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        } else {
          setErr(true);
        }
      } else {
        toast.error(`Please login your account!!!`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      setErr(true);
    }
  };

  const applyCoupen = async () => {
    if (coupencode) {
      setCodeErr(false);
      SetcoupenCode("");
      if (token) {
        setCodeErr(false);
        SetcoupenCode("");
        let obj = {
          userToken: token,
          coupencode: coupencode,
        };
        const data = await coupenApply(obj);
        if (data.status === "success") {
          const discount = (totalPrice * data.discount) / 1000;
          totalPrice = totalPrice - discount;
          setNewPrice(totalPrice);
          setCodeErr(true);
          setCoupenErr(data.message);
        } else {
          setCodeErr(true);
          setCoupenErr(data.message);
        }
      } else {
        setCodeErr(true);
        setCoupenErr("Please login your account...!!");
      }
    } else {
      setCodeErr(true);
      setCoupenErr("Please add your coupen code...!!");
    }
  };

  return (
    <div>
      <ToastContainer />

      {isOpen ? (
        <div className="flex flex-col justify-items-center content-center justify-self-center justify-center h-screen items-center py-16 bg-black">
          <div className=" h-32 w-80">
            <Transition
              as={Fragment}
              show={isShowing}
              enter="transform transition duration-[400ms]"
              enterFrom="opacity-0 rotate-[-120deg] scale-50"
              enterTo="opacity-100 rotate-0 scale-100"
              leave="transform duration-200 transition ease-in-out"
              leaveFrom="opacity-100 rotate-0 scale-100 "
              leaveTo="opacity-0 scale-95 "
            >
              <div className=" w-full rounded-md bg-white h-full shadow-lg">
                <div className="flex justify-center  h-16 items-center">
                  <CircleIcon color="success" />
                  <CircleIcon color="primary" />
                  <CircleIcon color="action" />
                  <CircleIcon color="error" />
                  <CircleIcon color="warning"/>
                  <CircleIcon color="info"/>
                </div>
                <div className="font-thin text-center ">
                  <p>IT'S HAPPENING</p>
                  <p>You'll be ready to pack in just a minute.</p>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={isOpen ? "hidden" : ""}>
        <NavbarNew />
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={photos[slideNumber].src}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button
              onClick={() => {
                handleBooking();
              }}
              className="bookNow"
            >
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{hotel?.hotelname}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{hotel?.location}</span>
            </div>
            {err ? (
              <span className="text-xs font-bold text-red-600 font-style: italic">
                <ReportProblemIcon />
                The number of rooms is not sufficiant for the number of people
                you have enterd!!!
              </span>
            ) : (
              ""
            )}

            <span className="hotelPriceHighlight">
              Book a stay over {hotel?.price}₹ at this property
            </span>
            <div className="hotelImages">
              {photos.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.src}
                    alt=""
                    className="hotelImg h-48"
                  />
                </div>
              ))}
            </div>

            <UserMap />
            <Fesility />

            
            {hotel?.reviews.length===0?(""):(<UsersReviews reviews={hotel?.reviews}/>)}

            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Stay in the heart of City</h1>
                <p className="hotelDesc">{hotel?.description}</p>
              </div>

              <div className="hotelDetailsPrice">
                <h1>Perfect for a {diffInDays}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <p className="text-red-500">Total Rooms:{option.room}</p>
                <h2>
                  <b>{totalPrice}₹</b> ({diffInDays} Days)
                </h2>
                {newPrice ? (
                  <p className="text-black font-bold">
                    New Price:{newPrice}₹  ({diffInDays} Days)
                  </p>
                ) : (
                  ""
                )}
                <button
                  onClick={() => {
                    handleBooking();
                  }}
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="search"
                onChange={(e) => {
                  SetcoupenCode(e.target.value);
                }}
                id="default-search"
                className="block border w-full p-4 pl-10 text-sm  border-gray-300  bg-gray-50  border-gray-00 dark:placeholder-gray-400   "
                placeholder="Enter your coupen code here..."
                required
              />
              <button
                type="submit"
                onClick={() => {
                  applyCoupen();
                }}
                className="text-white absolute right-2.5 bottom-2.5 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-sky-600  "
              >
                Apply
              </button>
            </div>
            {codeErr ? (
              <span className="text-red-600 font-bold italic text-sm">
                <NewReleasesIcon />
                {coupenErr}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <Maillist />
        <Footer />
      </div>
    </div>
  );
}

export default HotelDetailsPage;

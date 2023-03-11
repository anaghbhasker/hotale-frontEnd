import React, { useState, Fragment, useRef, useEffect } from "react";
import UserPic from "../../Assets/userP.png";
import Swal from "sweetalert2";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editProfile, fullDetails } from "../../config/Service/OwnerRequest";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();
  const [owner, setOwner] = useState();
  let [isOpen, setIsOpen] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const coverPickerRef = useRef(null);
  const profilePickerRef = useRef(null);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    async function invoke() {
      const data = await fullDetails();
      setOwner(data.owner);
    }
    invoke();
  }, []);

  const addCoverPhoto = (e) => {
    try {
      let filePath = e.target.files[0].name;
      // Allowing file type
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;
      if (!allowedExtensions.exec(filePath)) {
        toast.error(`OOPS! invalid file type`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return false;
      }
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent) => {
        setCoverImage(readerEvent.target.result);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const addProfilePhoto = (e) => {
    try {
      let filePath = e.target.files[0].name;
      // Allowing file type
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;
      if (!allowedExtensions.exec(filePath)) {
        toast.error(`OOPS! invalid file type`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return false;
      }
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent) => {
        setProfileImage(readerEvent.target.result);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let profilephoto;
    let coverphoto;
    if (profileImage && coverImage) {
      profilephoto = profileImage;
      coverphoto = coverImage;
    } else {
      profilephoto = owner.profilephoto;
      coverphoto = owner.coverphoto;
    }

    let obj = {
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      email: data.get("email"),
      phone: data.get("phone"),
      city: data.get("city"),
      state: data.get("state"),
      zip: data.get("zip"),
      profilephoto:profilephoto,
      coverphoto:coverphoto
    };
    profilephoto = null;
    coverphoto = null;
    if (
      obj.firstname &&
      obj.lastname &&
      obj.email &&
      obj.phone &&
      obj.city &&
      obj.state &&
      obj.zip
    ) {
      setError(false);
      setErrMessage("");
      let regName = /^[a-zA-Z]+$/;
      let regEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let mob = /^([+]\d{2})?\d{10}$/;
      let zip = /^([+]\d{2})?\d{6}$/;
      if (regName.test(obj.firstname.toString())) {
        setError(false);
        setErrMessage("");
        if (regName.test(obj.lastname.toString())) {
          setError(false);
          setErrMessage("");
          if (regEmail.test(obj.email.toString())) {
            setError(false);
            setErrMessage("");
            if (mob.test(obj.phone.toString())) {
              setError(false);
              setErrMessage("");
              if (zip.test(obj.zip.toString())) {
                setError(false);
                setErrMessage("");
                const data = await editProfile(obj);
                console.log(data);
                if (data.status === "success") {
                  Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your updation has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                  }).then((result)=>{
                    setIsOpen(false);
                    navigate("/owner/");
                  })
                }
              } else {
                setError(true);
                setErrMessage("Invalid zip code");
              }
            } else {
              setError(true);
              setErrMessage("Enter valid phone number");
            }
          } else {
            setError(true);
            setErrMessage("Please enter valid email address");
          }
        } else {
          setError(true);
          setErrMessage("Invalid Lastname!!");
        }
      } else {
        setError(true);
        setErrMessage("Invalid Firstname!!");
      }
    } else {
      setError(true);
      setErrMessage("All field are required!!");
    }
  };

  return (
    <>
      <div className="h-64">
        <ToastContainer />

        <div className="relative bg-gray-800 w-full h-44  ">
          <img
            src={`${
              owner?.coverphoto
                ? owner.coverphoto
                : "https://webtoolfeed.files.wordpress.com/2012/10/glasses-cat1.jpg"
            }`}
            alt="kitty"
            className="rounded-sm h-44 w-full object-cover mr-2"
          />
          <div className="absolute   -bottom-10 left-6 w-28 rounded-2xl bg-white h-28 ">
            <img
              src={`${owner?.profilephoto ? owner.profilephoto : UserPic}`}
              alt="kitty"
              className="rounded-2xl h-full w-full object-cover mr-2"
            />
          </div>
          <div className="h-px mt-10 flex justify-between">
            <div className="w-44 ">
              <p className="text-white font-semibold text-center">
                {owner?.firstname} {owner?.lastname}
              </p>
              <p className="text-gray-500  text-center">Hotel Owner</p>
            </div>
            <div className="ml-auto mr-3">
              <button
                className="border border-white rounded px-4 py-1 text-white font-semibold"
                onClick={openModal}
              >
                Edit profile
              </button>
            </div>
          </div>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-100" onClose={closeModal}>
            <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 overflow-scroll">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed scroll-m-2 inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="inline-block align-bottom bg-black rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                      <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                        <div
                          className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                          onClick={() => setIsOpen(false)}
                        >
                          <XMarkIcon className="h-[22px] text-white" />
                        </div>
                        <div className="text-white">User edit</div>
                      </div>
                      <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                        <div className="w-full">
                          <div className="text-[#6e767d] flex gap-x-3 relative">
                            <div className="relative bg-gray-800 w-full h-44  ">
                              <PencilIcon
                                className="right-2 cursor-pointer h-6 w-6 absolute text-gray-900 hover:text-blue-700 -rotate-140"
                                onClick={() => coverPickerRef.current.click()}
                              />
                              <input
                                type="file"
                                onChange={addCoverPhoto}
                                ref={coverPickerRef}
                                accept="image/*"
                                hidden
                              />
                              <img
                                src={`${
                                  coverImage
                                    ? coverImage
                                    : "https://webtoolfeed.files.wordpress.com/2012/10/glasses-cat1.jpg"
                                }`}
                                alt="kitty"
                                className="rounded-sm h-44 w-full object-cover mr-2"
                              />

                              <div className="absolute   -bottom-10 left-6 w-28 rounded-2xl bg-white h-28 ">
                                <PencilIcon
                                  className="right-2 bottom-2 cursor-pointer h-6 w-6 absolute text-gray-900 hover:text-blue-700 -rotate-140"
                                  onClick={() =>
                                    profilePickerRef.current.click()
                                  }
                                />
                                <img
                                  src={`${
                                    profileImage ? profileImage : UserPic
                                  }`}
                                  alt="kitty"
                                  className="rounded-2xl h-full w-full object-cover mr-2"
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  hidden
                                  onChange={addProfilePhoto}
                                  ref={profilePickerRef}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-7 flex space-x-3 w-full">
                            <div className="flex-grow mt-5">
                              <form onSubmit={updatePost}>
                                <div className="mb-4">
                                  <label className="block text-gray-300 text-sm font-bold mb-2">
                                    Firstname
                                  </label>
                                  <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastname"
                                    type="text"
                                    name="firstname"
                                    defaultValue={owner?.firstname}
                                    placeholder="firstname"
                                  />
                                </div>
                                <div className="mb-6">
                                  <label className="block text-gray-300 text-sm font-bold mb-2">
                                    Lastname
                                  </label>
                                  <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastname"
                                    name="lastname"
                                    defaultValue={owner?.lastname}
                                    type="text"
                                    placeholder="lastname"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label className="block text-gray-300 text-sm font-bold mb-2">
                                    Email
                                  </label>
                                  <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="text"
                                    placeholder="jhon@gmail.com"
                                    name="email"
                                    defaultValue={owner?.email}
                                  />
                                </div>
                                <div className="mb-4">
                                  <label className="block text-gray-300 text-sm font-bold mb-2">
                                    Phone
                                  </label>
                                  <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="phone"
                                    type="number"
                                    name="phone"
                                    defaultValue={owner?.phone}
                                  />
                                </div>

                                <div className="mb-4">
                                  <label className="block text-gray-300 text-sm font-bold mb-2">
                                    city
                                  </label>
                                  <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white  bg-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="city"
                                    type="text"
                                    name="city"
                                    defaultValue={owner?.city}
                                  />
                                </div>

                                <div className="mb-4">
                                  <label className="block text-gray-300 text-sm font-bold mb-2">
                                    state
                                  </label>
                                  <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    name="state"
                                    placeholder="Username"
                                  >
                                    <option value="kerala">
                                      {owner?.state}
                                    </option>
                                    <option value="kerala">kerala</option>
                                    <option value="karnataka">karnataka</option>
                                    <option value="Thamilnadu">
                                      Thamilnadu
                                    </option>
                                  </select>
                                </div>

                                <div className="mb-4">
                                  <label className="block text-gray-300 text-sm font-bold mb-2">
                                    zip
                                  </label>
                                  <input
                                    className="shadow appearance-none border text-white rounded w-full py-2 px-3  bg-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="zip"
                                    type="number"
                                    name="zip"
                                    placeholder="zip"
                                    defaultValue={owner?.zip}
                                  />
                                </div>

                                <div className="flex items-center justify-between pt-2.5">
                                  <button
                                    className="bg-white ml-auto text-black rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                    type="submit"
                                  >
                                    Update
                                  </button>
                                </div>
                              </form>

                              {error ? (
                                <p className="text-red-500 text-xs italic">
                                  {errMessage}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}

export default MyProfile;

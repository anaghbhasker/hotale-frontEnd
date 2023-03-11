import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NavbarNew from "../../components/User/NavbarNew";
import { editUserprofile, getUser } from "../../config/Service/UserRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from 'sweetalert';

function UserProfilePage() {
  const { token } = useSelector((state) => state.userLogin);
  const [user, setUser] = useState();
  const coverPickerRef = useRef(null);
  const profilePickerRef = useRef(null);
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [err, setErr] = useState("");
  const [isrender,SetisRender]=useState(false)

  useEffect(() => {
    async function invoke() {
      const data = await getUser(token);
      setUser(data.user);
      setProfileImage(data.user.profilephoto)
      setCoverImage(data.user.coverphoto)
    }
    invoke();
  }, [token,isrender]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj = {
        userToken:token,
        username: data.get("username"),
        city: data.get("city"),
        state: data.get("state"),
        country: data.get("country"),
        profilephoto: profileImage ,
        coverphoto: coverImage ,
    };
    if(obj.username){
        let regName = /^[a-zA-Z]+$/;
        setErr("")
        if(regName.test(obj.username.toString())){
            setErr("")
            const data =await editUserprofile(obj)
            if(data.status==="success"){
                swal("Good job!", "Profile Updated!", "success");
                SetisRender(!isrender)
            }else{
                toast.error(`OOPS! Something error`, {
                    position: "top-right",
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
            setErr("OOPS!!..invalid username")
        }
    }else{
        setErr("Please Enter your username..")
    }
  };
  return (
    <>
      <NavbarNew />
      <form id="login" onSubmit={handleSubmit}>
        <ToastContainer />
        <div className="bg-white dark:bg-gray-800 overflow-hidden lg:px-16 lg:ml-64 mt-6">
          <div className="mx-auto bg-white dark:bg-gray-800 rounded">
            <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800">
              <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">
                  Profile
                </p>
                <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={16}
                    height={16}
                  >
                    <path
                      className="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mx-auto">
              <div className="xl:w-9/12 w-11/12 mx-auto xl:mx-0">
                <div className="rounded relative mt-8 h-48">
                  <img
                    src={coverImage ? coverImage: "https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg"}
                    alt="..."
                    className="w-full h-full object-cover rounded absolute shadow"
                  />
                  <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" />
                  <div className="flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer">
                    <p className="text-xs text-gray-100">Change Cover Photo</p>
                    <div className="ml-2 text-gray-100">
                      <svg
                        onClick={() => coverPickerRef.current.click()}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-edit"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1={16} y1={5} x2={19} y2={8} />
                      </svg>
                      <input
                        type="file"
                        onChange={addCoverPhoto}
                        ref={coverPickerRef}
                        accept="image/*"
                        hidden
                      />
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                    <img
                      src={
                        profileImage? profileImage: "https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg"
                      }
                      alt="..."
                      className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                    />
                    <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0" />
                    <div className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100">
                      <svg
                        onClick={() => profilePickerRef.current.click()}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-edit"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1={16} y1={5} x2={19} y2={8} />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={addProfilePhoto}
                        ref={profilePickerRef}
                      />
                      <p className="text-xs text-gray-100">Edit Picture</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
            <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
              <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">
                  Personal Information
                </p>
                <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={16}
                    height={16}
                  >
                    <path
                      className="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mx-auto pt-4">
              <div className="mx-auto">
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label
                    htmlFor="LastName"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    User name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.username}
                    id="LastName"
                    name="username"
                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                    placeholder
                  />

                  {err ? (
                    <div className="flex justify-between items-center pt-1 text-red-600">
                      <p className="text-xs">{err}</p>
                      <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={16}
                    height={16}
                  >
                    <path
                      className="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      fill="currentColor"
                    />
                  </svg>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label
                    htmlFor="Email"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Email
                  </label>
                  <div className="border border-green-400 shadow-sm rounded flex">
                    <div className="px-4 py-3 dark:text-gray-100 flex items-center border-r border-green-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-mail"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x={3} y={5} width={18} height={14} rx={2} />
                        <polyline points="3 7 12 13 21 7" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="Email"
                      defaultValue={user?.email}
                      name="email"
                      className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400"
                      readOnly
                    />
                  </div>
                  <div className="flex justify-between items-center pt-1 text-green-400">
                    <p className="text-xs">Email submission already success!</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={16}
                      height={16}
                    >
                      <path
                        className="heroicon-ui"
                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0
                                            0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                        stroke="currentColor"
                        strokeWidth="0.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label
                    htmlFor="City"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    City
                  </label>
                  <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex">
                    <input
                      type="text"
                      id="City"
                      defaultValue={user?.city}
                      name="city"
                      className="pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-indigo-700 bg-transparent rounded placeholder-gray-500 text-gray-500 dark:text-gray-400"
                      placeholder="Los Angeles"
                    />
                    <div className="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500 dark:text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-up"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 15 12 9 18 15" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label
                    htmlFor="State/Province"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="State/Province"
                    defaultValue={user?.state}
                    name="state"
                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                    placeholder="California"
                  />
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label
                    htmlFor="Country"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="Country"
                    name="country"
                    defaultValue={user?.country}
                    className="border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-11/12 xl:w-full">
            <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-start">
              <button
                className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default UserProfilePage;

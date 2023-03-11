import React, { useState, Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { Dialog, Transition } from "@headlessui/react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import moment from "moment/moment";
import swal from "sweetalert";

import {
  UserIcon,
  HomeModernIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import {
  Email,
  DashboardCustomize,
  SettingsAccessibility,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import AdminSidebarlinks from "./AdminSidebarlinks";
import { addCoupen } from "../../config/Service/AdminRequest";

function AdminSidebar() {
  const today=moment().format("YYYY-MM-DD")
  let [isOpen, setIsOpen] = useState(false);
  const[error,setError]=useState(false)
  const[errMessage,setErrMessage]=useState("")
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const coupenAdd=async (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj = {
        coupencode: data.get("coupencode"),
        discount: data.get("discount"),
        enddate: data.get("enddate"),
      };
    if(obj.coupencode&&obj.discount&&obj.enddate){
        setError(false)
        setErrMessage("")
        if(obj.discount<100){
            setError(false)
            setErrMessage("")
            if(obj.enddate>today){
                setError(false)
                setErrMessage("")
                const data= await addCoupen(obj)
                if(data.status==="success"){
                    swal("Coupen added!", "You clicked the button!", "success").then(()=>{closeModal()})
                }else{
                    setError(true)
                    setErrMessage("Coupen Already exsist!!")
                }
            }else{
                setError(true)
                setErrMessage("Please enter correct enddate!!")
            }
        }else{
            setError(true)
            setErrMessage("Please enter discount between 1 to 100!!")
        }
    }else{
        setError(true)
        setErrMessage("All fields are required!!")
    }
  }

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex item-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        {/* <Image  src={'/images/log_transparent.png'} alt='fds' width={300} height={300}></Image> */}
        <h4 className="text-white text-lg ml-2 xl:ml-8 font-bold p-2 ">
          Hotale
        </h4>
      </div>
      <button
        onClick={openModal}
        className="hidden xl:inline ml-auto bg-white text-[#000] rounded-md w-52 h-[38px] text-lg font-bold shadow-md hover:bg-[#2f2e2e] hover:text-white "
      >
        Add Coupen
      </button>

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
                  <div className="inline-block align-bottom bg-gray-500 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                    <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                      <div
                        className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                        onClick={() => setIsOpen(false)}
                      >
                        <XMarkIcon className="h-[22px] text-white" />
                      </div>
                      <div className="text-white">User edit</div>
                    </div>
                    <div className="flex px-4 pb-2.5 sm:px-6">
                      <div className="w-full">
                        <div className="mt-7 flex space-x-3 w-full">
                          <div className="flex-grow mt-5">
                            <form onSubmit={coupenAdd}>
                              <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-bold mb-2">
                                  Coupen code
                                </label>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                  id="coupencode"
                                  type="text"
                                  name="coupencode"
                                  placeholder="coupencode"
                                />
                              </div>
                              <div className="mb-6">
                                <label className="block text-gray-300 text-sm font-bold mb-2">
                                  Discount in percentage
                                </label>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                  id="discount"
                                  name="discount"
                                  type="number"
                                  placeholder="discount"
                                />
                              </div>
                              <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-bold mb-2">
                                  End Date
                                </label>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                  id="enddate"
                                  type="date"
                                  placeholder="enddate"
                                  name="enddate"
                                />
                              </div>
                              
                              
                            
                              <div className="flex items-center justify-between pt-2.5">
                                <button
                                  className="bg-white ml-auto text-black rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                  type="submit"
                                >
                                  Add
                                </button>
                              </div>
                            </form>

                            {error ? (
                                
                                <p className="text-red-600 text-sm font-bold italic">
                                    <ReportProblemIcon />
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

      <div className="space-y-10 mt-4 mb-2.5 xl:ml-24">
        <div>
          <Link to={"/admin/"}>
            <AdminSidebarlinks
              text="Dashboard"
              Icon={DashboardCustomize}
              active={false}
            />
          </Link>
        </div>
        <div>
          <Link to={"/admin/showUsers"}>
            <AdminSidebarlinks text="Users" Icon={UserIcon} active={false} />
          </Link>
        </div>
        <div>
          <Link to={"/admin/showOwners"}>
            <AdminSidebarlinks
              text="Owners"
              Icon={SettingsAccessibility}
              active={false}
            />
          </Link>
        </div>
        <div>
          <Link to={"/admin/showHotel"}>
            <AdminSidebarlinks
              text="Hotels"
              Icon={HomeModernIcon}
              active={false}
            />
          </Link>
        </div>
        <div>
          <Link to={"/admin/bookings"}>
            <AdminSidebarlinks
              text="Bookings"
              Icon={ClipboardDocumentCheckIcon}
              active={false}
            />
          </Link>
        </div>
        <div>
          <Link to={"/admin/notification"}>
            <AdminSidebarlinks
              text="Notification"
              Icon={NotificationImportantIcon}
              active={false}
            />
          </Link>
        </div>
        <div>
          <Link to={"/admin/showMessages"}>
            <AdminSidebarlinks text="Message" Icon={Email} active={false} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;

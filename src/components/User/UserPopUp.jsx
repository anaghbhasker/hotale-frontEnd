import React, { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserPopUp() {
  let [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
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
                      <div className="text-white">Ownership</div>
                    </div>
                    <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                      <div className="w-full">
                        <div className="text-[#6e767d] flex gap-x-3 relative">



                        <div className="flex flex-col items-center px-4 md:px-12">
                            <img alt="..." src="https://i.ibb.co/QDMrqK5/Saly-10.png" />
                            <p className="text-base sm:text-lg md:text-2xl font-bold md:leading-6 mt-6 text-gray-800 text-center dark:text-gray-100">Don’t miss any Update</p>
                            <p className="text-xs sm:text-sm leading-5 mt-2 sm:mt-4 text-center text-gray-600 dark:text-gray-300">By continuing, you agree to let hotale.com email you regarding your property registration.Registration is free and can take as little as 15 minutes to complete.</p>
                            <div className="flex items-center mt-4 sm:mt-6 w-full">
                                <div className="bg-gray-50 border rounded border-gray-200 dark:border-gray-700 dark:bg-gray-700 w-full">
                                    <button onClick={()=>{navigate('/owner/login')}} className="w-full focus:outline-none pl-4 py-3 text-base leading-none text-gray-600 dark:text-gray-100 bg-transparent placeholder-gray-600 font-bold dark:placeholder-gray-100">Sign in / Register</button>
                                </div>
                                
                            </div>
                        </div>




                        </div>

                        <div className="mt-7 flex space-x-3 w-full">
                          <div className="flex-grow mt-5"></div>
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
  );
}

export default UserPopUp;

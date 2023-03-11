import React, { Fragment, useEffect, useState } from "react";
import Image from "../../Assets/Screenshot 2023-01-29 010123.png";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../config/Service/UserRequest";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../Store/Slice/Userauth";

function NavbarNew() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.userLogin);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    async function invoke() {
      const data = await getUser(token);
      setUser(data.user);
    }
    invoke();
  }, [token]);

  const handleLogout = () => {
    dispatch(
      setLogout({
        user: null,
        name: null,
        token: null,
      })
    );

    navigate("/login");
  };

  return (
    <>
      <div className=" w-full h-28 shadow-lg bg-slate-50 ">
        <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
          <img src={Image} alt="/" width="150" height="80" />

          <div className="text-black">
            {user ? (
              <ul className="">
              </ul>
            ) : (
              <button
                type="button"
                onClick={()=>{
                  navigate('/login')
                }}
                className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
              >
                Login/Signup
              </button>
              
            )}
          </div>

          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                  Menu
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={"/userprofile"}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Account settings
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={"/mybookings"}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Bookings
                        </Link>
                      )}
                    </Menu.Item>
                    <form method="POST" action="#">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              handleLogout();
                            }}
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </form>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default NavbarNew;

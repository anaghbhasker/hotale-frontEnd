import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import clogo from "../../../Assets/Screenshot 2023-01-29 010123.png";
import Axiosinstance from "../../../config/Axiosinstance";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg,setErrmsg]=useState('')
  

  const signupForm = (e) => {
    e.preventDefault();
      let obj = {
        username: username,
        email: email,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword,
      };
    if (
      obj.username &&
      obj.email &&
      obj.phone &&
      obj.password &&
      obj.confirmPassword
    ) {
      let regName = /^[a-zA-Z]+$/;
      let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let mob = /^([+]\d{2})?\d{10}$/;
      if(regName.test(obj.username.toString())){
        if(regEmail.test(obj.email.toString())){
          if(mob.test(obj.phone.toString())){
            if(obj.password === obj.confirmPassword){
              Axiosinstance.post("/user_signUp",obj).then((response)=>{
                const data=response.data
                if (data.status==='success') {
                  toast.success('Verify Link already sent your email..Please Verify', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                } else {
                  setErrmsg(response.data.message)
                }
              })
            }else{
              toast.error(`Password and confirm password not same`, {
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
          }else{
            toast.error(`Enter valid phone number`, {
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
        }else{
          toast.error(`Enter your valid email`, {
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
      }else{
        toast.error(`Enter your valid Username`, {
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
      toast.error(`OOPS! All fields are required`, {
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
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex min-h-screen bg-white ">
        <div className="flex flex-row w-full ">
          <div className="flex flex-1 flex-col items-center justify-center px-10 relative ">
            <div className="flex flex-1 flex-col pt-24 space-y-5 max-w-md  w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <div className=" flex justify-center">
                  <img src={clogo} className="max-w-sm h-auto" alt="..." />
                </div>
                {errMsg&&<p className=" text-red-600 font-semibold text-sm break-words mx-5"> {errMsg}</p>}
                
              </div>
              <form onSubmit={signupForm}>
                <div class="flex flex-col max-w-md space-y-5 bg-white">
                  <input
                    placeholder="Username"
                    type={"text"}
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black bg-white rounded-lg text-black font-medium placeholder:font-normal"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <input
                    placeholder="Email"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black bg-white rounded-lg text-black font-medium placeholder:font-normal"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <input
                    placeholder="Phone"
                    type={"number"}
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black bg-white rounded-lg text-black font-medium placeholder:font-normal"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                  <input
                    placeholder="Password"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black bg-white rounded-lg text-black font-medium placeholder:font-normal"
                    type={"password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <input
                    placeholder="Confirm Password"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black bg-white rounded-lg text-black font-medium placeholder:font-normal"
                    type={"password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
                  >
                    Signup
                  </button>
                </div>
              </form>
              <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                Have already an account?
                <Link
                  to={"/login"}
                  className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

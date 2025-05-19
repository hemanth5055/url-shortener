import React, { useEffect, useState } from "react";
import { IoReloadOutline } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Hey Hi !");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });
  const handleLogin = async () => {
    if (email.length > 0 && name.length > 0 && password.length > 0) {
      setLoading(true);
      const data = { name, email, password };
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER}/users/signup`,
        {
          ...data,
        }
      );
      const code = result.data.code;
      if (code == 1) {
        //show popup
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage("Account Already Exists !");
      }
      setLoading(false);
    } else {
      setMessage("Enter valid details");
    }
  };

  return (
    <div className="w-full min-h-screen p-10 flex max-sm:items-center flex-col max-sm:p-2 max-sm:pt-10">
      <div className="popup absolute bg-red-500  px-4 py-2 rounded right-[30px]">
        <h1 className="text-white font-mont">{message}</h1>
      </div>
      <h1 className="pl-2 font-garam font-medium text-5xl mb-[30px] max-sm:mt-[100px]">
        Sign Up
      </h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-[35%] h-[50px] max-sm:w-[90%]  mb-[10px] max-sm:text-[15px] bg-gray-200 rounded-[20px] font-mont text-[20px] outline-none px-4 font-medium text-black placeholder:text-gray-800"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        className="w-[35%] h-[50px] max-sm:w-[90%] max-sm:text-[15px]  mb-[10px]  bg-gray-200 rounded-[20px] font-mont text-[20px] outline-none px-4 font-medium text-black placeholder:text-gray-800"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-[35%] h-[50px] max-sm:w-[90%] max-sm:text-[15px]  bg-gray-200 rounded-[20px] font-mont text-[20px] mb-[20px] outline-none px-4 font-medium text-black placeholder:text-gray-800"
      />
      <div className="w-full p-2 my-2 flex max-sm:justify-center">
        <h2 className="font-mont">
          Already have an account ,{" "}
          <a href="login" className="font-medium text-blue-600">
            login
          </a>
        </h2>
      </div>
      <div className="w-full flex gap-[20px] max-sm:pl-5">
        <div
          className="h-[45px] w-[45px] rounded-full bg-black flex justify-center items-center cursor-pointer"
          onClick={handleLogin}
        >
          <FiLogIn className="text-white" size={20} />
        </div>
        {loading ? (
          <div className="h-[45px] w-[45px] rounded-full  flex justify-center items-center cursor-pointer loading animate-spin">
            <IoReloadOutline className="text-blue-900 font-medium" size={25} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

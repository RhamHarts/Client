"use client";
import React, { useState } from "react";

const LoginModal: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    typeof window !== "undefined" &&
      sessionStorage.getItem("isLoggedIn") === "true"
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = () => {
    // Lakukan autentikasi
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      sessionStorage.setItem("isLoggedIn", "true"); // Menyimpan status login di sessionStorage
      sessionStorage.setItem("username", username); // Menyimpan username di sessionStorage
      console.log("Login successful!");
    } else {
      console.log("Invalid username or password");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex relative">
      {!isLoggedIn && (
        <button
          className="cursor-pointer border-0 bg-transparent w-32 rounded-lg bg-gradient-to-br from-green-500 to-purple-500 flex flex-col justify-center text-white text-center h-12 items-center relative transition-transform duration-200"
          onClick={openModal}
        >
          <a className="text-xs font-semibold uppercase font-poppins text-white text-left">
            Login
          </a>
        </button>
      )}
      {!isLoggedIn && (
        <button className="cursor-pointer border-0 p-0 bg-transparent w-32 rounded-lg bg-gradient-to-br from-green-500 to-purple-500 flex flex-col justify-center text-white text-center h-12 items-center relative transition-transform duration-200 ml-4">
          <a
            href="/register"
            className="text-xs font-semibold uppercase font-poppins text-white text-left no-underline bg-transparent h-full w-full flex items-center justify-center"
          >
            Register
          </a>
        </button>
      )}
      {isModalOpen && (
        <div
          className="w-1/5 h-3/5 flex justify-start p-14 bg-cover bg-no-repeat bg-top text-white text-4xl font-rajdhani fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          style={{
            backgroundImage: "url(/Icons/login-container@3x.png)",
          }}
        >
          {/* Konten di sini */}
          <div className="h-96 w-96 flex items-center justify-center">
            {/* Icon close modal */}
            <img
              src="/Icons/cross.png" // Path relatif dari folder public
              alt="Close"
              className="relative  h-8 left-[410px] bottom-56 text-aliceblue cursor-pointer"
              onClick={closeModal}
            />
            {/* End of Icon close modal */}
            <h3 className="relative font-semibold mx-auto bottom-52 left-36">
              Login
            </h3>
            <div className="flex relative right-[50px]">
              <p className="relative top-44 text-center font-bold text-base no-underline whitespace-nowrap">
                Not have account yet?{" "}
                <a
                  href="/register"
                  className="text-center text-green-500  font-bold text-base no-underline whitespace-nowrap"
                >
                  Register
                </a>{" "}
                now
              </p>
              <button
                className="relative top-60 right-52 rounded-lg bg-gradient-to-br from-green-500 to-green-700 h-22 box-border px-10 pb-2 pt-2 text-2xl font-poppins  w-full cursor-pointer"
                onClick={handleLoginClick}
              >
                <b className="text-center font-bold text-lg no-underline">
                  Login
                </b>
              </button>
            </div>
          </div>
          <div className="absolute right-7 top-40 h-128 overflow-hidden flex-shrink-0 gap-6 flex flex-col items-center w-398 justify-start">
            <input
              className="px-2 py-6 text-gray-300 text-xs bg-transparent rounded-xl box-border h-[52px] flex flex-row items-center w-[364px] justify-start border-2 border-solid border-white outline-none font-poppins"
              placeholder="Username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />

            <input
              className="px-2 py-6 text-gray-300 text-xs bg-transparent rounded-xl box-border h-[52px] flex flex-row items-center w-[364px] justify-start border-2 border-solid border-white outline-none font-poppins"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;

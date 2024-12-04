import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import Cookies from "js-cookie";
import axios from "axios";

const LoginModal: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    typeof window !== "undefined" &&
      sessionStorage.getItem("isLoggedIn") === "true"
  );

  const router = useRouter(); // Initialize useRouter

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginClick = async () => {
    try {
      const response = await axios.post(
        "https://api.artwishcreation.com/api/auth/login",
        {
          email: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      const data = response.data;
      if (data.accessToken) {
        // Store tokens in cookies
        Cookies.set("ref", data.accessToken, { expires: 7, path: "/" });
        Cookies.set("refreshToken", data.refreshToken, {
          expires: 30,
          path: "/",
        });

        // Optionally set Authorization header for immediate subsequent requests
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;

        setSuccess("Login successful!");
        setError("");
        window.location.reload();
      } else {
        throw new Error("Token is not provided by the API.");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex relative z-50">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex flex-col items-center bg-white p-12 rounded-lg shadow-lg z-50">
            <button
              className="absolute top-2 right-2 cursor-pointer"
              onClick={closeModal}
            >
              <img src="/Icons/cross.png" alt="Close" className="w-6 h-6" />
            </button>
            <img
              className="w-[500px] h-auto"
              alt=""
              src="https://images.unsplash.com/photo-1519895710315-a04b64f04a36?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTQ4MTg1ODN8&ixlib=rb-4.0.3&q=85"
            />
            <h2 className="mb-8 text-4xl font-semibold">Login</h2>
            <div className="flex flex-col w-[380px] gap-6">
              <input
                className="px-5 py-3 text-gray-700 border rounded-lg outline-none"
                placeholder="Email"
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />

              <input
                className="px-5 py-3 text-gray-700 border rounded-lg outline-none"
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              className="px-6 py-3 mt-8 text-xl font-bold text-white bg-green-500 rounded-lg"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <p className="mt-6">
              Not have account yet?{" "}
              <a href="/register" className="text-green-500 font-bold">
                Register
              </a>{" "}
              now
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import Cookies from "js-cookie";
import axios from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
        router.push("/"); // Redirect to home page
      } else {
        throw new Error("Token is not provided by the API.");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="h-screen bg-fdf9ff overflow-hidden text-left text-xs text-white font-poppins flex justify-center items-center">
      <div className="grid sm:grid-cols-2 relative lg:inset-x-40">
        <img
          className="max-w-full h-[580px] max-sm:hidden"
          alt=""
          src="https://images.unsplash.com/photo-1617406439276-5d9772b08ad4?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTQ4MTg1NjR8&ixlib=rb-4.0.3&q=85"
        />
        <img
          className="object-auto w-[400px] h-[580px]"
          alt=""
          src="https://images.unsplash.com/photo-1519895710315-a04b64f04a36?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTQ4MTg1ODN8&ixlib=rb-4.0.3&q=85"
        />

        <div className="absolute sm:top-[10px] sm:left-1/2 ">
          <h2 className="absolute font-semibold text-5xl mx-auto top-1 left-32">
            Login
          </h2>
          <div className="relative left-3 top-40 gap-6 flex flex-col">
            <input
              className="z-50 px-2 text-gray-300 text-xs bg-transparent rounded-xl box-border h-[52px] w-[370px] border-2 border-solid border-white outline-none font-poppins"
              placeholder="Email"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />

            <input
              className="z-50 px-2 text-gray-300 text-xs bg-transparent rounded-xl box-border h-[52px] w-[370px] border-2 border-solid border-white outline-none font-poppins"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="h-[384px] w-[384px] absolute top-16 left-16 flex items-center justify-center">
            <div className="flex relative">
              <p className="relative top-44 text-center font-bold text-base no-underline whitespace-nowrap">
                Not have account yet?{" "}
                <a
                  href="/register"
                  className="text-center text-green-500 font-bold text-base no-underline whitespace-nowrap"
                >
                  Register
                </a>{" "}
                now
              </p>
              <button
                className="relative top-60 right-52 rounded-13 bg-[#00E59B] w-32 h-12 cursor-pointer"
                onClick={handleLoginClick}
              >
                <b className="text-center font-bold text-lg no-underline">
                  Login
                </b>
              </button>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default Login;

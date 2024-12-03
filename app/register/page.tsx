"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CountryIcons from "../components/CountryDropdown";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("VN");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegisterClick = async () => {
    try {
      const response = await fetch(
        "https://api.artwishcreation.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            country, // Used directly here
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed, please try again.");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      setSuccess("Registration successful!");
      setError("");

      // Redirect to the verification/register page after successful registration
      router.push("/verification/register");
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
      setSuccess("");
      console.error("Error:", error);
    }
  };
  return (
    <div className="h-screen bg-fdf9ff overflow-hidden text-left text-xs text-white font-poppins flex justify-center items-center">
      <div className="grid sm:grid-cols-2 relative lg:inset-x-40">
        <img
          className="max-w-full h-[700px] max-sm:hidden"
          alt=""
          src="https://images.unsplash.com/photo-1617406439276-5d9772b08ad4?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTQ4MTg1NjR8&ixlib=rb-4.0.3&q=85"
        />
        <img
          className="object-auto w-[400px] h-[700px]"
          alt=""
          src="https://images.unsplash.com/photo-1519895710315-a04b64f04a36?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTQ4MTg1ODN8&ixlib=rb-4.0.3&q=85"
        />

        <div className="absolute sm:top-[10px] sm:left-1/2">
          <h2 className="absolute font-semibold text-5xl mx-auto top-1 left-32">
            Register
          </h2>
          <div className="relative left-3 top-40 gap-6 flex flex-col">
            <input
              className="z-50 px-2 text-gray-300 text-xs bg-transparent rounded-xl box-border h-[52px] w-[370px] border-2 border-solid border-white outline-none font-poppins"
              placeholder="Email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              className="z-50 px-2 text-gray-300 text-xs bg-transparent rounded-xl box-border h-[52px] w-[370px] border-2 border-solid border-white outline-none font-poppins"
              placeholder="Username"
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
            <CountryIcons setCountry={setCountry} />
          </div>
          <div className="relative mt-28 ml-10 flex items-center justify-center">
            <div className="flex relative">
              <p className="relative top-44 text-center font-bold text-base no-underline whitespace-nowrap">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-center text-green-500 font-bold text-base no-underline whitespace-nowrap"
                >
                  Login
                </a>{" "}
                now
              </p>
              <button
                className="relative top-60 right-52 rounded-13 bg-[#00E59B] w-32 h-12 cursor-pointer"
                onClick={handleRegisterClick}
              >
                <b className="text-center font-bold text-lg no-underline">
                  Register
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

export default Register;

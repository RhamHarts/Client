"use client";
import React from "react";

const SendVerificationRegister: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: "url('/wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col md:flex-row p-8 bg-white rounded-lg shadow-lg max-w-4xl m-4">
        <div className="flex-1">
          <img
            className="object-cover w-full h-full"
            alt="Email Verified"
            src="/Icons/email.gif"
          />
        </div>
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-[#0dff99] mb-4">
            Register Email Verification
          </h1>
          <p className="text-lg text-gray-600">
            We have sent you an email to verify your updated email address.
            Please check your email and click the verification link to verify
            the email.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => window.open("https://mail.google.com", "_blank")}
              className="bg-[#0dff99] text-xl text-white px-10 py-5 rounded-md shadow hover:bg-green-500 transition duration-300 ease-in-out cursor-pointer"
            >
              Check Your Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendVerificationRegister;

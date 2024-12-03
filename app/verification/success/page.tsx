"use client";
import React from "react";
import { useRouter } from "next/navigation";

const VerificationSuccess: React.FC = () => {
  const router = useRouter();

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
            src="/Icons/email2.gif"
          />
        </div>
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-[#0dff99] mb-4">
            Email Verification Success
          </h1>
          <p className="text-lg text-gray-600">
            Your email has been successfully verified! Welcome aboard. You now
            have full access to all of our features. Thank you for verifying
            your email.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => router.push("/")}
              className="bg-[#0dff99] text-xl text-white px-10 py-5 rounded-md shadow hover:bg-green-500 transition duration-300 ease-in-out cursor-pointer"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;

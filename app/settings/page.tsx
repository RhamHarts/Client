"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import styles from "./setting.module.css";
import ProfileButton from "../components/ProfileButtonModal";

import Terms from "../components/settings/terms";
import Privacy from "../components/settings/privacy";
import Help from "../components/settings/help";
import About from "../components/settings/about";
import Contact from "../components/settings/contact";

const Setting: NextPage = () => {
  const [activeMenu, setActiveMenu] = useState("terms");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <div className="block h-screen bg-white">
      <div className="relative left-52 h-16 text-4xl bg-red-200 w-full">
        <div className="relative right-5">
          <input
            className=" font-semibold font-poppins text-lg relative top-1 left-96 w-2/5 h-10 box-border px-11 py-6 text-gray-700  border-black rounded-full"
            placeholder="Search for a tag,artist,category,service"
            type="text"
          />
          <img
            className="h-7 w-7 p-1 absolute top-4 ml-2 left-96 h-6"
            alt=""
            src="/search.png"
          />
        </div>
        <div className="absolute bottom-2 right-80 w-24 h-12">
          <ProfileButton />
        </div>
        <a
          href="/"
          className="relative bottom-12 left-2 text-white border-2 border-black rounded-lg bg-black w-28 h-12 flex flex-col items-end justify-start px-3 no-underline font-semibold"
        >
          <div className="relative right-4 top-0">logo</div>
        </a>
      </div>
      <div className="w-52 bg-white pt-5 relative bottom-16 h-full">
        <div className="relative left-10">
          <a
            href="/"
            className="text-2xl font-semibold no-underline text-black leading-7"
          >
            Settings
          </a>
        </div>
        <ul className="list-none relative p-5 cursor-pointer border-b border-gray-300">
          <li
            className={activeMenu === "terms" ? "active:bg-violet-700" : ""}
            onClick={() => handleMenuClick("terms")}
          >
            <div className="py-1">
              <h3 className=" font-semibold no-underline text-black ">
                Terms Of Service
              </h3>
            </div>
          </li>
          <li
            className={activeMenu === "privacy" ? "active:bg-violet-700" : ""}
            onClick={() => handleMenuClick("privacy")}
          >
            <div className="py-1">
              <h3 className=" font-semibold no-underline text-black ">
                Privacy And Policy
              </h3>
            </div>
          </li>
          <li
            className={activeMenu === "help" ? "active:bg-violet-700" : ""}
            onClick={() => handleMenuClick("help")}
          >
            <div className="py-1">
              <h3 className=" font-semibold no-underline text-black ">Help</h3>
            </div>
          </li>
          <li
            className={activeMenu === "about" ? "active:bg-violet-700" : ""}
            onClick={() => handleMenuClick("about")}
          >
            <div className="py-1">
              <h3 className=" font-semibold no-underline text-black ">About</h3>
            </div>
          </li>
          <li
            className={activeMenu === "contact" ? "active:bg-violet-700" : ""}
            onClick={() => handleMenuClick("contact")}
          >
            <div className="py-1">
              <h3 className=" font-semibold no-underline text-black ">
                Contact
              </h3>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex-grow p-5">
        {activeMenu === "terms" && (
          <div className="absolute top-20 left-56">
            <Terms />
          </div>
        )}
        {activeMenu === "privacy" && (
          <div className="absolute top-20 left-56">
            <Privacy />
          </div>
        )}
        {activeMenu === "help" && (
          <div className="absolute top-20 left-56">
            <Help />
          </div>
        )}
        {activeMenu === "about" && (
          <div className="absolute top-20 left-56">
            <About />
          </div>
        )}
        {activeMenu === "contact" && (
          <div className="absolute top-20 left-56">
            <Contact />
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;

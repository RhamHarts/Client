"use client";
import React, { useState } from "react";
import CountryIcons from "../components/CountryDropdown";
import { COUNTRIES } from "../components/countryIcons/country";
import { SelectMenuOption } from "../components/countryIcons/types";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState<SelectMenuOption["value"]>("BE");

  return (
    <>
      <CountryIcons />
      <select
        className="z-50 px-2 text-gray-300 text-xs bg-transparent rounded-xl box-border h-[52px] w-[370px] border-2 border-solid border-white outline-none font-poppins"
        value={country}
      >
        <li className="py-2.5 px-4 hover:bg-blue-50 rounded text-black text-sm cursor-pointer">
          <div className="flex items-center">
            <img
              src="https://readymadeui.com/singapore_flag.webp"
              className="w-6 mr-3"
            />
            Singapore
          </div>
        </li>
      </select>
    </>
  );
}

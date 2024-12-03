"use client";

import React, { useState } from "react";
import CountrySelector from "../components/countryIcons/selector";
import { COUNTRIES } from "../components/countryIcons/country";
import { SelectMenuOption } from "../components/countryIcons/types";

interface CountryDropdownProps {
  setCountry: (country: string) => void;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({ setCountry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setLocalCountry] = useState("AF");

  const handleChange = (val: string) => {
    setLocalCountry(val);
    setCountry(val); // Update the parent component's state
  };

  return (
    <CountrySelector
      id={"countries"}
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      onChange={handleChange}
      selectedValue={
        COUNTRIES.find((option) => option.value === country) as SelectMenuOption
      }
    />
  );
};

export default CountryDropdown;

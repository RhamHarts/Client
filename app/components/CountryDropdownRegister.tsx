"use client";

import React, { useState } from "react";
import CountrySelector from "./countryIconsRegister/selector";
import { COUNTRIES } from "./countryIconsRegister/country";
import { SelectMenuOption } from "./countryIconsRegister/types";

interface CountryDropdownRegisterProps {
  setCountry: (country: string) => void;
}

const CountryDropdownRegister: React.FC<CountryDropdownRegisterProps> = ({
  setCountry,
}) => {
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

export default CountryDropdownRegister;

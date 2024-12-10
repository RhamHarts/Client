import React, { useState } from "react";
import CountrySelector from "./countryIconsProfile/selector";
import { COUNTRIES } from "./countryIconsProfile/country";
import { SelectMenuOption } from "./countryIconsProfile/types";

interface CountryDropdownProfileProps {
  setCountry: (country: string) => void;
}

const CountryDropdownProfile: React.FC<CountryDropdownProfileProps> = ({
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

export default CountryDropdownProfile;

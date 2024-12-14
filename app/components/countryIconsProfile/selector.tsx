import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { COUNTRIES } from "./country";
import { SelectMenuOption } from "./types";
import { AnimatePresence, motion } from "framer-motion";

export interface CountrySelectorProps {
  id: string;
  open: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onChange: (value: SelectMenuOption["value"]) => void;
}

export default function CountrySelector({
  id,
  open,
  disabled = false,
  onToggle,
  onChange,
}: CountrySelectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(""); // Ensure query state is initialized
  const [selectedValue, setSelectedValue] = useState<SelectMenuOption | null>(
    null
  );

  useEffect(() => {
    // Fetch the initial country data on load
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(
          "https://api.artwishcreation.com/api/profile/me",
          { withCredentials: true }
        );

        console.info("Fetched profile data:", response.data); // Debugging log

        if (response.data && response.data.data) {
          const profileCountryCode = response.data.data.country || "AF"; // Assume "AF" as default if missing
          const countryData = COUNTRIES.find(
            (country) => country.value === profileCountryCode
          );

          if (countryData) {
            setSelectedValue(countryData);
            console.info("Set selectedValue to:", countryData); // Debugging log
          } else {
            console.warn(
              "Country code from API does not match COUNTRIES data:",
              profileCountryCode
            );
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchCountryData();
  }, []);

  useEffect(() => {
    // Clicking outside closes the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node) && open) {
        onToggle();
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onToggle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div ref={ref}>
      <div className="relative gap-6 flex flex-col">
        <button
          type="button"
          className="w-[960px] p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          onClick={onToggle}
          disabled={disabled}
        >
          <span className="flex items-center">
            {selectedValue ? (
              <>
                <img
                  alt={selectedValue.value}
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue.value}.svg`}
                  className="inline mr-2 h-6"
                />
                {selectedValue.title}
              </>
            ) : (
              <span>No country selected</span>
            )}
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute w-[960px] z-10 mt-1 w-80 bg-white shadow-lg rounded-md text-base focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
            >
              <div className="sticky top-0 z-10 w-full">
                <li className="text-gray-900 cursor-default select-none relative py-2 px-3">
                  <input
                    type="search"
                    name="search"
                    autoComplete="off"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full h-auto text-gray-300 text-xs bg-transparent rounded-xl box-border border-2 border-solid border-white font-poppins"
                    placeholder="Search a country"
                    value={query} // Bound to query state
                    onChange={handleInputChange} // Event handler for onChange
                  />
                </li>
                <hr />
              </div>

              <div className="max-h-40 overflow-y-scroll">
                {COUNTRIES.filter((country) =>
                  country.title.toLowerCase().includes(query.toLowerCase())
                ).length === 0 ? (
                  <li className="text-gray-900 cursor-default select-none relative py-2 px-1">
                    No countries found
                  </li>
                ) : (
                  COUNTRIES.filter((country) =>
                    country.title.toLowerCase().includes(query.toLowerCase())
                  ).map((value) => {
                    return (
                      <li
                        key={`${id}-${value.value}`}
                        className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-blue-50 transition"
                        role="option"
                        onClick={() => {
                          onChange(value.value);
                          setSelectedValue(value); // Update the selectedValue
                          setQuery("");
                          onToggle();
                        }}
                      >
                        <img
                          alt={value.title}
                          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                          className="inline mr-2 h-6"
                        />
                        <span className="font-normal truncate">
                          {value.title}
                        </span>
                      </li>
                    );
                  })
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

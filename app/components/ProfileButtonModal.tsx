import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie library
import styles from "./ProfileButtonModal.module.css";

const ProfileButton: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    closeDropdown();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("isLoggedIn");
    Cookies.remove("username");
    Cookies.remove("token");

    window.location.reload();
    console.log("berhasil logout");
  };

  const fetchProfileData = async (token: string) => {
    try {
      const response = await fetch(
        "http://153.92.208.131:3000/api/auth/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile data.");
      }

      const data = await response.json();
      setUsername(data.data.username);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token"); // Retrieve token from cookies

    if (token) {
      setIsLoggedIn(true);
      fetchProfileData(token);
    }
  }, []);

  return (
    <div className="relative">
      <button
        className="cursor-pointer border-0 p-0 bg-gray-800 w-48 h-12 rounded-lg flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <h3 className="font-bold text-xl relative left-12 top-1">
          {username || "RhamHarts"}
        </h3>
        <img
          className="h-5 w-5 relative right-40"
          alt=""
          src="/Icons/-icon-person.svg"
        />
      </button>
      {isDropdownOpen && (
        <div className="z-10 absolute top-12 right-0 bg-white divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-700">
          <a
            href="/profile"
            className="block px-5 py-5 no-underline text-sm font-medium text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleLinkClick}
          >
            Profile
          </a>

          <a
            href="/profile"
            className="block px-5 py-5 no-underline text-sm font-medium text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleLinkClick}
          >
            Posts
          </a>

          <a
            href="/profile"
            className="block px-5 py-5 no-underline text-sm font-medium text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleLinkClick}
          >
            Likes & Saved
          </a>

          <a
            href="/settings"
            className="block px-5 py-5 no-underline text-sm font-medium text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleLinkClick}
          >
            Settings
          </a>

          <a
            href="#"
            className="block px-5 py-5 no-underline text-sm font-medium text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;

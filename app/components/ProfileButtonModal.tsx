import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../Context/AuthContext";

const ProfileButton: React.FC = () => {
  const { loading, isUserLoggedIn } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<any>(null);

  const router = useRouter();

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

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://api.artwishcreation.com/api/auth/logout",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // Clear specific cookies
        Cookies.remove("isLoggedIn");
        Cookies.remove("username");
        Cookies.remove("token");
        Cookies.remove("ref"); // Clear the 'ref' cookie as well

        setIsLoggedIn(false);
        alert("Logout successful!");

        // Redirect to login page
        router.push("/login");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  useEffect(() => {
    // Fetch data when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.artwishcreation.com/api/auth/profile/",
        { withCredentials: true } // Send cookies with request
      );
      console.log(response.data);
      // You can set the fetched data to state here if needed
    } catch (error) {
      console.error("Error fetching data with credentials:", error);
    }
  };

  return (
    <div className="relative">
      <button
        className="cursor-pointer border-0 p-0 bg-gray-800 w-48 h-12 rounded-lg flex items-center"
        onClick={toggleDropdown}
      >
        <img className="h-7 w-7 ml-2" alt="" src="/Icons/-icon-person.svg" />{" "}
        <h3 className="text-white font-bold text-2xl ml-10">
          {" "}
          {fetchedData && fetchedData.data
            ? fetchedData.data.username
            : "User"}{" "}
        </h3>{" "}
      </button>
      {isDropdownOpen && (
        <div className="z-10 absolute top-14 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-48 dark:bg-gray-700">
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

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import styles from "./ProfileButtonModal.module.css";
import { useAuth } from "../Context/AuthContext";

const ProfileButton: React.FC = () => {
  const { loading, isUserLoggedIn } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<any>(null);

  const router = useRouter(); // Initialize the useRouter hook

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
        Cookies.remove("isLoggedIn");
        Cookies.remove("username");
        Cookies.remove("token");

        setIsLoggedIn(false);
        alert("Berhasil logout");

        // Redirect to login page
        router.push("/login");
      } else {
        alert("Logout gagal");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Terjadi kesalahan saat logout. Coba lagi.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.artwishcreation.com/api/auth/profile",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setFetchedData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative">
      <button
        className="cursor-pointer border-0 p-0 bg-gray-800 w-48 h-12 rounded-lg flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <h3 className="font-bold text-xl relative left-12 top-1">
          {fetchedData && fetchedData.data ? fetchedData.data.username : "User"}
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

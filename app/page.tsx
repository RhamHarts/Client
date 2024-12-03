"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "./Context/AuthContext";
import LoginModal from "./components/LoginModal";
import ProfileButton from "./components/ProfileButtonModal";
import SeeAllImagesModal from "./components/SeeAllImagesModal";
import axios from "axios";

// Mengaktifkan pengiriman kredensial (cookies) di semua permintaan
axios.defaults.withCredentials = true;

const Homepage: React.FC = () => {
  const { loading, isUserLoggedIn } = useAuth(); // Mengambil status login dari useAuth
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState(null); // State untuk menyimpan data yang di-fetch

  const handleImageClick = (imageId: number) => {
    console.log("Image clicked:", imageId); // Logika tambahan untuk setelah login
  };

  const [visiblePopularImages, setVisiblePopularImages] = useState<string[]>(
    []
  );
  const [visiblePopularImagesCount, setVisiblePopularImagesCount] =
    useState(10);

  interface Image {
    id: number;
    url: string;
  }

  const allImages: Image[] = [];
  for (let i = 1; i <= 100; i++) {
    const imageUrl = `https://source.unsplash.com/random/${i}`; // URL gambar dummy dari Unsplash
    allImages.push({ id: i, url: imageUrl });
  }

  const displayPopularImages = () => {
    const urls = allImages
      .slice(0, visiblePopularImagesCount)
      .map((image) => image.url);
    setVisiblePopularImages(urls);
  };

  // Fetch data menggunakan Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.artwishcreation.com/api/auth/profile", // Ganti dengan endpoint API Anda
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setFetchedData(response.data); // Simpan data ke state jika diperlukan
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Panggilan hanya dilakukan sekali saat komponen dimount

  return (
    <div className="flex flex-col bg-gray-500 p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex flex-row justify-between">
            <div className="text-base relative">
              <h1>COMISSAPP</h1>
            </div>
            <div className="flex gap-5">
              <LoginModal />
              <ProfileButton />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="items-center justify-between w-full flex flex-row rounded-full p-2 sticky">
              <input
                className="font-bold text-white uppercase rounded-full w-full py-4 pl-4 bg-gray-900 lg:text-sm text-xs"
                type="text"
                placeholder="Search for category, tags, artist, or services"
              />

              <div className="bg-gray-900 p-4 hover:bg-blue-400 cursor-pointer rounded-full">
                <svg
                  className="w-8 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="flex gap-4 m-5 w-full">
              {[...Array(15)].map((_, index) => (
                <button
                  key={index}
                  className="cursor-pointer bg-gray-900 w-full flex justify-center items-center rounded-xl text-white font-semibold"
                >
                  <h5>ComissApp {index + 1}</h5>
                </button>
              ))}
            </div>

            <SeeAllImagesModal />
          </div>

          {visiblePopularImages.map((url, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              className="p-2 cursor-pointer"
            >
              <img
                src={url}
                alt={`Popular image ${index}`}
                className="h-48 w-auto rounded-md"
              />
            </div>
          ))}

          {isLoginModalOpen && <LoginModal />}
        </>
      )}
    </div>
  );
};

export default Homepage;

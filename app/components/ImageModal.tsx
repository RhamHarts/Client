"use client";

import React, { useEffect, useState } from "react";
import styles from "./ImageModal.module.css";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  const [isLoved, setIsLoved] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  // Function to check login status
  const isUserLoggedIn = () => {
    const token = sessionStorage.getItem("token");
    return !!token; // Return true if token exists
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeModal = () => {
    onClose();
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const toggleLove = () => {
    if (!isUserLoggedIn()) {
      alert("Anda belum login, silahkan login dulu");
      return;
    }
    setIsLoved((prev) => !prev);
  };

  const toggleBookmark = () => {
    if (!isUserLoggedIn()) {
      alert("Anda belum login, silahkan login dulu");
      return;
    }
    setIsBookmarked((prev) => !prev);
  };

  const toggleShare = () => {
    if (!isUserLoggedIn()) {
      alert("Anda belum login, silahkan login dulu");
      return;
    }
    setIsShared((prev) => !prev);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="mx-auto relative my-10 grid grid-cols-2 bg-white align-center justify-center border border-black-500 p-4 max-w-7xl h-auto">
        <div className="col-span-1 border border-black-500">
          <img
            src={imageUrl}
            alt="Zoomed Image"
            className="max-w-[512px] max-h-[512px] w-full  object-contain mx-auto my-10 mx-10"
          />
        </div>
        <div className="col-span-1 border border-black-500 max-w-[512px]">
          <img
            src="/Icons/cross.png"
            alt="Close"
            className="absolute h-12 w-12 top-0 right-0 text-white cursor-pointer"
            onClick={closeModal}
          />
          <h2 className="font-bold ml-4 ">Nama Akun</h2>
          <h3 className="font-semibold ml-4 -mt-2">Judul Gambar</h3>
          <div className="flex relative -mt-2 left-4">
            <div onClick={toggleLove}>
              <img
                className="w-8 h-8 cursor-pointer mr-2"
                src={isLoved ? "/heart1.png" : "/heart.png"}
                alt="Love"
              />
            </div>
            <div onClick={toggleBookmark}>
              <img
                className="w-9 h-9 cursor-pointer mr-2"
                src={isBookmarked ? "/bookmark1.png" : "/bookmark.png"}
                alt="Bookmark"
              />
            </div>

            <div onClick={toggleShare}>
              <img
                className="w-10 h-10 relative bottom-1 right-1 cursor-pointer mr-2"
                src={isShared ? "/share1.png" : "/share.png"}
                alt="Share"
              />
            </div>
          </div>

          <div className="relative ml-4 text-sm font-normal ">Details :</div>
          <ul className="relative mt-2 text-sm font-normal font-poppins -ml-2">
            <li>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
              nesciunt vero repellat dicta? In eaque quae rem esse deserunt
              unde!
            </li>
          </ul>
          <ul className="relative mt-2 text-sm font-normal font-poppins -ml-2">
            <li>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
              nesciunt vero repellat dicta? In eaque quae rem esse deserunt
              unde!
            </li>
          </ul>
          <ul className="relative mt-2 text-sm font-normal font-poppins -ml-2">
            <li>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
              nesciunt vero repellat dicta? In eaque quae rem esse deserunt
              unde!
            </li>
          </ul>
          <div className="mt-20">
            <button className="w-[300px] py-0 text-lg font-semibold cursor-pointer border border-white border-opacity-80  bg-black rounded-full box-border flex flex-col items-center justify-end absolute bottom-5 right-10  -translate-x-1/2">
              <h2 className="relative text-white font-inter text-left">
                lorem Ipsum
              </h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;

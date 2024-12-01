import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import styles from "./YourPostModal.module.css";
import ImageSlider from "./ImageSlider";

interface ImageModalProfileProps {
  onClose: () => void;
}

const ImageModalProfile: React.FC<ImageModalProfileProps> = ({ onClose }) => {
  const [isLoved, setIsLoved] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShared, setIsShared] = useState(false);

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
    setIsLoved((prev) => !prev);
  };

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const toggleShare = () => {
    setIsShared((prev) => !prev);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50 ">
      <div className="mx-auto relative my-10 grid grid-cols-2 bg-white align-center justify-center border border-black-500 p-4 max-w-7xl h-auto">
        <div className="col-span-1 border border-black-500">
          <ImageSlider />
        </div>
        <div className="col-span-1 border border-black-500 max-w-[512px]">
          <img
            src="/Icons/cross.png"
            alt="Close"
            className="absolute h-12 w-12 top-2 right-0 cursor-pointer"
            onClick={closeModal}
          />
          <div className="text-2xl font-extrabold text-black ml-5 mt-2 mb-2">
            Nama Akun
          </div>
          <div className="ml-5 text-lg font-medium mb-2">Judul Gambar</div>
          <div className="flex relative mt-0 left-5">
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

          <div className="relative ml-20 text-sm font-normal right-14">
            Details :
          </div>
          <ul className="text-base font-normal ml-5 pl-5 mt-2">
            <li>
              {" "}
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
              nesciunt vero repellat dicta? In eaque quae rem esse deserunt
              unde!
            </li>
          </ul>
          <ul className="text-base font-normal ml-5 pl-5 mt-2">
            <li>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
              nesciunt vero repellat dicta? In eaque quae rem esse deserunt
              unde!
            </li>
          </ul>
          <ul className="text-base font-normal ml-5 pl-5 mt-2">
            <li>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
              nesciunt vero repellat dicta? In eaque quae rem esse deserunt
              unde!
            </li>
          </ul>
          <div className="relative mb-10 -bottom-10 left-80 transform -translate-x-1/2">
            <button className="text-base font-semibold cursor-pointer border border-white border-opacity-80 py-13 px-0 bg-black rounded-full box-border w-96 h-12 flex flex-col items-center justify-end">
              <div className="relative bottom-2 text-xl text-white font-inter">
                lorem Ipsum
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModalProfile;

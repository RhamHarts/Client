import React from "react";
import styles from "./Gallery.module.css";
import ImageSlider from "../ImageSlider";
import YourPostModal from "../YourPostModal";

interface GalleryProps {
  handlePostContentClick: () => void;
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const Gallery: React.FC<GalleryProps> = ({
  handlePostContentClick,
  isModalOpen,
  handleCloseModal,
}) => {
  return (
    <div
      className="grid grid-cols-2 grid-rows-1 gap-x-0 gap-y-0 box-border border-solid border-2 border-black  max-w-7xl h-auto mb-5 cursor-pointer"
      onClick={handlePostContentClick}
    >
      <div className="relative">
        <img
          src="1.jpg"
          alt="Zoomed Image"
          className="max-w-[512px] max-h-[312px] w-full object-cover"
        />
      </div>
      <div className="relative">
        <div className="text-2xl font-extrabold text-black ml-5 mt-2">
          God Of Fear And Hunger
        </div>
        <div className="text-lg font-normal ml-5">
          Also known as the Ancient One
        </div>
        <div className="ml-5 mt-2 font-normal text-sm">Details :</div>
        <ul className="text-sm font-normal m-0 pl-5 ml-5 mt-2">
          <li>
            {" "}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
            nesciunt vero repellat dicta? In eaque quae rem esse deserunt unde!
          </li>
        </ul>
        <ul className="text-sm font-normal m-0 pl-5 ml-5 mt-2">
          <li>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
            nesciunt vero repellat dicta? In eaque quae rem esse deserunt unde!
          </li>
        </ul>
        <ul className="text-sm font-normal m-0 pl-5 ml-5 mt-2">
          <li>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
            nesciunt vero repellat dicta? In eaque quae rem esse deserunt unde!
          </li>
        </ul>
        <button className="w-[300px] py-0 cursor-pointer border border-white border-opacity-80  bg-black rounded-full box-border flex flex-col items-center justify-end relative top-3 -right-64  -translate-x-1/2">
          <h2 className="relative text-white font-inter text-left text-lg">
            lorem Ipsum
          </h2>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && <YourPostModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Gallery;

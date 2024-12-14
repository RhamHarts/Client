"use client";
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import YourPostModal from "../components/YourPostModal";
import ProfileButton from "../components/ProfileButtonModal";
import EditProfile from "../components/EditProfileModal";
import Gallery from "../components/profile/Gallery";
import Posts from "../components/profile/Posts";
import LikesAndSaved from "../components/profile/LikesAndSaved";
import { useAuth } from "../Context/AuthContext";
import Navbar from "../components/Navbar";

const Profile: NextPage = () => {
  const { loading, isUserLoggedIn } = useAuth(); // Mengambil status login dari useAuth
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Gallery");

  const handlePostContentClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative bg-gray-900">
      <Navbar showLoginModal={false} />
      <div className="">
        <img className="w-full" alt="" src="/image-profile@2x.png" />
      </div>

      <div className="absolute w-64 flex flex-col items-center justify-start">
        <div
          className="relative bottom-44 box-border bg-gray-300 w-52 h-52"
          style={{
            borderRadius: "50%",
          }}
        />
        <div className="w-52 h-auto relative bottom-56">
          <div className="relative top-7 left-7 w-32 h-14 text-3xl">
            <h2 className="relative left-4 text-base text-gray-400 top-3">
              @loremIpsum
            </h2>
            <h4 className="text-white font-semibold absolute top-2 left-7">
              lorem
            </h4>
          </div>
          <div className="relative top-20 left-4">
            <div className="z-50 relative">
              <EditProfile onClose={() => setIsModalOpen(false)} />
            </div>
            <div className="flex relative right-6">
              <h3 className="text-xs ml-5">10.001 Followers</h3>
              <h3 className="text-xs ml-5">0 Following</h3>
            </div>
          </div>
          <div className="relative top-16 h-80 p-2">
            <p className="text-sm text-gray-500 leading-5 text-justify">
              aku adalah anak pelaut suka makanan yang bergizi sehat kuat dan
              tahan lama aku juga bisa menjadi harimau bayangan aku adalah anak
              pelaut suka makanan yang bergizi sehat kuat dan tahan lama aku
              juga bisa menjadi harimau bayangan
            </p>
          </div>
          <div className="absolute bottom-32">
            <h3 className="relative text-xl top-72 left-3 text-base">
              Social Media :
            </h3>
            <div className="relative top-72 left-3 w-92 h-17 flex flex-row items-center justify-start">
              <img className="relative w-8 h-7" alt="" src="/facebook.svg" />
              <a className="relative left-3" href="https://www.facebook.com/">
                Facebook
              </a>
            </div>
            <div className="relative top-72 left-3 w-92 h-17 flex flex-row items-center justify-start mt-4">
              <img className="relative w-8 h-7" alt="" src="/instagram.svg" />
              <a className="relative left-3" href="https://www.Instagram.com/">
                Instagram
              </a>
            </div>
            {/* <div className="absolute -bottom-60 left-3 w-92 h-17 flex flex-row items-center justify-start ">
              <img className={styles.Icon} alt="" src="/instagram.svg" />
              <a
                className={styles.SocialMediaText}
                href="https://www.Instagram.com/"
              >
                Instagram
              </a>
            </div> */}
            <div className="relative top-72 left-3 w-92 h-17 flex flex-row items-center justify-start mt-4">
              <img className="relative w-8 h-7" alt="" src="/tiktok.svg" />
              <a className="relative left-3" href="https://www.tiktok.com/">
                Tiktok
              </a>
            </div>
            <div className="relative top-72 left-3 w-92 h-17 flex flex-row items-center justify-start mt-4">
              <img className="relative w-8 h-7" alt="" src="/twitter.svg" />
              <a className="relative left-3" href="https://www.twitter.com/">
                twitter
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[1121px] h-[491px] left-60 flex flex-col items-center justify-start px-0 pt-1 text-gray-600 relative">
        <div className="w-[1121px] relative h-32 overflow-hidden ml-16 text-2xl font-semibold">
          <div className="ml-3">
            <a
              className={
                activeTab === "Gallery"
                  ? "left-5 font-inter text-left cursor-pointer bg-transparent relative top-1 text-2xl text-black inline-block mr-5 leading-8 font-semibold"
                  : "left-5 font-inter text-left cursor-pointer bg-transparent relative top-1 text-2xl text-gray-700 inline-block mr-5 leading-8 font-semibold no-underline"
              }
              onClick={() => handleTabClick("Gallery")}
            >
              Gallery
            </a>
            <a
              className={
                activeTab === "Posts"
                  ? "left-5 font-inter text-left cursor-pointer bg-transparent relative top-1 text-2xl text-black inline-block mr-5 leading-8 font-semibold"
                  : "left-5 font-inter text-left cursor-pointer bg-transparent relative top-1 text-2xl text-gray-700 inline-block mr-5 leading-8 font-semibold no-underline"
              }
              onClick={() => handleTabClick("Posts")}
            >
              Posts
            </a>
            <a
              className={
                activeTab === "LikesAndSaved"
                  ? "left-5 font-inter text-left cursor-pointer bg-transparent relative top-1 text-2xl text-black inline-block mr-5 leading-8 font-semibold"
                  : "left-5 font-inter text-left cursor-pointer bg-transparent relative top-1 text-2xl text-gray-700 inline-block mr-5 leading-8 font-semibold no-underline"
              }
              onClick={() => handleTabClick("LikesAndSaved")}
            >
              Likes & Saved
            </a>
          </div>
          <div className="w-[1085px] top-5 left-8 relative h-7">
            <button className="relative h-8 cursor-pointer border-2 border-white bg-black rounded-lg box-border w-24 mr-4">
              <div className="relative text-sm font-semibold text-white font-inter text-center">
                tag 1
              </div>
            </button>
            <button className="relative h-8 cursor-pointer border-2 border-white bg-black rounded-lg box-border w-24 mr-4">
              <div className="relative text-sm font-semibold text-white font-inter text-center">
                tag 1
              </div>
            </button>
          </div>
        </div>

        {/* <div className={styles.TabandTagContainer}>
          <div className={styles.TabTitle}>
            <a href="/profile" className={styles.TabList}>
              Your Post
            </a>
            <a href="/request" className={styles.TabList}>
              Request
            </a>
            <a href="/saved" className={styles.TabList}>
              Saved
            </a>
            <div className={styles.TagContainer}>
              <button className={styles.buttonTag}>
                <div className={styles.TagText}>tag 1</div>
              </button>

              <button className={styles.buttonTag}>
                <div className={styles.TagText}>tag 1</div>
              </button>
            </div>
          </div>
        </div> */}

        <div className="mt-5 ml-16 rounded-3xl flex flex-col gap-5 relative">
          {activeTab === "Gallery" && (
            <Gallery
              handlePostContentClick={handlePostContentClick}
              isModalOpen={isModalOpen}
              handleCloseModal={handleCloseModal}
            />
          )}
          {activeTab === "Posts" && (
            <Posts
              handlePostContentClick={handlePostContentClick}
              isModalOpen={isModalOpen}
              handleCloseModal={handleCloseModal}
            />
          )}
          {activeTab === "LikesAndSaved" && (
            <LikesAndSaved
              handlePostContentClick={handlePostContentClick}
              isModalOpen={isModalOpen}
              handleCloseModal={handleCloseModal}
            />
          )}

          {/* Modal */}
          {isModalOpen && <YourPostModal onClose={handleCloseModal} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;

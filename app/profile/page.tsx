"use client";
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import styles from "./profile.module.css";
import YourPostModal from "../components/YourPostModal";
import ProfileButton from "../components/ProfileButtonModal";
import EditProfile from "../components/EditProfileModal";
import Gallery from "../components/profile/Gallery";
import Posts from "../components/profile/Posts";
import LikesAndSaved from "../components/profile/LikesAndSaved";
import { useAuth } from "../Context/AuthContext";

import axios from "axios";

axios.defaults.withCredentials = true;

const Profile: NextPage = () => {
  const { loading, isUserLoggedIn } = useAuth(); // Mengambil status login dari useAuth
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Gallery");
  const [fetchedData, setFetchedData] = useState(null); // State untuk menyimpan data yang di-fetch

  const handlePostContentClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.artwishcreation.com/api/profile/me",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Fetched data:", response.data); // Logs the fetched data to the console
        setFetchedData(response.data); // Store the data in state if necessary
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-full relative bg-gray-900 text-white font-inter text-base h-[2000px]">
      <div className="max-w-full">
        <img
          className="object-cover relative overflow-hidden w-full"
          alt=""
          src="/image-profile@2x.png"
        />
      </div>
      <div className="absolute items-center justify-between top-0 w-full h-24 flex items-center justify-center text-4xl bg-black bg-opacity-70 z-10">
        <div className="w-20">
          <a
            href="/"
            className=" no-underline flex items-center w-full justify-end bg-black rounded-lg w-20 h-14 px-4 ml-5"
          >
            <h4 className="font-semibold ">logo</h4>
          </a>
        </div>
        <div className="w-20 mr-10">
          <h4 className="w-full">Discover</h4>
        </div>
        <div className="relative w-[600px] ">
          <input
            // className="overflow-hidden text-left font-semibold font-poppins text-lg bg-gray-900 text-gray-400 px-36 py-3 border border-gray-300 border-opacity-25 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-gray-800 placeholder-gray-600"
            className="w-full text-left font-semibold font-Poppins text-center text-lg bg-gray-900 px-4 py-3  h-14 box-border  text-gray-500 rounded-3xl"
            placeholder="Search for a tag,artist,category"
            type="text"
          />
          {/* <img
            className="absolute top-9 left-96 ml-5 w-8 h-8 z-50"
            alt=""
            src="/search.png"
          /> */}
        </div>
        <div className="h-14">
          <a
            href="#"
            className="w-full no-underline cursor-pointer align-center py-5 px-10 bg-black text-white rounded-full text-base font-inter"
          >
            Join Membership
          </a>
        </div>
        <div className=" flex items-center ">
          <ProfileButton />
        </div>
      </div>

      <div className="absolute w-64 flex flex-col items-center justify-start">
        <div className="w-52 ">
          <div className="relative top-7 left-7 w-32 h-14 text-3xl">
            <h2 className="relative left-4 mt-5 text-base text-gray-400 top-3">
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

        <div className="flex flex-col items-center mt-5">
          {fetchedData ? (
            <div className="bg-white p-4 rounded-md w-full">
              <h3>Fetched Data:</h3>
              <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
              {/* Customize how you display the fetched data here */}
            </div>
          ) : (
            <p>No data fetched.</p>
          )}
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

      <div
        className="absolute top-20 -left-10 box-border bg-gray-300 border-white border-1 w-36 h-44 ml-24"
        style={{
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

export default Profile;

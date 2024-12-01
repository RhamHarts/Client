import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./EditProfileModal.module.css";

interface Props {
  onClose: () => void;
}

const EditProfile: React.FC<Props> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [Facebook, setFacebook] = useState("");
  const [Twitter, setTwitter] = useState("");
  const [Instagram, setInstagram] = useState("");
  const [Pinterest, setPinterest] = useState("");
  const [Tiktok, setTiktok] = useState(""); // State untuk menyimpan data social media
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSocialMediaModal, setShowSocialMediaModal] = useState(false); // State untuk menampilkan modal sosial media

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleBioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleFacebookChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFacebook(event.target.value);
  };

  const handleTwitterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTwitter(event.target.value);
  };

  const handleInstagramChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInstagram(event.target.value);
  };

  const handlePinterestChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPinterest(event.target.value);
  };
  const handleTiktokChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTiktok(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Name:", name);
    console.log("Username:", username);
    console.log("Bio:", bio);
    console.log("Facebook:", Facebook);
    console.log("Twitter:", Twitter);
    console.log("Instagram:", Instagram);
    console.log("Pinterest:", Pinterest);
    console.log("Tiktok:", Tiktok);
    setIsModalOpen(false);
  };

  const handleEditProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleCloseModal1 = () => {
    setShowSocialMediaModal(false);
    onClose();
  };

  const handleSocialMediaClick = () => {
    setShowSocialMediaModal(true); // Set state untuk menampilkan modal sosial media
  };

  const handleBackToEditProfile = () => {
    setShowSocialMediaModal(false); // Set state untuk menutup modal sosial media
    setIsModalOpen(true); // Tetapkan isModalOpen menjadi true untuk membuka kembali modal Edit Profile
  };

  return (
    <div>
      <button
        className="cursor-pointer border-white border-opacity-80 bg-black rounded-xl box-border w-44 h-10 flex flex-col items-center justify-center transform transition-transform hover:scale-105"
        onClick={handleEditProfileClick}
      >
        <h3 className="text-xl font-inter text-white h-8 text-left">
          Edit Profile
        </h3>
      </button>

      {/* Modal utama */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 w-1/2 h-4/5 p-5 rounded-lg shadow-md text-white">
            <img
              src="/Icons/cross.png"
              alt="Close"
              className="relative w-10 h-10 cursor-pointer bottom-2 ml-80 left-96 "
              onClick={handleCloseModal}
            />

            <h2 className="font-bold text-2xl relative bottom-10 left-72">
              Edit Profile
            </h2>

            <form
              className="flex flex-col relative bottom-16"
              onSubmit={handleSubmit}
            >
              <div>
                <h2 className="relative mt-5">Name:</h2>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="p-3 border border-gray-300 rounded-lg text-lg w-11/12 bg-gray-700"
                />
              </div>
              <div>
                <h2 className="relative mt-5">Username:</h2>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  className="p-3 border border-gray-300 rounded-lg text-lg w-11/12 bg-gray-700"
                />
              </div>
              <div>
                <h2 className="relative mt-5">Bio:</h2>
                <textarea
                  value={bio}
                  onChange={handleBioChange}
                  className={`${"p-3 border border-gray-300 rounded-lg text-lg w-11/12 bg-gray-700"} ${"resize-none"}`}
                />
              </div>

              {/* Tombol Social Media */}
              <div className="mt-5">
                <button
                  className="relative left-3 bg-gray-800 text-white py-3 rounded-md cursor-pointer ease-in-out w-11/12 mt-2"
                  onClick={handleSocialMediaClick}
                >
                  Add Your Social Media
                </button>
              </div>

              <div className="sticky bottom-0 flex justify-end mr-4">
                <button
                  type="submit"
                  className="mt-5 p-2 bg-blue-600 text-white rounded-md text-lg transition duration-300 ease-in-out w-1/6 cursor-pointer hover:bg-blue-700 mr-5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mt-5 p-2 bg-blue-600 text-white rounded-md text-lg transition duration-300 ease-in-out w-1/6 cursor-pointer hover:bg-blue-700 mr-5"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal untuk Social Media */}
      {showSocialMediaModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 w-1/2 h-4/5 p-5 rounded-lg shadow-md text-white overflow-y-auto">
            {/* Konten modal */}
            <div>
              <div className="sticky top-0 h-10 z-50">
                <h2 className="ml-72 text-3xl font-bold relative bottom-5">
                  Social Media
                </h2>
                <img
                  src="/Icons/left.svg"
                  alt="Close"
                  className="absolute h-10 w-10 -left-1 bottom-6 text-white cursor-pointer"
                  onClick={handleBackToEditProfile}
                />
                <img
                  src="/Icons/cross.png"
                  alt="Close"
                  className="absolute h-10 w-10 -right-1 bottom-8 text-white cursor-pointer"
                  onClick={handleCloseModal1}
                />
              </div>
              <h2 className="mb-10 mt-5 relative">
                Add your link social media accounts :
              </h2>
              {/* Input forms untuk social media */}

              <h2 className="relative mt-5">Facebook</h2>
              <div className="-mt-10">
                <div className="bg-gray-800 relative rounded-l-md top-12 w-10 h-10 flex items-center justify-center mr-4 py-2 px-2">
                  <img
                    src="/facebook1.png" // Ganti dengan path ke ikon Facebook
                    alt="Facebook Icon"
                    className="w-4/5 h-auto"
                  />
                </div>
                <input
                  type="text"
                  value={Facebook}
                  onChange={handleFacebookChange}
                  className="text-white relative bottom-2 py-4 h-6 rounded-tr-lg rounded-br-lg border-none text-lg bg-gray-800 w-11/12 ml-14 text-white"
                />
              </div>

              <h2 className="relative mt-5">Twitter</h2>
              <div className="-mt-10">
                <div className="bg-gray-800 relative rounded-l-md top-12 w-10 h-10 flex items-center justify-center mr-4 py-2 px-2">
                  <img
                    src="/twitter-x1.png" // Ganti dengan path ke ikon Facebook
                    alt="Twitter Icon"
                    className="w-4/5 h-auto"
                  />
                </div>
                <input
                  type="text"
                  value={Twitter}
                  onChange={handleTwitterChange}
                  className="text-white relative bottom-2 py-4 h-6 rounded-tr-lg rounded-br-lg border-none text-lg bg-gray-800 w-11/12 ml-14 text-white"
                />
              </div>

              <h2 className="relative mt-5">Instagram</h2>
              <div className="-mt-10">
                <div className="bg-gray-800 relative rounded-l-md top-12 w-10 h-10 flex items-center justify-center mr-4 py-2 px-2">
                  <img
                    src="/instagram1.png" // Ganti dengan path ke ikon Facebook
                    alt="Instagram Icon"
                    className="w-4/5 h-auto"
                  />
                </div>
                <input
                  type="text"
                  value={Instagram}
                  onChange={handleInstagramChange}
                  className="text-white relative bottom-2 py-4 h-6 rounded-tr-lg rounded-br-lg border-none text-lg bg-gray-800 w-11/12 ml-14 text-white"
                />
              </div>

              <h2 className="relative mt-5">Pinterest</h2>
              <div className="-mt-10">
                <div className="bg-gray-800 relative rounded-l-md top-12 w-10 h-10 flex items-center justify-center mr-4 py-2 px-2">
                  <img
                    src="/pinterest1.png" // Ganti dengan path ke ikon Facebook
                    alt="Pinterest Icon"
                    className="w-4/5 h-auto"
                  />
                </div>
                <input
                  type="text"
                  value={Pinterest}
                  onChange={handlePinterestChange}
                  className="text-white relative bottom-2 py-4 h-6 rounded-tr-lg rounded-br-lg border-none text-lg bg-gray-800 w-11/12 ml-14 text-white"
                />
              </div>
              <h2 className="relative mt-5">Tiktok</h2>
              <div className="-mt-10">
                <div className="bg-gray-800 relative rounded-l-md top-12 w-10 h-10 flex items-center justify-center mr-4 py-2 px-2">
                  <img
                    src="/tiktok1.png" // Ganti dengan path ke ikon Facebook
                    alt="Tiktok Icon"
                    className="w-4/5 h-auto"
                  />
                </div>
                <input
                  type="text"
                  value={Tiktok}
                  onChange={handleTiktokChange}
                  className="text-white relative bottom-2 py-4 h-6 rounded-tr-lg rounded-br-lg border-none text-lg bg-gray-800 w-11/12 ml-14"
                />
              </div>
              {/* Tombol Kembali dan Simpan */}
              <div className="sticky bottom-0 flex justify-end ml-20">
                <button
                  type="submit"
                  className="mt-5 p-2 bg-blue-600 text-white rounded-md text-lg transition duration-300 ease-in-out w-1/6 cursor-pointer hover:bg-blue-700 mr-5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mt-5 p-2 bg-blue-600 text-white rounded-md text-lg transition duration-300 ease-in-out w-1/6 cursor-pointer hover:bg-blue-700 mr-5"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;

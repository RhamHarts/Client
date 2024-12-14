import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import CountryProfile from "./CountryDropdownProfile";

interface Props {
  onClose: () => void;
}

const EditProfile: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    avatar: "",
    banner: "",
    country: "",
    facebook: "",
    twitter: "",
    instagram: "",
    tiktok: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSocialMediaModal, setShowSocialMediaModal] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e, actionType) => {
  //   e.preventDefault();

  //   const data = {
  //     name: formData.name || "",
  //     username: formData.username || "", // Kirim string kosong jika tidak ada input
  //     bio: formData.bio || "",
  //     facebook: formData.facebook || "",
  //     instagram: formData.instagram || "",
  //     twitter: formData.twitter || "",
  //     tiktok: formData.tiktok || "",
  //     actionType: actionType,
  //   };

  //   axios
  //     .post(        "https://api.artwishcreation.com/api/profile/me", data)
  //     .then((response) => {
  //       console.log("Profile updated:", response.data);
  //       // Reset form data setelah submit
  //       setFormData({
  //         name: "",
  //         username: "",
  //         bio: "",
  //         banner: "",
  //         avatar: "",
  //         facebook: "",
  //         instagram: "",
  //         twitter: "",
  //         tiktok: "",
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error updating profile:", error);
  //     });

  //   window.location.reload();
  // };

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
    setShowSocialMediaModal(true);
  };

  const handleBackToEditProfile = () => {
    setShowSocialMediaModal(false);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://api.artwishcreation.com/api/profile/me",
          { withCredentials: true }
        );
        console.info("ini buktinya",response)

        if (response.data && response.data.data) {
          const profile = response.data.data;

          setProfileData(profile);
          setFormData((prevFormData) => ({
            ...prevFormData,
            username: profile.username,
            email: profile.email,
            imageProfile: profile.avatar, // Ambil dari database
            aboutMe: profile.aboutMe || "",
            facebook: profile.facebook,
            instagram: profile.instagram,
            tiktok: profile.tiktok, // Ambil dari database
            twitter: profile.twitter || "",
          }));
        } else {
          console.error(
            "Profile data not found in the response:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching the profile:");
      }
    };

    fetchProfile();
  }, []);

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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 w-1/2 h-4/5 p-8 rounded-xl shadow-lg text-white relative transform transition-transform duration-300 ease-out">
            <div className="absolute top-0 right-0 m-4">
              <img
                src="/Icons/cross.png"
                alt="Close"
                className="w-8 h-8 cursor-pointer"
                onClick={handleCloseModal}
              />
            </div>
            <h2 className="text-3xl font-semibold text-center mb-8">
              Edit Profile
            </h2>
            <form>
              <div className="mb-6">
                <label htmlFor="avatar" className="block text-lg font-medium">
                  Upload Avatar:
                </label>
                <input
                  type="file"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="banner" className="block text-lg font-medium">
                  Upload Banner:
                </label>
                <input
                  type="file"
                  name="banner"
                  value={formData.banner}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="name" className="block text-lg font-medium">
                  Name :
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="username" className="block text-lg font-medium">
                  Username :
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="bio" className="block text-lg font-medium">
                  Bio:
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 resize-none"
                />
              </div>
              {/* <div className="mb-6">
                <CountryProfile setCountry={setCountry} />
              </div> */}

              <div className="mb-6">
                <button
                  type="button"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-200"
                  onClick={handleSocialMediaClick}
                >
                  Add Your Social Media
                </button>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-800 transition duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* {showSocialMediaModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 w-1/2 h-4/5 p-8 rounded-xl shadow-lg text-white overflow-y-auto relative transform transition-transform duration-300 ease-out">
            <div className="absolute top-0 left-0 m-4">
              <img
                src="/Icons/left.svg"
                alt="Back"
                className="w-8 h-8 cursor-pointer"
                onClick={handleBackToEditProfile}
              />
            </div>
            <div className="absolute top-0 right-0 m-4">
              <img
                src="/Icons/cross.png"
                alt="Close"
                className="w-8 h-8 cursor-pointer"
                onClick={handleCloseModal1}
              />
            </div>
            <h2 className="text-3xl font-semibold text-center mb-8">
              Social Media
            </h2>

            <form onSubmit={handleSubmit}>
              <h2 className="relative mt-5">Facebook</h2>
              <div className="-mt-10">
                <div className="bg-gray-800 relative rounded-l-md top-12 w-10 h-10 flex items-center justify-center mr-4 py-2 px-2">
                  <img
                    src="/facebook1.png"
                    alt="Facebook Icon"
                    className="w-4/5 h-auto"
                  />
                </div>
                <input
                  type="text"
                  value={Facebook}
                  onChange={handleFacebookChange}
                  className="text-white relative bottom-2 py-4 h-6 rounded-tr-lg rounded-br-lg border-none text-lg bg-gray-800 w-11/12 ml-14"
                />
              </div>
              <h2 className="relative mt-5">Twitter</h2>
              <div className="-mt-10">
                <div className="bg-gray-800 relative rounded-l-md top-12 w-10 h-10 flex items-center justify-center mr-4 py-2 px-2">
                  <img
                    src="/twitter-x1.png"
                    alt="Twitter Icon"
                    className="w-4/5 h-auto"
                  />
                </div>
                <input
                  type="text"
                  value={Twitter}
                  onChange={handleTwitterChange}
                  className="text-white relative bottom-2 py-4 h-6 rounded-tr-lg rounded-br-lg border-none text-lg bg-gray-800 w-11/12 ml-14"
                />
              </div>

              <h2 className="relative mt-5">Instagram</h2>
              <div className="-mt-10">
                <div className="bg-gray-800 relative rounded-l-md top-12 w-10 h-10 flex items-center justify-center mr-4 py-2 px-2">
                  <img
                    src="/instagram1.png"
                    alt="Instagram Icon"
                    className="w-4/5 h-auto"
                  />
                </div>
                <input
                  type="text"
                  value={Instagram}
                  onChange={handleInstagramChange}
                  className="text-white relative bottom-2 py-4 h-6 rounded-tr-lg rounded-br-lg border-none text-lg bg-gray-800 w-11/12 ml-14"
                />
              </div>

              <h2 className="relative mt-5">Pinterest</h2>
              <div className="-mt-10">
                <div className="bg-gray-800 relative rounded-l-md top-12 w-10 h-10 flex items-center justify-center mr-4 py-2 px-2">
                  <img
                    src="/pinterest1.png"
                    alt="Pinterest Icon"
                    className="w-4/5 h-auto"
                  />
                </div>
                <input
                  type="text"
                  value={Pinterest}
                  onChange={handlePinterestChange}
                  className="text-white relative bottom-2 py-4 h-6 rounded-tr-lg rounded-br-lg border-none text-lg bg-gray-800 w-11/12 ml-14"
                />
              </div>
              <h2 className="relative mt-5">Tiktok</h2>
              <div className="-mt-10">
                <div className="bg-gray-800 relative rounded-l-md top-12 w-10 h-10 flex items-center justify-center mr-4 py-2 px-2">
                  <img
                    src="/tiktok1.png"
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

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
                  onClick={handleCloseModal1}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-800 transition duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default EditProfile;

import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import axios from "axios";
import CountryProfile from "./CountryDropdownProfile";
import AvatarEditor from "react-avatar-editor";

// Define the Props interface
interface Props {
  onClose: () => void;
}

const EditProfile: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    country: "",
    facebook: "",
    twitter: "",
    instagram: "",
    tiktok: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [croppedAvatarPreview, setCroppedAvatarPreview] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [showSocialMediaModal, setShowSocialMediaModal] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const editorRef = useRef<AvatarEditor | null>(null);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setIsCropModalOpen(true);
    }
  };

  const handleBannerChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setBannerFile(file);
      await uploadBanner(file);
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      await axios.post(
        "https://api.artwishcreation.com/api/profile/upload-avatar",
        formData,
        { withCredentials: true }
      );
      alert("Avatar uploaded successfully!");
      setIsCropModalOpen(false); // Close cropping modal after upload
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload avatar. Please try again.");
    }
  };

  const uploadBanner = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("banner", file);

      await axios.post(
        "https://api.artwishcreation.com/api/profile/upload-banner",
        formData,
        { withCredentials: true }
      );
      alert("Banner uploaded successfully!");
    } catch (error) {
      console.error("Error uploading banner:", error);
      alert("Failed to upload banner. Please try again.");
    }
  };

  const handleAvatarCropSave = async () => {
    if (editorRef.current && avatarFile) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImageUrl = canvas.toDataURL("image/jpeg");
      setCroppedAvatarPreview(croppedImageUrl);

      // Convert data URL to blob
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      const croppedImageFile = new File([blob], avatarFile.name, {
        type: avatarFile.type,
      });

      await uploadAvatar(croppedImageFile);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "https://api.artwishcreation.com/api/profile/update-profile",
        formData,
        { withCredentials: true }
      );

      console.log("Profile updated:", response.data);
      setIsModalOpen(false);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://api.artwishcreation.com/api/profile/me",
          { withCredentials: true }
        );
        if (response.data && response.data.data) {
          const profile = response.data.data;
          setProfileData(profile);
          setFormData({
            username: profile.username || "",
            name: profile.name || "",
            bio: profile.bio || "",
            country: profile.country || "",
            facebook: profile.facebook || "",
            twitter: profile.twitter || "",
            instagram: profile.instagram || "",
            tiktok: profile.tiktok || "",
          });
        } else {
          console.error(
            "Profile data not found in the response:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching the profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
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

      {/* Main Modal */}
      {isModalOpen && !isCropModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 w-1/2 max-h-full overflow-y-auto p-8 rounded-xl shadow-lg text-white relative transform transition-transform duration-300 ease-out">
            <div className="absolute top-0 right-0 m-4">
              <img
                src="/Icons/cross.png"
                alt="Close"
                className="w-8 h-8 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <h2 className="text-3xl font-semibold text-center mb-8">
              Edit Profile
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-lg font-medium">Avatar:</label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleAvatarChange}
                  className="w-full p-2 mt-4 border border-gray-600 rounded-lg bg-gray-700 text-white"
                />
                <p className="text-gray-400 mt-1">
                  Only .jpg, .jpeg, .png files are allowed.
                </p>
                {croppedAvatarPreview && (
                  <img
                    src={croppedAvatarPreview}
                    alt="Cropped Avatar Preview"
                    className="mt-4 w-32 h-32 object-cover rounded-full"
                  />
                )}
              </div>

              <div className="mb-6">
                <label className="block text-lg font-medium">Banner:</label>
                {bannerPreview && (
                  <img
                    src={bannerPreview}
                    alt="Banner Preview"
                    className="mb-4 w-full max-h-[180px] object-cover rounded"
                  />
                )}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleBannerChange}
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                />
                <p className="text-gray-400 mt-1">
                  Only .jpg, .jpeg, .png files are allowed.
                </p>
              </div>

              <div className="mb-6">
                <label htmlFor="name" className="block text-lg font-medium">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="username" className="block text-lg font-medium">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 resize-none"
                />
              </div>
              <div className="mb-6">
                <CountryProfile
                  setCountry={(countryValue) =>
                    setFormData({ ...formData, country: countryValue })
                  }
                />
              </div>

              <div className="mb-6">
                <button
                  type="button"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-200"
                  onClick={() => setShowSocialMediaModal(true)}
                >
                  Add Your Social Media
                </button>
              </div>

              <div className="flex justify-between mt-6">
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

      {/* Crop Modal */}
      {isCropModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-60">
          <div className="bg-gradient-to-b from-gray-700 to-gray-900 p-8 rounded-xl shadow-lg text-white relative">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Crop Avatar
            </h2>
            {avatarFile && (
              <AvatarEditor
                ref={editorRef}
                image={avatarFile}
                width={250}
                height={250}
                border={50}
                borderRadius={125}
                scale={1.5}
                className="mx-auto"
              />
            )}
            <div className="flex justify-around mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                onClick={() => setIsCropModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                onClick={handleAvatarCropSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;

import React, { useState, useEffect } from "react";
import ImageModal from "./ImageModal";
import styles from "./SeeAllImagesModal.module.css";

interface Image {
  id: number;
  url: string;
}

const SeeAllImagesModal: React.FC = () => {
  const [visibleImages, setVisibleImages] = useState<Image[]>([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");

  const fetchImages = async () => {
    try {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=1&limit=100"
      );
      const data = await response.json();
      const allImages: Image[] = data.map((img: any) => ({
        id: img.id,
        url: img.download_url, // Use the download URL to get the original size
      }));
      setVisibleImages(allImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <div className="flex mt-3">
      <div className="mx-auto">
        <div className={styles.masonry}>
          {visibleImages.map((image) => (
            <div
              key={image.id}
              className={styles["masonry-item"]}
              onClick={() => handleImageClick(image.url)}
            >
              <img src={image.url} alt={`Artwork ${image.id}`} />
            </div>
          ))}
        </div>

        {isImageModalOpen && (
          <ImageModal
            imageUrl={selectedImageUrl}
            onClose={handleCloseImageModal}
          />
        )}
      </div>
    </div>
  );
};

export default SeeAllImagesModal;

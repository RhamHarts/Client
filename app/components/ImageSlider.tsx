import { useState, useEffect } from "react";
import styles from "./ImageSlider.module.css";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const intervalTime = 3000; // Interval waktu dalam milidetik
  let intervalId: NodeJS.Timeout | null = null;

  const fetchImages = async () => {
    try {
      const response = await fetch(
        "https://api.unsplash.com/photos/?client_id=uAKQAK_KPSjI75nLFZBmmVtmgkf8zGSMZ7wAZHvrH1U"
      );
      const data = await response.json();
      const imageUrls = data.map(
        (image: any) => `${image.urls.regular}?w=530&h=300`
      );
      console.log("Images:", imageUrls);
      setImages(imageUrls);
      startAutoSlide();
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Fungsi untuk memulai auto slide
  const startAutoSlide = () => {
    stopAutoSlide(); // Hentikan auto slide jika sedang berjalan
    if (images.length > 0 && images.length > 1) {
      intervalId = setInterval(nextSlide, intervalTime);
    }
  };

  // Fungsi untuk menghentikan auto slide
  const stopAutoSlide = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  // Memulai auto slide ketika komponen dimount
  useEffect(() => {
    fetchImages();
    startAutoSlide();
    // Membersihkan interval saat komponen di-unmount
    return () => stopAutoSlide();
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto border-solid border-4 border-gray-600">
      <img
        onClick={prevSlide}
        className="absolute rotate-180 left-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer w-12 h-12"
        src="/arrow.svg"
        alt="arrow"
      />
      <img
        className="max-w-[512px] max-h-[512px] w-full object-contain  my-5 "
        src={images[currentIndex]} // Gunakan URL gambar dari state images
        alt={`Slide ${currentIndex}`}
      />
      <img
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer w-12 h-12"
        src="/arrow.svg"
        alt="arrow"
      />
      <div className="relative bottom-14 left-[340px] transform -translate-x-1/2 flex">
        {images.map((_, index) => (
          <span
            key={index}
            className={`${"w-3 h-3 bg-black bg-opacity-50 rounded-full mx-3 cursor-pointer"} ${
              index === currentIndex ? "bg-red-500" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;

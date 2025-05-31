import { useRef } from "react";
import { PiImageSquareLight } from "react-icons/pi";
import { usePhotoBooth } from "../../context/PhotoBoothProvider";

const ImageSelector = () => {
  const fileInputRef = useRef(null);
  const { selectedImage, setSelectedImage } = usePhotoBooth();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className="border border-gray-300 p-3 rounded-md flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
        onClick={handleButtonClick}
        type="button"
      >
        <PiImageSquareLight size={20} />
        <span>{selectedImage ? "Change Image" : "Upload Image"}</span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected preview"
          className="w-12 h-12 object-cover rounded shadow border"
        />
      )}
    </div>
  );
};

export default ImageSelector;
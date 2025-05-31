import { usePhotoBooth } from "../../context/PhotoBoothProvider";

const MobileCapturedImages = () => {
  const { capturedImages, aspect } = usePhotoBooth();

  return (
    <div className="mt-4 lg:hidden flex items-center justify-center w-full overflow-x-auto">
      <div className="flex items-center gap-2">
        {capturedImages.map((image, index) => (
          <img
            src={image}
            key={image}
            alt={`Captured ${index + 1}`}
            className={`w-[136px] mb-2 object-cover rounded-lg shadow aspect-[${aspect}] scale-x-[-1]`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileCapturedImages;

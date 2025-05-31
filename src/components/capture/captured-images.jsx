import { usePhotoBooth } from '../../context/PhotoBoothProvider';

const CapturedImages = () => {
  const { capturedImages, aspect } = usePhotoBooth();

  return (
    <div className="mt-4 w-[136px] max-lg:hidden">
      <div className="flex flex-col">
        {capturedImages.map((image, index) => (
          <img
            src={image}
            key={image}
            alt={`Captured ${index + 1}`}
            className={`w-full mb-2 object-cover rounded-lg shadow aspect-[${aspect}] scale-x-[-1]`}
          />
        ))}
      </div>
    </div>
  );
};

export default CapturedImages;

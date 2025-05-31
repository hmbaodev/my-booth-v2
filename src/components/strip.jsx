import { usePhotoBooth } from "../context/PhotoBoothProvider";

const Strip = ({ stripColor, capturedImages }) => {
  const { stripWidth, aspect, displayMode } = usePhotoBooth();

  return (
    <div
      className={`border shadow p-4 flex flex-col items-center relative`}
      style={{ width: stripWidth, backgroundColor: stripColor }}
    >
      <div className={displayMode}>
        {capturedImages.map((img, idx) => (
          <div
            key={idx}
            className="w-full"
            style={{
              borderRadius: 12,
            }}
          >
            <img
              src={img}
              alt={`Captured ${idx + 1}`}
              className={`w-full aspect-[${aspect}] object-cover mirror-image`}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 text-center w-full">
        <div className="font-semibold text-sm">BeautyPlus Photo Booth</div>
        <div className="text-xs mt-1">&copy; 2025 BP</div>
      </div>
    </div>
  );
};

export default Strip;

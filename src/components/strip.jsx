import { useEffect, useState } from "react";
import { usePhotoBooth } from "../context/PhotoBoothProvider";

const Strip = ({ stripColor, capturedImages }) => {
  const { stripWidth, aspect, displayMode, selectedFrame } = usePhotoBooth();
  const [concept, setConcept] = useState({
    bg: "",
    sticker: "",
  });

  useEffect(() => {
    switch (selectedFrame.id) {
      case "4-vertical":
        setConcept({
          bg: "/vertical/bg.png",
          sticker: "/vertical/sticker.png",
        });
        break;
      case "4-grid":
        setConcept({
          bg: "/grid/bg.png",
          sticker: "/grid/sticker.png",
        });
        break;
      default:
        setConcept({
          bg: "/vertical/bg.png",
          sticker: "/vertical/sticker.png",
        });
        break;
    }
  }, [selectedFrame]);

  return (
    <div
      className="border shadow p-4 flex flex-col items-center relative"
      style={{ width: stripWidth, backgroundColor: stripColor }}
    >
      <div className={displayMode}>
        {capturedImages.map((img, idx) => (
          <div
            key={idx}
            className="w-full z-[2]"
            style={{
              borderRadius: 12,
            }}
          >
            <img
              src={img}
              alt={`Captured ${idx + 1}`}
              className={`w-full aspect-[${aspect}] object-cover mirror-image z-[2]`}
            />
          </div>
        ))}
      </div>
      <div
        className="mt-3 text-center w-full"
        style={{
          visibility: "hidden",
        }}
      >
        <div className="font-semibold text-sm">BeautyPlus Photo Booth</div>
        <div className="text-xs mt-1">&copy; 2025 BP</div>
      </div>
      {/* Bg Gradient */}
      <div
        className="absolute left-0 top-0 w-full h-full z-[1]"
        style={{
          backgroundImage: `url(${concept.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Sticker */}
      <div
        className="absolute left-0 top-0 w-full h-full z-[3]"
        style={{
          backgroundImage: `url(${concept.sticker})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
};

export default Strip;

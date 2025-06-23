import { useState, useEffect } from "react";
import { usePhotoBooth } from "../context/PhotoBoothProvider";

const StripV2 = ({ capturedImages, stripColor, showFrame }) => {
  const { displayMode, selectedFrame, aspect, stripWidth } = usePhotoBooth();
  const [concept, setConcept] = useState({
    bg: "",
    sticker: "",
  });

  useEffect(() => {
    switch (selectedFrame.id) {
      case "4-vertical":
        setConcept({
          bg: "/vertical/bg.svg",
          sticker: "/vertical/sticker.svg",
        });
        break;
      case "4-grid":
        setConcept({
          bg: "/grid/bg.svg",
          sticker: "/grid/sticker.svg",
        });
        break;
      default:
        setConcept({
          bg: "/vertical/bg.svg",
          sticker: "/vertical/sticker.svg",
        });
        break;
    }
  }, [selectedFrame]);

  return (
    <div className="relative p-4 shadow bg-red-500">
      <div
        className={`${displayMode}`}
        style={{
          // backgroundColor: stripColor,
          width: stripWidth,
        }}
      >
        {capturedImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Captured ${idx + 1}`}
            className={`w-full aspect-[${aspect}] object-cover mirror-image z-[2]`}
          />
        ))}
      </div>
      <div
        className={`mt-3 text-center w-full ${
          showFrame ? "invisible" : "visible"
        }`}
      >
        <p className="font-semibold text-sm">ChekkiCam</p>
        <p
          className="text-xs mt-1"
          style={{
            lineHeight: 1,
          }}
        >
          &copy; 2025 BP
        </p>
      </div>
      {concept.bg && (
        <img
          src={concept.bg}
          alt=""
          className="absolute left-0 top-0 w-full h-full z-[1] object-cover"
          loading="eager"
        />
      )}
      {concept.sticker && (
        <img
          src={concept.sticker}
          alt=""
          className="absolute left-0 top-0 w-full h-full z-[3] object-cover"
          loading="eager"
        />
      )}
    </div>
  );
};

export default StripV2;

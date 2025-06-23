import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { FaDownload } from "react-icons/fa";

import { usePhotoBooth } from "../context/PhotoBoothProvider";
import Strip from "../components/strip";

const customColors = [
  "#FF69B4",
  "#fff",
  "#000",
  "#FECACA",
  "#FDE68A",
  "#A7F3D0",
  "#BFDBFE",
  "#E9D5FF",
  "#F9A8D4",
  "#FDBA74",
  "#C4B5FD",
  "#6EE7B7",
  "#93C5FD",
  "#FCD34D",
  "#FCA5A5",
  "#DDD6FE",
  "#FECDD3",
];

const ExportStrip = () => {
  const { capturedImages } = usePhotoBooth();
  const [stripColor, setStripColor] = useState("#FFFFFF");
  const [hasFrame, setHasFrame] = useState(false);

  const stripRef = useRef(null); // 📌 Add ref to the strip

  // 📥 Download function using html2canvas
  const handleDownload = async () => {
    if (!stripRef.current) return;

    // Step 1: Temporarily remove mirror effect
    const mirroredImages = stripRef.current.querySelectorAll(".mirror-image");
    mirroredImages.forEach((img) => {
      img.style.setProperty("transform", "scaleX(-1)", "important");
    });

    try {
      const canvas = await html2canvas(stripRef.current, {
        useCORS: true,
        backgroundColor: null,
        scale: 3,
      });

      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;

      const now = new Date();
      const formattedDateTime = now
        .toISOString()
        .replace(/T/, "_")
        .replace(/:/g, "-")
        .replace(/\..+/, "");

      link.download = `photo-strip_${formattedDateTime}.png`;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      // Step 2: Reapply mirror effect
      mirroredImages.forEach((img) => {
        img.style.setProperty("transform", "scaleX(-1)", "important");
      });
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-12  lg:h-[80vh]">
      {/* Photo Strip */}
      <div ref={stripRef}>
        <Strip
          stripColor={hasFrame ? "transparent" : stripColor}
          capturedImages={capturedImages}
          showFrame={hasFrame}
        />
        {/* custom background goes here */}
      </div>

      {/* Right Panel */}
      <div className="flex flex-col items-center gap-8">
        <div>
          <p className="mb-4 font-medium text-center">
            Bạn có chọn nền khung không?
          </p>
          <div className="flex items-center justify-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="select-frame"
                value="true"
                checked={hasFrame === true}
                onChange={() => setHasFrame(true)}
              />
              <span>Có</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="select-frame"
                value="false"
                checked={hasFrame === false}
                onChange={() => setHasFrame(false)}
              />
              <span>Không</span>
            </label>
          </div>
        </div>

        {/* Frame Color Selector */}
        {!hasFrame && <div>
          <p className="mb-4 font-medium text-center">Chọn màu khung</p>
          <div className="grid grid-cols-8 gap-2">
            {/* Custom color picker */}
            <label
              className={`w-7 h-7 cursor-pointer flex items-center justify-center`}
            >
              <input
                type="color"
                value={stripColor}
                onChange={(e) => {
                  setStripColor(e.target.value);
                }}
                className="opacity-0 absolute w-7 h-7"
                style={{ cursor: "pointer" }}
              />
              <img src="/custom-color.png" alt="" />
            </label>
            {customColors.map((color) => (
              <button
                key={color}
                className={`w-7 h-7 rounded-full border-2 ${
                  stripColor === color ? "border-pink-500" : "border-black"
                }`}
                style={{ background: color }}
                onClick={() => setStripColor(color)}
              />
            ))}
          </div>
        </div>}

        {/* Download/Retake Buttons */}
        <div className="flex gap-4">
          <button
            className="px-4 py-2 rounded-full border border-black hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            onClick={handleDownload}
          >
            <FaDownload size={20} />
            <span>Tải hình về</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportStrip;

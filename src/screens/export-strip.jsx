import { useState, useRef } from "react";
import html2canvas from "html2canvas";

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
  // Add more colors as needed
];

const ExportStrip = () => {
  const { capturedImages } = usePhotoBooth();
  const [stripColor, setStripColor] = useState("#FFFFFF"); // Default custom color

  const stripRef = useRef(null); // 📌 Add ref to the strip

  // 📥 Download function using html2canvas
  const handleDownload = async () => {
    if (!stripRef.current) return;

    // Step 1: Temporarily remove mirror effect
    const mirroredImages = stripRef.current.querySelectorAll(".mirror-image");
    mirroredImages.forEach((img) => {
      img.style.setProperty('transform', 'scaleX(-1)', 'important');
    });

    try {
      const canvas = await html2canvas(stripRef.current, {
        useCORS: true,
        backgroundColor: null,
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
        img.style.setProperty('transform', 'scaleX(-1)', 'important');
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
      {/* Photo Strip */}
      <div ref={stripRef}>
        {/* <div
          className={`border shadow p-4 flex flex-col items-center relative`}
          style={{ width: 200, backgroundColor: stripColor || "#ffffff" }}
        >
          <div className="flex flex-col gap-2">
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
                  className="w-full aspect-[4/3] object-cover mirror-image"
                />
              </div>
            ))}
          </div>
          <div className="mt-3 text-center w-full">
            <div className="font-semibold text-sm">BeautyPlus Photo Booth</div>
            <div className="text-xs mt-1">&copy; 2025 BP</div>
          </div>
        </div> */}
        <Strip stripColor={stripColor} capturedImages={capturedImages} />
        {/* custom background goes here */}
      </div>

      {/* Right Panel */}
      <div className="flex flex-col items-center gap-8">
        {/* Frame Color Selector */}
        <div>
          <div className="mb-2 text-sm font-medium text-center">
            Frame color
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
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
            <hr className="w-[2px] h-7 bg-gray-300" />
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
        </div>

        {/* Download/Retake Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            className="px-8 py-3 bg-pink-500 text-white rounded-full font-semibold text-lg shadow hover:bg-pink-600 transition"
          >
            Download
          </button>
        </div>

        {/* Branding and QR */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="text-pink-500 font-medium text-center">
            Get the app for endless frames,
            <br />
            stickers, filters, and retouching tools!
          </div>
          <img
            src="/path/to/your/qr-code.png"
            alt="QR Code"
            className="w-24 h-24 mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ExportStrip;

import { createContext, useContext, useState, useEffect } from "react";

import { frameOptions } from "../utils/frameOptions";
import { delayOptions } from "../utils/delayOptions";

const PhotoBoothContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePhotoBooth = () => {
  const context = useContext(PhotoBoothContext);
  if (!context) {
    throw new Error("usePhotoBooth must be used within a PhotoBoothProvider");
  }
  return context;
};

export const PhotoBoothProvider = ({ children }) => {
  const [selectedFrame, setSelectedFrame] = useState(frameOptions[0]);
  const [selectedDelay, setSelectedDelay] = useState(delayOptions[0]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [stripWidth, setStripWidth] = useState(0);
  const [displayMode, setDisplayMode] = useState("flex flex-col gap-2");
  const [aspect, setAspect] = useState("1/0.75");

  useEffect(() => {
    if (selectedFrame) {
      switch (selectedFrame.id) {
        case "4-vertical":
          setAspect("1/0.75");
          setStripWidth(200);
          setDisplayMode("flex flex-col gap-2");
          break;
        case "4-grid":
          setAspect("0.9/1");
          setStripWidth(360);
          setDisplayMode("grid grid-cols-2 gap-4");
          break;
        default:
          setAspect("1/0.75");
          setStripWidth(200);
          setDisplayMode("flex flex-col gap-2");
          break;
      }
    }
  }, [selectedFrame]);

  const value = {
    selectedFrame,
    setSelectedFrame,
    selectedDelay,
    setSelectedDelay,
    selectedImage,
    setSelectedImage,
    capturedImages,
    setCapturedImages,
    aspect,
    setAspect,
    stripWidth,
    setStripWidth,
    displayMode,
    setDisplayMode,
  };

  return (
    <PhotoBoothContext.Provider value={value}>
      {children}
    </PhotoBoothContext.Provider>
  );
};

import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCameraAlt } from "react-icons/md";
import Webcam from "react-webcam";

import Selectors from "../selectors";
import { usePhotoBooth } from "../../context/PhotoBoothProvider";

const Cam = () => {
  const webcamRef = useRef(null);
  const {
    capturedImages,
    setCapturedImages,
    selectedDelay,
    selectedFrame: { amount_of_images },
    aspect,
  } = usePhotoBooth();

  const [isAutoCapturing, setIsAutoCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null); // null = not counting down

  const navigate = useNavigate();

  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImages((prevImages) => [...prevImages, imageSrc]);
    }
  }, [setCapturedImages]);

  useEffect(() => {
    if (!isAutoCapturing) return;

    let count = 0;

    const startNextCountdown = () => {
      let timer = selectedDelay;
      setCountdown(timer);

      const countdownInterval = setInterval(() => {
        timer -= 1;
        if (timer > 0) {
          setCountdown(timer);
        } else {
          clearInterval(countdownInterval);
          setCountdown(null);

          // ✅ Add 300ms delay after countdown before capturing
          setTimeout(() => {
            capture();
            count++;
            if (count < amount_of_images) {
              startNextCountdown();
            } else {
              setIsAutoCapturing(false);
            }
          }, 300);
        }
      }, 1000);
    };

    startNextCountdown();

    return () => {
      setCountdown(null);
      setIsAutoCapturing(false);
    };
  }, [isAutoCapturing, selectedDelay, amount_of_images, capture]);

  const handleAutoCapture = () => {
    setCapturedImages([]); // Clear previous images
    setIsAutoCapturing(true);
  };

  return (
    <div className="flex w-full flex-col items-center md:max-w-lg">
      <Selectors />
      <div className="relative w-full max-w-md mt-4">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/png"
          className={`relative scale-x-[-1] rounded-md border-2 border-black object-cover`}
          videoConstraints={{
            aspectRatio:
              parseFloat(aspect.split("/")[0]) /
              parseFloat(aspect.split("/")[1]),
          }}
        />
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white flex items-center justify-center rounded-full bg-black/40 aspect-square p-2">
              <span className="text-lg font-bold">{countdown}</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => {
            if (capturedImages.length === amount_of_images) {
              navigate("/export-strip");
              return;
            }

            handleAutoCapture();
          }}
          className="px-4 py-2 rounded-full border border-black hover:bg-gray-100 flex items-center gap-2"
        >
          <MdOutlineCameraAlt size={20} />
          <span>Capture</span>
        </button>
      </div>
    </div>
  );
};

export default Cam;

import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCameraAlt } from "react-icons/md";

import Selectors from "../selectors";
import { usePhotoBooth } from "../../context/PhotoBoothProvider";

const CamNoLib = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const {
    capturedImages,
    setCapturedImages,
    selectedDelay,
    selectedFrame: { amount_of_images },
    aspect,
  } = usePhotoBooth();

  const [isAutoCapturing, setIsAutoCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const navigate = useNavigate();

  const isMobile = window.innerWidth < 768;

  const setupCamera = async () => {
    try {
      const aspectRatio = isMobile
        ? parseFloat(aspect.split("/")[1]) / parseFloat(aspect.split("/")[0])
        : parseFloat(aspect.split("/")[0]) / parseFloat(aspect.split("/")[1]);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { aspectRatio, facingMode: "user" },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      streamRef.current = stream;
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
  };

  useEffect(() => {
    setupCamera();
    return () => stopCamera();
  }, [aspect]);

  const capture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    context.drawImage(video, 0, 0, width, height);
    const image = canvas.toDataURL("image/png");

    if (image) {
      setCapturedImages((prevImages) => [...prevImages, image]);
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
    setCapturedImages([]);
    setIsAutoCapturing(true);
  };

  return (
    <div className="flex w-full flex-col items-center md:max-w-lg">
      <Selectors />
      <div className="relative w-full max-w-md mt-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="relative scale-x-[-1] rounded-md border-2 border-black object-cover w-full"
        />
        <canvas ref={canvasRef} className="hidden" />

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
          disabled={
            isAutoCapturing
          }
          onClick={() => {
            if (capturedImages.length === amount_of_images) {
              navigate("/export-strip");
              return;
            }
            handleAutoCapture();
          }}
          className="px-4 py-2 rounded-full border border-black hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
        >
          <MdOutlineCameraAlt size={20} />
          <span>{capturedImages.length === amount_of_images ? "Xuất khung" : "Chụp tự động"}</span>
        </button>
      </div>
    </div>
  );
};

export default CamNoLib;

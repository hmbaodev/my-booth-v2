import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/navbar";
import Booth from "./screens/booth";
import ExportStrip from "./screens/export-strip";
import { usePhotoBooth } from "./context/PhotoBoothProvider";

const App = () => {
  const { capturedImages } = usePhotoBooth();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (capturedImages.length > 0) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [capturedImages]);

  return (
    <>
      <Navbar />
      <div className="pt-8 lg:pt-12 px-[10px]">
        <Routes>
          <Route path="/" element={<Booth />} />
          <Route path="/export-strip" element={<ExportStrip />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

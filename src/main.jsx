import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { PhotoBoothProvider } from "./context/PhotoBoothProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PhotoBoothProvider>
        <App />
      </PhotoBoothProvider>
    </BrowserRouter>
  </StrictMode>
);

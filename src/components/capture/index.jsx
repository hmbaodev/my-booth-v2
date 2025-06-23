import QrCode from "./qr-code";
// import Cam from "./cam";
import CapturedImages from "./captured-images";
import MobileCapturedImages from "./mobile-captured-images";
import CamNoLib from "./cam-no-lib";

const Capture = () => {
  return (
    <div className="mt-6 flex items-center justify-center flex-col">
      <div className="flex items-start">
        {/* QR code link to instagram */}
        <QrCode />
        {/* Web cam */}
        {/* <Cam /> */}
        <CamNoLib />
        {/* captured images */}
        <CapturedImages />
      </div>
      <MobileCapturedImages />
    </div>
  );
};

export default Capture;

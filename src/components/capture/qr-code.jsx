import { BsQrCode } from "react-icons/bs";

const QrCode = () => {
  return (
    <div className="lg:flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow w-fit mx-auto mt-10 hidden opacity-0">
      <p className="text-sm text-gray-700 font-medium mb-1 text-center">
        Scan the QR code to
        <br /> connect to Instagram
      </p>
      <BsQrCode className="w-24 h-24 text-gray-800" />
    </div>
  );
};

export default QrCode;

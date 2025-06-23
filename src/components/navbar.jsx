import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-100">
      <Link to="/" className="text-2xl font-bold pointer-cursor">ChekkiCam</Link>
      <div>
        <button>
          <Link to="/">Chụp ảnh</Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-pink-100">
      <h1 className="text-2xl font-bold">PhotoBooth</h1>
      <div>
        <button>
          <Link to="/">Home</Link>
        </button>
        <button>
          <Link to="/booth">Booth</Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

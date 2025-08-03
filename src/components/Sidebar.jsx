import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    onClose?.(); // close sidebar after logout
    navigate("/login");
  };


  return (
   <div className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0  border-r p-4">
      <Link to="/profile" className="flex items-center space-x-3 mb-8">
        <FaUserCircle className="text-red-600 text-3xl" />
        <span className="font-semibold text-red-600">Your Name</span>
      </Link>

      <nav className="flex flex-col space-y-4 text-lg">
        <Link to="/feed" onClick={onClose} className="hover:text-red-500">🏠 Home</Link>
        <Link to="/explore" onClick={onClose} className="hover:text-red-500">🔥 Explore</Link>
        <Link to="/notifications" onClick={onClose} className="hover:text-red-500">🔔 Notifications</Link>
      </nav>

      <button onClick={handleLogout} className="mt-96 text-left hover:text-red-500">
          🚪 Log Out
        </button>
    </div>
  );
};


export default Sidebar;

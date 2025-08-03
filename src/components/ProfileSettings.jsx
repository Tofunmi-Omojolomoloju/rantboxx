// components/ProfileSettings.jsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const ProfileSettings = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Profile Settings</h2>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          🚪 Log Out
        </button>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;

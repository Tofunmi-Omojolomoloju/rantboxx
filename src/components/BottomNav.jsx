import { NavLink } from "react-router-dom";
import { FiHome, FiSearch, FiPlusCircle, FiBell, FiUser } from "react-icons/fi";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t shadow-md z-50 md:hidden">
      <div className="flex justify-between items-center px-4 py-2">
        <NavLink
          to="/feed"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${isActive ? "text-red-600" : "text-gray-600"}`
          }
        >
          <FiHome size={22} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${isActive ? "text-red-600" : "text-gray-600"}`
          }
        >
          <FiSearch size={22} />
          <span>Explore</span>
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm -mt-6 ${isActive ? "text-red-600" : "text-gray-600"}`
          }
        >
          <FiPlusCircle size={40} className="bg-white rounded-full p-1 shadow-lg" />
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${isActive ? "text-red-600" : "text-gray-600"}`
          }
        >
          <FiBell size={22} />
          <span>Alerts</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${isActive ? "text-red-600" : "text-gray-600"}`
          }
        >
          <FiUser size={22} />
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;

import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import { FaBars } from "react-icons/fa";

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowSidebar(false);
      }
    };

    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

  return (
    <div className="flex min-h-screen bg-red-50 relative">
      {/* Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-black bg-opacity-90 text-white z-20 transform transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setShowSidebar(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="hidden md:flex items-center justify-between px-4 py-3 text-red-600 shadow-sm">
          <button onClick={() => setShowSidebar(true)} className="text-2xl">
            <FaBars />
          </button>
          <h1 className="text-lg font-semibold">RantBox</h1>
        </div>

        {/* Page content */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;

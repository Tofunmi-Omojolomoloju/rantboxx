// src/pages/RantFeed.jsx
import { useState } from "react";
import RantList from "../components/RantList";
import { Link } from "react-router-dom";


const RantFeed = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between mb-4 border-b">
        {["all", "following", "trending"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-1/3 p-2 font-semibold capitalize ${
              activeTab === tab ? "border-b-4 border-blue-500" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <RantList type={activeTab} />

      <Link
        to="/create"
        className=" hidden md:block fixed bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full shadow"
      >
        + Add rant
      </Link>
    </div>
  );
};

export default RantFeed;

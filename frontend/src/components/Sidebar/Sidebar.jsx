import React from "react";

// Sidebar.jsx
const Sidebar = () => {
  return (
    <aside className="bg-indigo-700 text-white w-56 h-full p-4 flex flex-col gap-4">
      <a href="#" className="hover:bg-indigo-500 p-2 rounded">
        Dashboard
      </a>
      <a href="#" className="hover:bg-indigo-500 p-2 rounded">
        Profile
      </a>
      <a href="#" className="hover:bg-indigo-500 p-2 rounded">
        Settings
      </a>
    </aside>
  );
};

export default Sidebar;

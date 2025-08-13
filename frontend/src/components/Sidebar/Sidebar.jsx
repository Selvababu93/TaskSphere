import React from "react";
import {
  LayoutDashboard,
  Settings,
  Users,
  LayoutList,
  AlignVerticalJustifyEnd,
} from "lucide-react";

const Sidebar = ({ onSelectPage }) => {
  return (
    <aside className="bg-white w-56 h-full shadow-lg border-r flex flex-col">
      <div className="p-4 font-semibold text-gray-700 border-b">Menu</div>
      <ul className="flex flex-col gap-2 p-4 text-gray-600">
        <li
          onClick={() => onSelectPage("dashboard")}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition"
        >
          <LayoutDashboard size={18} /> Dashboard
        </li>
        <li
          onClick={() => onSelectPage("users")}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition"
        >
          <Users size={18} /> Users
        </li>
        <li
          onClick={() => onSelectPage("tasks")}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition"
        >
          <LayoutList size={18} /> Tasks
        </li>
        <li
          onClick={() => onSelectPage("inventory")}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition"
        >
          <AlignVerticalJustifyEnd size={18} /> Inventory
        </li>
        <li
          onClick={() => onSelectPage("settings")}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition"
        >
          <Settings size={18} /> Settings
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

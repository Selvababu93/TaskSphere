import React, { useContext } from "react";
import {
  LayoutDashboard,
  Settings,
  Users,
  LayoutList,
  AlignVerticalJustifyEnd,
} from "lucide-react";

import { LogOut } from "lucide-react";
import RandomAvatar from "./RandomAvatar";
import { AuthContext } from "../services/AuthContextAPI";

const Sidebar = ({ onSelectPage }) => {
  const { authLogout, currentUsername } = useContext(AuthContext);
  return (
    <aside className="bg-white w-56 h-full shadow-lg border-r flex flex-col">
      <div className="p-4 flex items-center font-semibold text-gray-700 border-b">
        <RandomAvatar />
        <strong>{currentUsername}</strong>
      </div>
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

      <div className="mt-auto">
        <button
          onClick={authLogout}
          className="flex items-center space-x-3 text-red-500 hover:text-red-600 transition"
        >
          <LogOut size={28} />
          <span className="text-md font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

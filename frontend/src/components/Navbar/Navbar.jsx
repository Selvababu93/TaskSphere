import React from "react";
import { Home, FileText, Info } from "lucide-react"; // for icons

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 px-6 h-16 flex items-center justify-between shadow-md">
      {/* Logo */}
      <p className="text-white text-xl font-bold tracking-wide">MySaaS</p>

      {/* Menu */}
      <ul className="flex gap-8 text-white font-medium">
        <li className="flex items-center gap-2 hover:text-indigo-200 cursor-pointer transition">
          <Home size={18} /> Home
        </li>
        <li className="flex items-center gap-2 hover:text-indigo-200 cursor-pointer transition">
          <FileText size={18} /> Blog
        </li>
        <li className="flex items-center gap-2 hover:text-indigo-200 cursor-pointer transition">
          <Info size={18} /> About
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

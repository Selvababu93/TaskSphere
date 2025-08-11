// Navbar.jsx
const Navbar = () => {
  return (
    <nav className="bg-indigo-600 h-20 px-6 flex items-center justify-between text-white font-semibold shadow">
      <p className="text-xl">Logo</p>
      <ul className="flex gap-6">
        <li className="hover:text-gray-200 cursor-pointer">Home</li>
        <li className="hover:text-gray-200 cursor-pointer">Blog</li>
        <li className="hover:text-gray-200 cursor-pointer">About</li>
      </ul>
    </nav>
  );
};

export default Navbar;

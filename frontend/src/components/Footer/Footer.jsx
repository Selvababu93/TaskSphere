import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white h-12 flex items-center justify-center text-sm shadow-inner">
      © {new Date().getFullYear()} MySaaS. All rights reserved.
    </footer>
  );
};

export default Footer;

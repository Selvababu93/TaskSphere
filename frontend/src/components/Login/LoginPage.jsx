import React from "react";
import Login from "./LoginwithAuth";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import LoginForm from "./LoginForm";
import Footer from "../Footer/Footer";

const LoginPage = () => {
  return (
    <div className="bg-gray-200 flex flex-col h-screen">
      <Navbar />
      {/* Main section */}
      <div className="flex flex-1">
        {/* side bar */}

        {/* Login form */}

        <div className="flex flex-1 items-center justify-center p-4">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;

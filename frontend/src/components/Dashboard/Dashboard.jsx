import React from "react";
import Navbar from "../Navbar/Navbar";
import LoginForm from "../Login/LoginForm";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

// Dashboard.jsx
const Dashboard = () => {
  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 items-center justify-center p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

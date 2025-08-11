import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import UsersPage from "../Users/UsersPage";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div>
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <div>
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
                <p className="text-3xl font-bold mt-2">$8,340</p>
                <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
              </div>
            </div>
          </div>
        );
      case "users":
        return (
          <div>
            <h1 className="text-2xl font-bold">Users Management</h1>
            <UsersPage />
          </div>
        );
      case "settings":
        return <h1 className="text-2xl font-bold">Settings</h1>;
      default:
        return <h1 className="text-2xl font-bold">Not Found</h1>;
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onSelectPage={setActivePage} />
        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

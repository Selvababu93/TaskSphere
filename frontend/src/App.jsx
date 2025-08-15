import { React } from "react";
import { Outlet, Route, Router, Routes } from "react-router-dom";
import { AuthContextProvider } from "./components/services/AuthContextAPI";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginPage from "./components/Login/LoginPage";
import ProtectedRoute from "./components/services/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

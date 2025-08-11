import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, authLogin } =
    useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            authLogin(userName, password);
          }}
        >
          {/* Email Field */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email</label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Enter your email"
              className="border-2 px-3 py-2 rounded shadow-sm 
                         hover:border-blue-800 focus:border-blue-800 
                         outline-none transition-colors duration-200"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="border-2 px-3 py-2 rounded shadow-sm 
                         hover:border-blue-800 focus:border-blue-800 
                         outline-none transition-colors duration-200"
            />
          </div>
          {/* Error mesage */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded 
                       hover:bg-blue-900 transition-colors duration-200"
          >
            {loading ? "Signing in.." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContextAPI";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, authLogin } =
    useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <div>
          <h1 className=" text-2xl font-bold mb-6 text-center">Login</h1>

          <form
            action=""
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              authLogin(username, password);
            }}
          >
            <div className="flex flex-col">
              <label className="mb-1" htmlFor="">
                Email
              </label>
              <input
                type="email"
                className="border px-3 py-2 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1" htmlFor="">
                Password
              </label>
              <input
                type="password"
                className="border px-3 py-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-700 text-white w-full mt-2 py-2 rounded hover:bg-indigo-800"
            >
              {loading ? "Signing in...." : "Signin"}
            </button>
          </form>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

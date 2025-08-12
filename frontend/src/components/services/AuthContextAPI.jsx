import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Separate loading/error for add user (optional)
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addUserError, setAddUserError] = useState(null);

  // Separate loading/error for fetch user (optional)
  const [fetchUserLoading, setFetchUserLoading] = useState(false);
  const [fetchUserError, setFetchUserError] = useState(null);

  const authLogin = async (username, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost:8000/auth/login/access-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            username,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();

      // Save token in localStorage for later API calls
      localStorage.setItem("access_token", data.access_token);
      setCurrentUsername(username);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const authAddUser = async (form) => {
    try {
      setAddUserLoading(true);
      setAddUserError(null);

      const response = await fetch("http://localhost:8000/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          is_active: form.is_active,
          is_superuser: form.is_superuser,
          user_name: form.user_name,
          password: form.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid data");
      }

      console.log("User added:", await response.json());
      const data = await response.json();
      console.log("User added:", data);
      return data; // optionally return data
    } catch (error) {
      setAddUserError(error.message);
    } finally {
      setAddUserLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      setFetchUserLoading(true);
      setFetchUserError(null);

      const token = localStorage.getItem("access_token");

      const response = await fetch(
        "http://localhost:8000/user/all",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        // console.log("Error");

        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      // console.log(`Fetched users : ${data}`);
      return data;
    } catch (error) {
      setFetchUserError(error.message);
      return {};
    } finally {
      setFetchUserLoading(false);
    }
  };

  const values = {
    authLogin,
    authAddUser,
    loading,
    error,
    addUserLoading,
    addUserError,
    isAuthenticated,
    fetchAllUsers,
    fetchUserLoading,
    fetchUserError,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

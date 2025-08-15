import { createContext, useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const URL = `http://localhost:8000`;

  const getToken = () => localStorage.getItem("access_token");

  // Separate loading/error for add user (optional)
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addUserError, setAddUserError] = useState(null);

  // Separate loading/error for fetch user (optional)
  const [fetchUserLoading, setFetchUserLoading] = useState(false);
  const [fetchUserError, setFetchUserError] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchCurrentUser(token).then((userData) => {
        if (userData.user_name) {
          setCurrentUserData(userData);
          setIsAuthenticated(true);
        }
      });
    }
  }, []);

  const authLogin = async (username, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();

      // Save token in localStorage for later API calls
      localStorage.setItem("access_token", data.access_token);
      const userData = await fetchCurrentUser(data.access_token);
      setCurrentUserData(userData);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async (token) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${URL}/auth/login/test-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        console.log("Token expired, logging out");
        localStorage.removeItem("access_token");
        setIsAuthenticated(false);
        setCurrentUserData({});
        setCurrentUsername("");
        navigate("/"); // <-- redirect to login
        return {};
      }

      if (!response.ok) {
        throw new Error("Failed to fetch CurrentUserData");
      }

      const data = await response.json();
      setCurrentUsername(data.user_name);
      return data;
    } catch (error) {
      setError(error.message);
      console.log(`Error in fetchCurrentUserData: ${error}`);
      return {};
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      setFetchUserLoading(true);
      setFetchUserError(null);

      const response = await fetch(`${URL}/user/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        console.log(response.status, response.statusText);
        const text = await response.text();
        console.log(text);

        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      // console.log(`Fetched users : ${data}`);
      return data;
    } catch (error) {
      setFetchUserError(error.message);
      console.log(`Error in fetchUsers: ${error.message}`);

      return {};
    } finally {
      setFetchUserLoading(false);
    }
  };

  const authAddUser = async (form) => {
    try {
      setAddUserLoading(true);
      setAddUserError(null);

      const response = await fetch(`${URL}/user/create`, {
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
      const data = await response.json();
      console.log("User added:", data);
      return data; // optionally return data
    } catch (error) {
      setAddUserError(error.message);
    } finally {
      setAddUserLoading(false);
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
    currentUsername,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

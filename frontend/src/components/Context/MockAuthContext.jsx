import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // this for to show current username in welcome page after successfull login
  const [currentUsername, setCurrentUserName] = useState("");
  //   this is to procted te routes
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   for API call
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fake DB
  const userDB = [
    {
      username: "Alice",
      password: "123456",
    },
    {
      username: "bob",
      password: "password1",
    },
  ];

  //   ock post method
  const mockPost = async (inputUsername, inputPassword) => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const foundUser = userDB.find(
        (user) =>
          user.username.toLowerCase() === inputUsername.toLowerCase() &&
          user.password === inputPassword
      );
      if (foundUser) {
        setCurrentUserName(foundUser.username);
        setIsAuthenticated(true);
      } else {
        setError("invalid username and password");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const authLogin = async (username, password) => {
    await mockPost(username, password);
  };

  const values = {
    currentUsername,
    setCurrentUserName,
    authLogin,
    loading,
    error,
    setError,
    isAuthenticated,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

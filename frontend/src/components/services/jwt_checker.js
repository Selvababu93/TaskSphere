import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      return true; // expired
    }
    return false; // still valid
  } catch (e) {
    return true; // invalid token
  }
};

const getToken = () => localStorage.getItem("access_token");

// Usage
const token = getToken();
if (isTokenExpired(token)) {
  console.log("Token expired, logging out");
  //   setIsAuthenticated(false);
  //   localStorage.removeItem("access_token");
}

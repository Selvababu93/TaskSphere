const authLogin = async (username, password) => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8000/login/access-token", {
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
    setCurrentUserName(username);
    setIsAuthenticated(true);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

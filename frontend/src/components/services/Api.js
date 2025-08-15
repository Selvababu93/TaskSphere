let accessToken = localStorage.getItem("access_token") || "";

export function setAccessToken(token) {
  accessToken = token || "";
  if (token) localStorage.setItem("access_token", token);
  else localStorage.removeItem("access_token");
}

async function refreshAccesToken() {
  const res = await fetch("http://localhost:8000/auth/refresh", {
    method: "POST",
    credentials: "include", //send refresh cookie
  });

  if (!res.ok) throw new Error("Refresh failed");
  const data = await res.json();
  setAccessToken(data.accessToken);
  return data.access_token;
}

export async function apiFetch(input, init = {}, retry = true) {
  const headers = new Headers(init.headers || {});
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  const res = await fetch(input, {
    ...init,
    headers,
    credentials: "include", //keep cookies (refresh) available
  });

  if (res.status !== 401) return res;

  // try to refresh only once
  if (!retry) return res;

  try {
    await refreshAccesToken();
    const retryHeaders = new Headers(init.headers || {});
    if (accessToken) retryHeaders.set("Authorization", `Bearer ${accessToken}`);

    return await fetch(input, {
      ...init,
      headers: retryHeaders,
      credentials: "include",
    });
  } catch (error) {
    // refresh failed => logout locally
    setAccessToken("");
    return res; // caller can handle redirect to login
  }
}

import { useState } from "react";
import { Outlet } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <LoginPage /> */}
      {/* <Dashboard /> */}
      <Outlet />
    </div>
  );
}

export default App;

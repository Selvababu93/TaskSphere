import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../services/AuthContextAPI";

const ShowUsers = () => {
  const { fetchAllUsers, fetchUserLoading, fetchUserError } =
    useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users:", err);
      }
    };
    loadUsers();
  }, []);

  if (fetchUserLoading) return <p className="p-4">Loading users...</p>;
  if (fetchUserError === "Could not validate credentials") {
    console.log("you can redirect");
    return <p className="p-4 text-red-500">{fetchUserError}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Active</th>
            <th className="p-2 border">Admin</th>
          </tr>
        </thead>
        <tbody>
          {fetchUserError ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-red-500">
                {fetchUserError}
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id || index}>
                <td className="p-2 border">{user.id}</td>
                <td className="p-2 border">{user.user_name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.is_active ? "✅" : "❌"}</td>
                <td className="p-2 border">
                  {user.is_superuser ? "✅" : "❌"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUsers;

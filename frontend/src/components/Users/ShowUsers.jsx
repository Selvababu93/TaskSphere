import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../services/AuthContextAPI";

const ShowUsers = () => {
  const { fetchAllUsers, loading, error } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchAllUsers();
      setUsers(data);
    };
    loadUsers();
  }, [fetchAllUsers]);

  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

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
          {users.length === 0 ? (
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

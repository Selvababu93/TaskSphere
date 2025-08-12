import React, { useState } from "react";
import AddUserModal from "./AddUserModal";
import ShowUsers from "./ShowUsers";

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveUser = (user) => {
    console.log("User Added:", user);
    // Call API to save user here
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Add User
        </button>
      </div>

      {/* Your users table/list here */}

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
      />

      <ShowUsers />
    </div>
  );
};

export default UsersPage;

import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { AuthContext } from "../services/AuthContextAPI";

const AddUserModal = ({ isOpen, onClose, onSave }) => {
  const { authAddUser, addUserLoading, addUserError } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    is_superuser: false,
    is_active: true,
    role: "User",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await authAddUser(formData);
      onClose();
      // Optionally call onSave(formData) to update parent if needed
    } catch (err) {
      // error is handled in context, optionally show toast here
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New User">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="user_name" // changed to user_name to match formData
            value={formData.user_name}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Status Checkboxes */}
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1">Settings</label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />
            <span>Active</span>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_superuser"
              checked={formData.is_superuser}
              onChange={handleChange}
            />
            <span>Admin</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
            disabled={addUserLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            disabled={addUserLoading}
          >
            {addUserLoading ? "Saving..." : "Save"}
          </button>
        </div>
        {addUserError && (
          <p className="text-red-500 text-sm mt-2">{addUserError}</p>
        )}
      </form>
    </Modal>
  );
};

export default AddUserModal;

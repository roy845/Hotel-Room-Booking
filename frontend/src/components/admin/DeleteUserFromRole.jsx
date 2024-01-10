import React, { useState, useEffect } from "react";
import {
  getAllRoles,
  getAllUsers,
  removeUserFromRole,
} from "../utils/ApiFunctions";
import { HTTP_401_UNAUTHORIZED } from "../constants/httpStatusCodes";
import { useNavigate } from "react-router";

const DeleteUserFromRole = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        const { data: users } = await getAllUsers();
        const { data: roles } = await getAllRoles();

        setUsers(users);
        setRoles(roles);
      } catch (error) {
        console.error("Error fetching users and roles:", error);
      }
    };

    fetchUsersAndRoles();
  }, []);

  const handleRemoveRole = async () => {
    try {
      await removeUserFromRole(selectedUserId, selectedRoleId);
      setSuccessMessage("Role removed successfully");
    } catch (error) {
      console.log(error);
      if (error?.response?.status === HTTP_401_UNAUTHORIZED) {
        setErrorMessage(error?.response?.data.message);
      }
    }

    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {successMessage && (
        <p className="alert alert-success mt-5">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="alert alert-danger mt-5">{errorMessage}</p>
      )}
      <h1 className="mt-5">Remove Role from User</h1>
      <label className="mt-3">
        Select User
        <select
          className="form-select"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName + " "} {user.lastName}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select Role
        <select
          className="form-select"
          value={selectedRoleId}
          onChange={(e) => setSelectedRoleId(e.target.value)}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <div className="gap-5 d-flex justify-content-center">
        <button
          onClick={handleRemoveRole}
          className="btn btn-hotel mt-3"
          disabled={!selectedUserId || !selectedRoleId}
        >
          Remove Role
        </button>
        <button
          type="button"
          className="btn btn-danger mt-3"
          onClick={() => navigate("/admin")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteUserFromRole;

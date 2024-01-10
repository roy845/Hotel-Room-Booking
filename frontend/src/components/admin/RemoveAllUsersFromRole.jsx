import React, { useState, useEffect } from "react";
import { getAllRoles, removeAllUsersFromRole } from "../utils/ApiFunctions";
import { HTTP_401_UNAUTHORIZED } from "../constants/httpStatusCodes";
import { useNavigate } from "react-router";

const RemoveAllUsersFromRole = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data: roles } = await getAllRoles();

        setRoles(roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleRemoveAllUsersFromRole = async () => {
    try {
      await removeAllUsersFromRole(selectedRoleId);
      setSuccessMessage("All users removed from Role successfully");
    } catch (error) {
      console.log(error);

      setErrorMessage("All users are already removed from this role");
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
      <h1 className="mt-5">Remove All Users from Role</h1>

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
          onClick={handleRemoveAllUsersFromRole}
          className="btn btn-hotel mt-3"
          disabled={!selectedRoleId}
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

export default RemoveAllUsersFromRole;

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { addRole } from "../utils/ApiFunctions";

const AddRole = () => {
  const [roleName, setRoleName] = useState("");

  const navigate = useNavigate();

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
  };

  const handleSave = async () => {
    try {
      const { data } = await addRole(roleName);
      navigate("/manage-roles", {
        state: { message: "Role created successfully!" },
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
    setRoleName("");
  };

  return (
    <div className="container mt-4">
      <h2>Add Role</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="roleName" className="form-label">
            Role Name
          </label>
          <input
            type="text"
            className="form-control"
            id="roleName"
            value={roleName}
            onChange={handleRoleNameChange}
          />
        </div>
        <div className="gap-5 d-flex justify-content-center">
          <button
            disabled={!roleName}
            type="button"
            className="btn btn-hotel"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => navigate("/manage-roles")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRole;

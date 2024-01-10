import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2>Welcome to Admin Panel</h2>
      <hr />
      <div className="row">
        <div className="col-md-6 mb-3">
          <Link
            to={"/existing-rooms"}
            className="card admin-container text-center p-4"
            style={{ textDecoration: "none" }}
          >
            Manage Rooms
          </Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link
            to={"/existing-bookings"}
            className="card admin-container text-center p-4"
            style={{ textDecoration: "none" }}
          >
            Manage Bookings
          </Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link
            to={"/manage-roles"}
            className="card admin-container text-center p-4"
            style={{ textDecoration: "none" }}
          >
            Manage Roles
          </Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link
            to={"/assign-user-to-role"}
            className="card admin-container text-center p-4"
            style={{ textDecoration: "none" }}
          >
            Assign Roles to users
          </Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link
            to={"/delete-user-from-role"}
            className="card admin-container text-center p-4"
            style={{ textDecoration: "none" }}
          >
            Delete Roles from users
          </Link>
        </div>
        <div className="col-md-6 mb-3">
          <Link
            to={"/remove-all-users-from-role"}
            className="card admin-container text-center p-4"
            style={{ textDecoration: "none" }}
          >
            Delete All users from role
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Admin;

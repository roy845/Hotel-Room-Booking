import React, { useEffect, useState } from "react";
import RolesTable from "./RolesTable";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { getAllRoles } from "../utils/ApiFunctions";
import { Spinner } from "react-bootstrap";

const Roles = () => {
  const location = useLocation();
  const message = location.state && location.state.message;
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(message);
  const [fetchAgain, setFetchAgain] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsLoading(true);
        const { data } = await getAllRoles();
        setRoles(data);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchRoles();
  }, [fetchAgain]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (successMessage) {
        const { message, ...restState } = location.state || {};
        navigate({ state: restState });
        setSuccessMessage("");
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [successMessage, location.state, navigate]);

  return (
    <>
      {isLoading ? (
        <section className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" />
        </section>
      ) : (
        <>
          {successMessage && (
            <p className="alert alert-success mt-5">{successMessage}</p>
          )}

          <RolesTable
            roles={roles}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
          />
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin")}
            >
              <FaArrowLeft /> Back
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Roles;

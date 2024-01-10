import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../utils/ApiFunctions";
import { HTTP_400_BADREQUEST } from "../constants/httpStatusCodes";

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const { data } = await resetPassword(password, token);
      setSuccessMessage(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error?.response?.status === HTTP_400_BADREQUEST) {
        setErrorMessage(error?.response?.data);
        setSuccessMessage("");
      }
    }

    setTimeout(() => {
      resetForm();
    }, 5000);
  };

  const resetForm = () => {
    setSuccessMessage("");
    setErrorMessage("");
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setSuccessMessage("");
      setErrorMessage("Passwords do not match");
    } else if (password && confirmPassword && password === confirmPassword) {
      setSuccessMessage("Passwords match");
      setErrorMessage("");
    } else {
      setSuccessMessage("");
      setErrorMessage("");
    }
  }, [password, confirmPassword]);

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h1 className="text-center mb-4">Reset Password</h1>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            New Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {errorMessage && <p className="text-danger">{errorMessage}</p>}

        {successMessage && <p className="text-success">{successMessage}</p>}

        <div className="mb-3 text-center">
          <button
            type="button"
            className="btn btn-hotel"
            onClick={handleResetPassword}
            disabled={
              !password || !confirmPassword || password !== confirmPassword
            }
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

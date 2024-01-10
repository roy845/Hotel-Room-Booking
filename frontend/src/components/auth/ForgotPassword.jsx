import React, { useState } from "react";
import { isEmail } from "validator";
import { HTTP_404_NOTFOUND } from "../constants/httpStatusCodes";
import { forgotPassword } from "../utils/ApiFunctions";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = isEmail(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await forgotPassword(email);
      setMessage(`Password reset instructions sent to ${email}`);
      setEmail("");
      setIsLoading(false);
    } catch (error) {
      if (error?.response?.status === HTTP_404_NOTFOUND) {
        setErrorMessage(error?.response?.data);
      }
      setIsLoading(false);
    }

    setTimeout(() => {
      setMessage("");
      setErrorMessage("");
    }, 5000);
  };

  return (
    <div className="container col-6 mt-5 mb-5">
      <div className="card p-4">
        <h2 className="text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Enter your email:
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {!isValidEmail && email ? (
              <span className="text-danger">*Invalid Email</span>
            ) : !isValidEmail && !email ? null : (
              <span className="text-success">Valid Email</span>
            )}
          </div>
          <div className="text-center">
            {!isLoading ? (
              <button
                type="submit"
                className="btn btn-hotel"
                disabled={!isValidEmail || !email}
              >
                Reset Password
              </button>
            ) : (
              <Spinner />
            )}
          </div>
          <div style={{ marginTop: "20px" }}>
            Remember your password ?{" "}
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              Login
            </Link>
          </div>
        </form>
        {message && <p className="mt-3 text-success">{message}</p>}
        {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;

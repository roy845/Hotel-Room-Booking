import React, { useState } from "react";
import { loginUser } from "../utils/ApiFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { isEmail } from "validator";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const isValidEmail = isEmail(login.email);

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);

    if (success) {
      const token = success.token;
      auth.handleLogin(token);
      localStorage.setItem("firstName", success.firstName);
      localStorage.setItem("lastName", success.lastName);
      navigate(redirectUrl, { replace: true });
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <section className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={login.email}
              onChange={handleInputChange}
            />
            {!isValidEmail && login.email ? (
              <span className="text-danger">*Invalid Email</span>
            ) : !isValidEmail && !login.email ? null : (
              <span className="text-success">Valid Email</span>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={login.password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-hotel"
            style={{
              marginRight: "10px",
              cursor:
                !login.email || !login.password || !isValidEmail
                  ? "not-allowed"
                  : "pointer",
            }}
            disabled={!login.email || !login.password || !isValidEmail}
          >
            Login
          </button>
          <br />
          <div style={{ marginTop: "30px" }}>
            <span style={{ marginLeft: "10px" }}>
              Don't have an account yet ?{" "}
              <Link to={"/register"} style={{ textDecoration: "none" }}>
                Register
              </Link>
            </span>
            <br />
            <span style={{ marginLeft: "10px" }}>
              <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                Frogot your password ?
              </Link>
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;

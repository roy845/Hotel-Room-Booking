import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logout from "../auth/Logout";
import { useAuth } from "../auth/AuthProvider";

const Navbar = () => {
  const [isAccountOpen, setAccountOpen] = useState(false);
  const { user } = useAuth();
  const accountRef = useRef(null);

  const { pathname } = useLocation();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [accountRef]);

  const handleAccountToggle = () => {
    setAccountOpen(!isAccountOpen);

    document.body.style.overflowX = isAccountOpen ? "visible" : "hidden";
  };

  const isLoggedIn = user !== null;
  const userRole = localStorage.getItem("userRole");

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
      <div className="container-fluid">
        <Link to="/" className="text-decoration-none">
          <span className="hotel-color h3">lakeSide Hotel</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/browse-all-rooms"
                >
                  Browse all rooms
                </NavLink>
              </li>
            )}

            {isLoggedIn && userRole.includes("ROLE_ADMIN") && (
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="d-flex navbar-nav">
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/find-booking">
                  Find My Booking
                </NavLink>
              </li>
            )}
            <li
              className="nav-item dropdown"
              ref={accountRef}
              onClick={handleAccountToggle}
            >
              {!pathname.includes("reset-password") && (
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={isAccountOpen}
                  onClick={handleAccountToggle}
                >
                  Account
                </a>
              )}
              <div
                className={`dropdown-menu ${isAccountOpen ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
                style={{ position: "absolute", right: 0 }}
              >
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" className="dropdown-item">
                      Login
                    </Link>
                  </>
                ) : (
                  <Logout />
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { Fragment } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import armantaraLogo from "../assets/armantara-logo.jpg";


const Menu = ({ history }) => {
  const location = useLocation();

  const currentTab = (path) => {
    if (location.pathname === path) {
      return { color: "#1FAA59" };
    } else {
      return { color: "#FFFF" };
    }
  };

  return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" style={currentTab("/")} to="/">
        <img src={armantaraLogo} alt="Armantara Logo" width="250px" height="100px" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link style={currentTab("/")} className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link style={currentTab("/cart")} className="nav-link" to="/cart">
              Cart
            </Link>
          </li>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
              <Link
                style={currentTab("/user/dashboard")}
                className="nav-link"
                to="/user/dashboard"
              >
                User Dashboard
              </Link>
            </li>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <Link
                style={currentTab("/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
              >
                Admin Dashboard
              </Link>
            </li>
          )}
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  style={currentTab("/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={currentTab("/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
              <span
                className="nav-link text-warning"
                onClick={() => {
                  signout(() => {
                   // history.push("/");
                  });
                }}
              >
                Signout
              </span>
            </li>
          )}
          <li className="nav-item">
            <Link style={currentTab("/aboutus")} className="nav-link" to="/aboutus">
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;

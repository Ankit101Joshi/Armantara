import React from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu";
import Contact from "./Contact";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  showJumbotron = true,
  children
}) => {
  const location = useLocation();

  return (
    <div>
      <Menu />
      <div className="container-fluid mt-4">
        {showJumbotron && (
          <div className="jumbotron bg-dark text-white text-center">
            <h2 className="display-4">{title}</h2>
            <p className="lead">{description}</p>
          </div>
        )}
        <div className={`main-content ${className}`}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-5 py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you have any questions, feel free to email us</h4>
          <Link to="/contact" className="btn btn-warning btn-lg">Contact Us</Link>
        </div>
        <div className="container">
          <span className="text-muted">
            <span className="text-white">Customize</span> your dream{" "}
            <span className="text-white">GIFT</span> here!
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;

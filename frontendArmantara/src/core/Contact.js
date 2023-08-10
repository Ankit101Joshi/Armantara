import React, { useState } from "react";
import Base from "./Base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    success: false,
    error: false,
  });

  const { name, email, message, success, error } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setFormData({
            ...formData,
            error: true,
          });
        } else {
          setFormData({
            name: "",
            email: "",
            message: "",
            success: true,
            error: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setFormData({
          ...formData,
          error: true,
        });
      });
  };

  const successMessage = () => {
    if (success) {
      return <div className="alert alert-success">Email sent successfully</div>;
    }
  };

  const errorMessage = () => {
    if (error) {
      return <div className="alert alert-danger">Failed to send the email</div>;
    }
  };

  return (
    <Base title="Contact Us" description="Feel free to reach out to us">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="5"
                  value={message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <br />
            {successMessage()}
            {errorMessage()}
            <div className="mt-4">
              <a
                href="https://www.facebook.com/armantararetail/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "black", marginRight: "10px" }}
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a
                href="https://www.instagram.com/armantararetail/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "black" }}
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Contact;

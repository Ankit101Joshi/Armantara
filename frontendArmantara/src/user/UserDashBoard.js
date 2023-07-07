import React from "react";
import Base from "../core/Base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  
const UserDashBoard = () => {
  return (
    <Base title="User Dashboard - Armantara">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h4>User Navigation</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <a href="/user/orders">My Orders</a>
              </li>
              <li className="list-group-item">
                <a href="/user/profile">My Profile</a>
              </li>
              <li className="list-group-item">
                <a href="/user/wishlist">My Wishlist</a>
              </li>
              <li className="list-group-item">
                <a href="/user/settings">Account Settings</a>
              </li>
            </ul>
          </div>
          <div className="col-md-9">
            <h2>Welcome, Armantara!</h2>
            <p>This is your personalized dashboard.</p>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Latest Orders</h5>
                    <p className="card-text">
                      You can view and track your latest orders here.
                    </p>
                    <a href="/user/orders" className="btn btn-primary">
                      View Orders
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">My Profile</h5>
                    <p className="card-text">
                      Update your personal information and preferences.
                    </p>
                    <a href="/user/profile" className="btn btn-primary">
                      Edit Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UserDashBoard;

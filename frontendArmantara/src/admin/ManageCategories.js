import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getCategories, deleteCategory, updateCategory } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          preload();
        }
      })
      .catch((err) => console.log(err));
  };

  const updateThisCategory = (categoryId, newName) => {
    const updatedCategory = {
      name: newName,
    };

    updateCategory(categoryId, user._id, token, updatedCategory)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          preload();
        }
      })
      .catch((err) => console.log(err));
  };

  // Filter the categories based on the search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Base title="Welcome admin" description="Manage products here">
      <div className="container">
        <h2 className="mb-4">All categories:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row mt-4">
          <div className="col-md-8 offset-md-2">
            <h2 className="text-center mb-4">Update Categories</h2>
            {/* Search bar */}
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search for category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* End of search bar */}
            {filteredCategories.map((category, index) => {
              return (
                <div key={index} className="card mb-2">
                  <div className="card-header bg-dark text-white">
                    <h5 className="card-title">{category.name}</h5>
                  </div>
                  <div className="card-body">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                      <button
                        className="btn btn-warning ml-2"
                        onClick={() => {
                          updateThisCategory(category._id, newName);
                          setNewName(""); // Clear the input field after update
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => {
                          deleteThisCategory(category._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;

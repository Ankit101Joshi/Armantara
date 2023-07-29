import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import ImageHelper from "../core/helper/ImageHelper";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for the search query

  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts()
      .then((data) => {
        if (data && data.error) {
          console.log(data.error);
        } else if (data) {
          setProducts(data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("Product deleted successfully");
          // Perform any additional actions or UI updates after successful deletion
          preload(); // Refresh the product list after deletion
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Base title="Welcome admin" description="Manage products here">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-white">All Products</h2>
            <Link to="/admin/dashboard" className="btn btn-info">
              Admin Home
            </Link>
          </div>
          <hr className="bg-white" />

          {/* Search Bar */}
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="row">
            <div className="col-12">
              <h4 className="text-center text-white mb-3">
                Total {filteredProducts.length} products
              </h4>
            </div>
            {filteredProducts.map((product, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm h-100">
                  <ImageHelper product={product} />
                  <div className="card-body">
                    <h5 className="card-title text-dark mb-0">
                      {product.name}
                    </h5>
                    <span
                      className="text-warning font-weight-bold"
                      style={{ fontSize: "1.2rem" }}
                    >
                      ${product.price}
                    </span>
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="btn btn-sm btn-success"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => deleteThisProduct(product._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;

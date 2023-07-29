import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getCategories, getProduct, updateProduct } from "./helper/adminapicall";

const UpdateProduct = () => {
  const { productId } = useParams(); // Use useParams() hook to get the productId from the URL

  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    updatedProduct: false,
    photo: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    updatedProduct,
    photo,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      console.log("Product Data:", data); // Check the product data received from the API
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category ? data.category._id : "", // Check the value of data.category
          stock: data.stock,
        });
      }
    });
  };
  
  

  const preloadCategories = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, categories: data });
        }
      });
  };
  

  useEffect(() => {
    preload(productId); // Use the productId from useParams()
    preloadCategories();
  }, [productId]); // Add productId as a dependency for useEffect

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    if (photo) {
      formData.append("photo", photo);
    }

    updateProduct(productId, user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            loading: false,
            updatedProduct: true,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: updatedProduct ? "" : "none" }}
    >
      <h4>Product updated successfully</h4>
    </div>
  );


  const updateProductForm = () => (
    <form>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          value={category}
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="Choose a file"
          />
        </label>
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Update a product"
      description="Update product details"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>

      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {updateProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
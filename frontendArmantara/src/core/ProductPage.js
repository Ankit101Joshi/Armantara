import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "./helper/coreapicalls";
import ImageHelper from "./helper/ImageHelper";
import Base from "./Base";
import { addItemToCart } from "./helper/cartHelper";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    setLoading(true);
    getProduct(productId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProduct(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to fetch product");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addToCart = () => {
    addItemToCart(product, () => setCartMessage("Product added to cart"));
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button onClick={addToCart} className="btn btn-primary mt-3">
          Add to Cart
        </button>
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Base showJumbotron={false}>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6">
            <div className="product-image">
              <ImageHelper product={product} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="product-details">
              <h2>{product.name}</h2>
              <div className="product-info">
                <p className="product-description">{product.description}</p>
                <div className="product-price">Price: ${product.price}</div>
                <div className="product-category">
                  Category: {product.category ? product.category.name : "N/A"}
                </div>
                <div className="product-stock">
                  Stock: {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </div>
                {cartMessage && (
                  <p className="text-success">{cartMessage}</p>
                )}
                {showAddToCart(true)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ProductPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import {API} from "../backend"

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined
}) => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescription = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = () => {
    if (redirect) {
      navigate("/cart");
    }
  };

  const viewProduct = () => {
    navigate(`/product/${product._id}`);
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  };

  return (
    <div className="card text-white bg-dark border border-info">
      <div className="card-header font-weight-bold lead">{cartTitle}</div>
      <div className="card-body">
        {getARedirect()}
        <ImageHelper product={product} />
        <p className=" font-weight-normal text-wrap">
          {truncateDescription(cartDescription, 100)}
        </p>
        <p className="btn btn-warning rounded px-4">$ {cartPrice}</p>
        <div className="row">
          <div className="col-12">
            <button
              onClick={viewProduct}
              className="btn btn-block btn-outline-primary mt-2 mb-2"
            >
              View Product
            </button>
          </div>
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price;
    });
    return total;
  };
  
  
  const calculateTax = (amount) => {
    const taxPercentage = 13;
    const tax = (taxPercentage / 100) * amount;
    return tax.toFixed(2);
  };
  
  const renderCart = () => {
    return (
      <div>
        <h2 className="mb-4">Your Cart</h2>
        {products.length > 0 ? (
          loadAllProducts()
        ) : (
          <h4>Your cart is empty</h4>
        )}
      </div>
    );
  };

  const loadAllProducts = () => {
    return (
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <Card
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <Base title="Cart" description="Review your cart before checkout" theme="armantara">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">{renderCart()}</div>
          <div className="col-md-4">
            <div className="card text-white bg-dark">
              <div className="card-body">
                <h4 className="mb-4">Cart Summary</h4>
                <p className="text-light">
                  Total Items: <span className="font-weight-bold">{products.length}</span>
                </p>
                <p className="text-light">
                   Price: <span className="font-weight-bold">$ {calculateTotalPrice()}</span>
                </p>
                <p className="text-light">
                  Tax (13%): <span className="font-weight-bold">$ {calculateTax(calculateTotalPrice())}</span>
                </p>
                <p className="text-light">
                Total: <span className="font-weight-bold">$ {parseFloat(calculateTotalPrice()) + parseFloat(calculateTax(calculateTotalPrice()))}</span>
                </p>
                <button className="btn btn-primary btn-block">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );  
};

export default Cart;

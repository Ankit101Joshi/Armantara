import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "./StripeCheckout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./helper";
import PaymentSuccess from "./PaymentSuccess"; // Import the new component

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [uniqueProducts, setUniqueProducts] = useState({});
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false); // Add state for payment success

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  useEffect(() => {
    generateUniqueProducts();
  }, [products]);

  const generateUniqueProducts = () => {
    const tempProducts = {};
    products.forEach((product) => {
      if (!tempProducts[product._id]) {
        tempProducts[product._id] = product;
        tempProducts[product._id].count = 1;
      } else {
        tempProducts[product._id].count += 1;
      }
    });
    setUniqueProducts(tempProducts);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    Object.values(uniqueProducts).forEach((product) => {
      total += product.price * product.count;
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
        {Object.values(uniqueProducts).map((product, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <Card
              product={product}
              count={product.count}
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

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        // Handle the payment success
        if (response.ok) {
          setIsPaymentSuccess(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const getFinalAmount = () => {
    // Calculate the total amount of the products in the cart
    return calculateTotalPrice() + parseFloat(calculateTax(calculateTotalPrice()));
  };

  return (
    <Base title="Cart" description="Review your cart before checkout" theme="armantara">
      {isPaymentSuccess ? ( // Render the PaymentSuccess component if payment is successful
        <PaymentSuccess />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              {renderCart()}
            </div>
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
                    Total Price:{" "}
                    <span className="font-weight-bold">
                      $ {(parseFloat(calculateTotalPrice()) + parseFloat(calculateTax(calculateTotalPrice()))).toFixed(2)}
                    </span>
                  </p>
                  {isAuthenticated() ? (
                    <StripeCheckoutButton
                      products={products}
                      makePayment={makePayment}
                      getFinalAmount={getFinalAmount}
                    />
                  ) : (
                    <Link to="/signin">
                      <button className="btn btn-warning">Sign in</button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Base>
  );
};

export default Cart;

import React from "react";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { isAuthenticated } from "./helper";

const StripeCheckoutButton = ({ products, makePayment, getFinalAmount }) => {
  const showStripeButton = () => {
    return (
      <StripeCheckout
        stripeKey="pk_test_51NWNmJFqx5OP2nC4M6oA9aoUqLJuoLAtEzuDAgCewkUOvkH5dWNtSziFsjgbOou1Yk3c4KqoJ13jvZKbOJcy2QsP00MsaPPAyg" // Replace with your actual Stripe public key
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Armantara Checkout"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Checkout with Stripe</button>
      </StripeCheckout>
    );
  };

  return isAuthenticated() ? (
    showStripeButton()
  ) : (
    <Link to="/signin">
      <button className="btn btn-warning">Sign in</button>
    </Link>
  );
};

export default StripeCheckoutButton;

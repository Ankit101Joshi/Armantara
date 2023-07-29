import React from "react";

const PaymentSuccess = () => {
  // Calculate the delivery date (4 days after the current day)
  const currentDate = new Date();
  const deliveryDate = new Date(currentDate);
  deliveryDate.setDate(currentDate.getDate() + 4);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2 text-center">
          <h2>Payment Successful!</h2>
          <p>Your order will be delivered to the provided address within 4 days on {deliveryDate.toDateString()}.</p>
          <p>Thank you for shopping with us!</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

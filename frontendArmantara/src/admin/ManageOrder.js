import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { getAllOrders, updateOrderStatus } from "./helper/adminApiCalls";
import { isAuthenticated } from "../auth/helper";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const preloadOrders = () => {
    getAllOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    preloadOrders();
  }, []);

  const handleChange = (event, orderId) => {
    const status = event.target.value;
    updateOrderStatus(user._id, token, orderId, status).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preloadOrders();
      }
    });
  };

  return (
    <Base title="Manage Orders" description="View and Update order statuses">
      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Products</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>
                  {order.products.map((product) => (
                    <div key={product._id}>
                      {product.name} x {product.count}
                    </div>
                  ))}
                </td>
                <td>${order.amount}</td>
                <td>
                  <select
                    className="form-control"
                    value={order.status}
                    onChange={(e) => handleChange(e, order._id)}
                  >
                    <option value="Received">Received</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Base>
  );
};

export default ManageOrders;

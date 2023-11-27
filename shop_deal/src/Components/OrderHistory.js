// OrderHistory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const OrderHistory = () => {
  const [ordersHistory, setOrdersHistory] = useState([]);
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  useEffect(() => {
    // Fetch order history using axios
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      // Replace 'http://localhost:4000/get_orders_history/${user_id}' with the actual endpoint for fetching order history
      const response = await axios.get(`http://localhost:4000/get_orders_history`, CONFIG_OBJ);
      setOrdersHistory(response.data);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  const getProductDetails = async (productId) => {
    try {
      // Replace 'http://localhost:4000/get_product/${productId}' with the actual endpoint for fetching product details
      const response = await axios.get(`http://localhost:4000/get_product/${productId}`);
      return response.data.product;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return {};
    }
  };

  const formatOrderTime = (isoDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(isoDate));
  };

  return (
    <>
    <Header />
    <div className="container mt-5">
      <h1 className="mb-4">Order History</h1>
      {ordersHistory.map((order) => (
        <div key={order._id} className="card mb-5">
          <div className="card-body">
            <h2 className="card-title">Shipping Information</h2>
            <p className="card-text"><strong>Name:</strong> {order.shipping_info.firstName} {order.shipping_info.lastName}</p>
            <p className="card-text"><strong>Phone:</strong> {order.shipping_info.phno}</p>
            <p className="card-text"><strong>Email:</strong> {order.shipping_info.email}</p>
            <p className="card-text"><strong>Address:</strong> {order.shipping_info.fullAddress}, {order.shipping_info.city}, {order.shipping_info.state} {order.shipping_info.zipcode}</p>
          </div>
          <div className="card-body">
            <h2 className="card-title">Order Details</h2>
            <ul className="list-group">
              {order.products.map((productOrder) => (
                <li key={productOrder._id} className="list-group-item">
                  <p className="card-text"><strong>Product Id:</strong> {productOrder._id}</p>
                  <p className="card-text"><strong>Quantity:</strong> {productOrder.quantity}</p>
                </li>
              ))}
            </ul>
            <p className="card-text mt-3"><strong>Total Amount:</strong> ₹{order.amount}</p>
            <p className="card-text "><strong>Order Time:</strong> {formatOrderTime(order.orderTime)}</p>
          </div>
        </div>
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default OrderHistory;

// Hi All, Explore https://drimmake.com/ for learn more.

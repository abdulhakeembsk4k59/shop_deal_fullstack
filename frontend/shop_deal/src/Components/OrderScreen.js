import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderScreen = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);
  console.log(orderId)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/get_order/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
        // Handle error (e.g., redirect to an error page)
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    // Loading state or error handling
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <p>Order ID: {order._id}</p>
      {/* Display other order details as needed */}
      
      <h3>Products</h3>
      <ul>
        {order.products.map((product) => (
          <li key={product._id}>
            <p>Product ID: {product.product._id}</p>
            {/* Display other product details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderScreen;

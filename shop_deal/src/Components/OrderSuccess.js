import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccess = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <FaCheckCircle style={{ color: 'green', fontSize: '4em' }} />
      <h2 style={{ color: 'green' }}>Order Placed Successfully!</h2>
      <p>Thank you for your order.</p>
    </div>
  );
};

export default OrderSuccess;

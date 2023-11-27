import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const OrderFailed = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <FaTimesCircle style={{ color: 'red', fontSize: '4em' }} />
      <h2 style={{ color: 'red' }}>Ooops! Order Failed</h2>
      <p>Please try again later.</p>
    </div>
  );
};

export default OrderFailed;

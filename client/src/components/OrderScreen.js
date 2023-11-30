import React from 'react';

const OrderScreen = ({ orderTotal }) => {
  return (
    <div className="order-screen">
      <h2>Order Summary</h2>
      <p>Total Amount: ${orderTotal.toFixed(2)}</p>
      <p>Your order has been submitted successfully!</p>
      {/* You can provide additional order details here */}
    </div>
  );
};

export default OrderScreen;
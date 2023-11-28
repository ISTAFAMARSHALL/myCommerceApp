import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/carts'); // Adjust the endpoint based on your API

      if (!response.ok) {
        throw new Error('Error fetching cart items');
      }

      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    // Call the async function to fetch cart items when the component mounts
    fetchCartItems();
  }, []);

  // Function to calculate the total quantity of items in the cart
  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      <p>Total Items: {calculateTotalQuantity()}</p>

      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.product_name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;

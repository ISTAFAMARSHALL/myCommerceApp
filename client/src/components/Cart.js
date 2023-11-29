import React, { useEffect, useState , useContext} from 'react';
import { UserContext } from '../context/user';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`/carts/${currentUser.id}`); // Adjust the endpoint based on your API

      if (!response.ok) {
        throw new Error('Error fetching cart items');
      }

      const data = await response.json();
      setCartItems(data.cart_items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    // Call the async function to fetch cart items when the component mounts
    fetchCartItems();
  }, [currentUser]);

  // Function to calculate the total quantity of items in the cart
  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart">

      < div className="cart-header">
      <h2>Your Shopping Cart</h2>
      <p>Total Items: {calculateTotalQuantity()}</p>
      </div>

      <div className="cart-items">
      {cartItems.map(item => (
        <div key={item.id} className="product-card">
          <img src={item.image} alt={item.name} className="product-image" />
          <div className="product-details">
            <h3 className="product-name">{item.name}</h3>
            <p className="product-price">Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}
      </div>

    </div>
  );
};

export default Cart;

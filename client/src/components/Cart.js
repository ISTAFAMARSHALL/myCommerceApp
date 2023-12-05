import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';



const Cart = ({cartItems, setCartItems}) => {

  // const [items, setItems] = useState([]);
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  // Function to calculate the total quantity of items in the cart
  const calculateTotalQuantity = () => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0);
    return parseInt(total);
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((total, item) => total + item.salePrice * item.quantity, 0);
    return parseFloat(total.toFixed(2));
  };

  const handleDeleteFromCart = async (item) => {
    try {
      const response = await fetch(`/cart_items/${item.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the item from the cart items state
        const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
        setCartItems(newCartItems); // Update the cart items state

      } else {
        throw new Error('Error deleting item from cart');
      }

      // If the item was successfully deleted from the cart, we can fetch the updated cart items
      // fetchCartItems();
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  const handleUpdateQuantity = async (item, newQuantity) => {
    try {
      const response = await fetch(`/cart_items/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        // Update the quantity of the item in the cart items state
        const newCartItems = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, quantity: parseInt(newQuantity) };
          } else {
            return cartItem;
          }
        });
        
        setCartItems(newCartItems); // Update the cart items state

      } else {
        throw new Error('Error updating quantity');
      }

      // If the quantity was successfully updated, we can fetch the updated cart items
      // fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleOrderSubmission = async () => {
    try {
      console.log(currentUser.id,
        cartItems.map((item) => ({
          cart_items_id: item.id,
          quantity: item.quantity,
        })),);
      const response = await fetch(`/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          items: cartItems.map((item) => ({
            cart_items_id: item.id,
            quantity: item.quantity,
          })),
        }),
      });
  
      if (response.ok) {

        const data = await response.json();

        // Clear the cart after successful order submission
        setCartItems([]);
        // Redirect to the order page if needed
        history.push(`/order/${data.id}`);
      } else {
        throw new Error('Error submitting order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };
  

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        <p>Items in Cart: {calculateTotalQuantity()}</p>
        <p>Sales Total: ${calculateTotal()}</p>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} className="product-image" />
            <div className="product-details">
              <h3 className="product-name">{item.name}</h3>
              <p className="product-price">Price: ${item.salePrice}</p>
              <p className="product-price">
                Quantity:
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item, e.target.value)}
                />
              </p>
              <button className="remove-from-cart" 
              // onClick={""}
              >
                Save for Later
              </button>
              <br></br>
              <br></br>
              <button className="remove-from-cart" onClick={() => handleDeleteFromCart(item)}>
                Delete from Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleOrderSubmission}
        className="submit-order-button"
        disabled={currentUser?.id === undefined || cartItems.length === 0}
      >  
        {currentUser?.id ? 'Submit Order' : 'Sign In to Submit Order'}
      </button>
    </div>
  );
};

export default Cart;

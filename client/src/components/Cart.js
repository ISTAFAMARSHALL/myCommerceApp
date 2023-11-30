// import React, { useEffect, useState , useContext} from 'react';
// import { UserContext } from '../context/user';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const { currentUser, setCurrentUser } = useContext(UserContext);

//   const fetchCartItems = async () => {
//     try {
//       const response = await fetch(`/carts/${currentUser.id}`); // Adjust the endpoint based on your API

//       if (!response.ok) {
//         throw new Error('Error fetching cart items');
//       }

//       const data = await response.json();
//       setCartItems(data.cart_items);
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//     }
//   };

//   useEffect(() => {
//     // Call the async function to fetch cart items when the component mounts
//     fetchCartItems();
//   }, []);

//   // Function to calculate the total quantity of items in the cart
//   const calculateTotalQuantity = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + ((item.salePrice * item.quantity )* 1), 0);
//   };

//   const handleDeleteFromCart = async (item) => {
//     try {
//       const response = await fetch(`/cart_items/${item.id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Error deleting item from cart');
//       }
//       // If the item was successfully deleted from the cart, we can fetch the updated cart items
//       fetchCartItems();
//     } catch (error) {
//       console.error('Error deleting item from cart:', error);
//     }
//   }

//   return (
//     <div className="cart">

//       < div className="cart-header">
//       <h2>Your Shopping Cart</h2>
//       <p>Items in Cart: {calculateTotalQuantity()}</p>
//       <p>Sales Total: ${calculateTotal()}</p>
//       </div>

//       <div className="cart-items">
//       {cartItems.map(item => (
//         <div key={item.id} className="product-card">
//           <img src={item.image} alt={item.name} className="product-image" />
//           <div className="product-details">
//             <h3 className="product-name">{item.name}</h3>
//             <p className="product-price">Price: ${item.salePrice}</p>
//             <p className="product-price">Quantity: {item.quantity}</p>
//             <button className="Remove from cart" onClick={() => handleDeleteFromCart(item)}>Delete from Cart</button>

//           </div>
//         </div>
//       ))}
//       </div>

//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/user';

const Cart = ({items, setItems}) => {

  // const [items, setItems] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`/carts/${currentUser.id}`); // Adjust the endpoint based on your API

      if (!response.ok) {
        throw new Error('Error fetching cart items');
      }

      const data = await response.json();
      setItems(data.cart_items);
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
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotal = () => {
    const total = items.reduce((total, item) => total + item.salePrice * item.quantity, 0);
    return parseFloat(total.toFixed(2));
  };

  const handleDeleteFromCart = async (item) => {
    try {
      const response = await fetch(`/cart_items/${item.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting item from cart');
      }
      // If the item was successfully deleted from the cart, we can fetch the updated cart items
      fetchCartItems();
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

      if (!response.ok) {
        throw new Error('Error updating quantity');
      }
      // If the quantity was successfully updated, we can fetch the updated cart items
      fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleOrderSubmission = async () => {
    try {
      const response = await fetch(`/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (response.ok) {
        // Clear the cart after successful order submission
        setItems([]);
        // history.push('/order');
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
        {items.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} className="product-image" />
            <div className="product-details">
              <h3 className="product-name">{item.name}</h3>
              <p className="product-price">Price: ${item.salePrice}</p>
              <p className="product-price">
                Quantity:
                <input
                  type="number"
                  defaultValue={1}
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item, e.target.value)}
                />
              </p>
              <button className="remove-from-cart" onClick={""}>
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
      <button onClick={handleOrderSubmission} className="submit-order-button">
        Submit Order
      </button>
    </div>
  );
};

export default Cart;

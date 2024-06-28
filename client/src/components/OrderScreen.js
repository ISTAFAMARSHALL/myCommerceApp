import React, { useEffect, useState , useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from "../context/user";

const OrderScreen = () => {
  const [order, setOrder] = useState([]);
  const { currentUser} = useContext(UserContext);

  const { id } = useParams();

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/orders/${id}`);

      if (!response.ok) {
        throw new Error('Error fetching order');
      }

      
      const data = await response.json();
      console.log('response:', data.order_items);
      // Check if data.order_items exists before parsing
      const orderItemsArray = data.order_items ? JSON.parse(data.order_items) : [];

      const orderItemsKeyValuePairs = orderItemsArray.map((orderItem) => {
        const keyValuePairs = orderItem.split(',').map((pair) => {
          const [key, value] = pair.split(':').map((str) => str.trim());
          return { [key]: value };
        });

        return keyValuePairs.reduce((acc, pair) => ({ ...acc, ...pair }), {});
      });

      setOrder(orderItemsKeyValuePairs);

    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  

  const orderTotal = () => {
    const total = order.reduce((acc, item) => acc + item.salePrice * item.quantity, 0);
    return parseFloat(total.toFixed(2));
  };

  return (
    <div className="order-screen">
      <h2>Order Summary</h2>
      <p></p>
      <p>{currentUser.name} your order of {order.length} items has been submitted successfully!</p>

      {/* Additional order details */}
      <br></br>
      <div className="order-details">


        {/* Display details for each order item */}
        <ul>
          {order.map((item, index) => (
            <li key={index}>
              <p>Sku: {item.sku} Quantity: {item.quantity} </p>
              <p>Name: {item.name} </p>
              <p>Sale Price: ${item.salePrice}</p>
              <p></p>
            </li>
            
          ))}
        </ul>
        <h2>Total ${orderTotal()}</h2>
      </div>
    </div>
  );
};

export default OrderScreen;

import React  from 'react';
import { useEffect , useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderScreen = ({  }) => {

  const [order, setOrder] = useState([]);

  const { id } = useParams();// This is how we access the URL parameters
  
  console.log("id", id);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/orders/${id}`); // Adjust the endpoint based on your API

      if (!response.ok) {
        throw new Error('Error fetching cart items');
      }

      const data = await response.json();
    
      setOrder(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  useEffect(() => {
    // Call the async function to fetch cart items when the component mounts
    fetchOrder();
  }, []);
  

  console.log(order);

  return (
    <div className="order-screen">
      <h2>Order Summary</h2>
      {/* <p>Total Amount: ${orderTotal.toFixed(2)}</p>
      <p>Your order has been submitted successfully!</p> */}
      {/* You can provide additional order details here */}
    </div>
  );
};

export default OrderScreen;
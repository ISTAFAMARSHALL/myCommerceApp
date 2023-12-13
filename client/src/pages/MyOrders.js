import React, { useEffect, useState , useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from "../context/user";

const MyOrders = () => {

  
  const {currentUser} = useContext(UserContext);

  console.log(currentUser.orders);


  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {currentUser.orders.map((order) => {
                
        // const orderItemsArray = order.order_items ? JSON.parse(order.order_items) : [];

        // const orderItemsKeyValuePairs = orderItemsArray.map((orderItem) => {
        //   const keyValuePairs = orderItem.split(',').map((pair) => {
        //     const [key, value] = pair.split(':').map((str) => str.trim());
        //     return { [key]: value };
        //   });
  
        //   return keyValuePairs.reduce((acc, pair) => ({ ...acc, ...pair }), {});


        // });
        
        return (
        <div key={order.id} className="order">
          <h3>Order #{order.id}</h3>
          <p>Total Amount: ${order.total_amount}</p>
          <p>Order Date: {new Date(order.created_at).toLocaleString()}</p>
          <div className="order-items">
            <h4>Order Items:</h4>
            <ul>
                {/* {console.log('order_items:', orderItemsArray)} */}
                

              {/* {JSON.parse(order.order_items).map((item, index) => (
                <li key={index}>
                  <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                  {item.name} - Quantity: {item.quantity} - Price: ${item.salePrice.toFixed(2)}
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      )})}
    </div>
  );
};

export default MyOrders;

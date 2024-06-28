// import React, { useEffect, useState , useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { UserContext } from "../context/user";

// const MyOrders = () => {

  
//   const {currentUser} = useContext(UserContext);

//   console.log(currentUser.orders);


//   return (
//     <div className="my-orders">
//       <h2>My Orders</h2>
//       {currentUser.orders.map((order) => (
        
//         <div key={order.id} className="order">
//           {console.log(typeof(order))}

//           {console.log(order.id)}

//           <h3>Order #{order.id}</h3>
//           <p>Total Amount: ${order.total_amount}</p>
//           <p>Order Date: {new Date(order.created_at).toLocaleString()}</p>
//           <div className="order-items">
//             <h4>Order Items:</h4>
//             <ul>
//               {/* {JSON.parse(order.order_items).map((item, index) => (
//                 <li key={index}>
//                   <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
//                   {item.name} - Quantity: {item.quantity} - Price: ${item.salePrice.toFixed(2)}
//                 </li>
//               ))} */}
//             </ul>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyOrders;

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from "../context/user";

const MyOrders = () => {
  const { currentUser } = useContext(UserContext);

  console.log(currentUser.orders[0]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {currentUser.orders.map((order) => (
        <div key={order.id} className="order">
          <h3>Order #{order.id}</h3>
          <p>Total Amount: ${order.total_amount}</p>
          <p>Order Date: {new Date(order.created_at).toLocaleString()}</p>
          <div className="order-items">
            <h4>Order Items:</h4>
            <ul>
              {/* {JSON.parse(order.order_items).map((item) => (
                <li key={item.id}>
                  <img
                    src={item.thumbnailImage}
                    alt={item.name}
                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                  />
                  {item.name} - Quantity: {item.quantity} - Price: ${parseFloat(item.salePrice).toFixed(2)}
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;

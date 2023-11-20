import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const ProductDetails = () => {
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          const errorData = await response.json();
          setErrors(errorData.errors);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchData();
    }

  }, [id]);

  if (!id) {
    return <div>Nothing</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-image-container">
        {product.products &&
          product.products.map((product) => (
            <div key={product?.sku} className="product">
              <div className="product-image-container">
                <img src={product?.image} alt={product?.name} className="product-image" />
              </div>
              <div className="product-info">
                <h2 className="product-name">{product?.name}</h2>
                <p className="product-price">${product?.salePrice}</p>
                <button className="add-to-cart-button">Add to Cart</button>
                <p className="product-description">{product?.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDetails;

// import React, { useContext } from 'react';
// import { useEffect , useState} from "react";
// import { useParams } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';



// const ProductDetails = ({  }) => {

//     const [errors, setErrors] = useState([]);

//     const { param } = useParams();
//     const [product, setProduct] = useState([]);
//     const location = useLocation();
//     const id = location.pathname.split("/")[2];

//     console.log(location.pathname.split("/")[2]); // result: '/secondpage'
    


//     if (id) {
//         console.log(id);
//         useEffect(() => {
//             fetch(`/products/${id}`)
//             .then((response) => {
//             if (response.ok) {
//             response.json().then((data) => {
//                 setProduct(data);
//             });
//             } else {
//             response.json().then((e) => setErrors(e.errors));
//             }});
//         }, [id]);

//         console.log(product.products);

//         return (
    
//             <div className="product-detail">
//               <div className="product-image-container">
//               {/* <div key={product.products[0].sku} className="product"  >
//                             <div className="product-image-container">
//                             <img src={product.products[0].image} alt={product.name} className="product-image" />
//                             </div>
//                             <div className="product-info">
//                                 <h2 className="product-name">{product.products[0].name}</h2>
//                                 <p className="product-price">${product.products[0].salePrice}</p>
//                                 <button className="add-to-cart-button">Add to Cart</button>
//                                 <p className="product-description">{product.products[0].description}</p>
//                             </div>
//                         </div> */}
                        
//                     {/* {product.products.map((product) => (
//                         <div key={product?.sku} className="product"  >
//                             <div className="product-image-container">
//                             <img src={product?.image} alt={product?.name} className="product-image" />
//                             </div>
//                             <div className="product-info">
//                                 <h2 className="product-name">{product?.name}</h2>
//                                 <p className="product-price">${product?.salePrice}</p>
//                                 <button className="add-to-cart-button">Add to Cart</button>
//                                 <p className="product-description">{product?.description}</p>
//                             </div>
//                         </div>
//                     ))} */}
        
//               </div>
//             </div>
//           );

//     }   else {  
        
//         return (
//             <div>Nothing</div>
//         )

//     }


    


  
// };

// export default ProductDetails;
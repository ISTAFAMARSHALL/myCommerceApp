// 

// ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

const ProductDetails = ({items, setItems}) => {
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState([]);

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

  const handleAddToCart = async (product) => {
    product['quantity'] = '1';
    console.log("clicked", product);
    
    const response = await fetch(`/cart_items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      const data = await response.json();
      
      setItems(() => [...items, data]);
      console.log("data", items);
      // history.push("/cart");
    }
  }
  
  console.log("items", items);
  console.log(items.map((item) => item.sku === product.sku ? "In Cart" : null));

  return (
    <div className="product-detail">
      {product.products &&
        product.products.map((product) => (
          <div key={product?.sku} className="product">
            <NavLink to={`/product/${product?.sku}`}>
              <div className="product-image-container">
                <img src={product?.image} alt={product?.name} className="product-image" />
              </div>
            </NavLink>
            <div className="product-details">
              <h2 className="product-name">{product?.name}</h2>
              <p className="product-price">${product?.salePrice}</p>
              {items.map((item) => item.sku === product.sku ? <p>In Cart</p> : null)}
              <button onClick={() => handleAddToCart(product)}
              className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductDetails;

// 

// ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

const ProductDetails = () => {
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
            <div className="product-info">
              <h2 className="product-name">{product?.name}</h2>
              <p className="product-price">${product?.salePrice}</p>
              <button className="add-to-cart-button">Add to Cart</button>
              <p className="product-description">{product?.description}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductDetails;

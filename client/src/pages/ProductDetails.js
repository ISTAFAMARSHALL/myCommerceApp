import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

const ProductDetails = ({cartItems, setCartItems , loggedIn}) => {
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
 
    
    const response = await fetch(`/cart_items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      const data = await response.json();
      
      setCartItems(() => [...cartItems, data]);
 
      // history.push("/cart");
    }
  }
  
 
  return (
    <div className="product-detail">
      {product.products?.map((product) => {
        const isInCart = cartItems.filter((item) => parseInt(item.sku) === product.sku).length > 0;

        return (
          <div key={product.sku} className="product-card">
            <NavLink to={`/product/${product.sku}`}>
              <img src={product.image} alt={product.name} className="product-image" />
            </NavLink>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.salePrice}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-button"
                disabled={isInCart}
              >

                {loggedIn ? isInCart ? 'In Cart' : 'Add to Cart' : 'Sign In to add to cart'}

              </button>
            </div>
          </div>
        );
      })}

      <div>
        { errors.length <= 0 ? ("") : (
        errors.map((err) => (
        <li key={err}>{err}</li>
        )))}
      </div>

    </div>
  );
};

export default ProductDetails;

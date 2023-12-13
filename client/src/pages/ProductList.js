import React from 'react'
import { useEffect , useState, useContext} from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ProductList = ({ cartItems, setCartItems , loggedIn}) => {

    const [errors, setErrors] = useState([]);

    const [products, setProducts] = useState([]);
    const history = useHistory()

    // useEffect(() => {
    //     fetch("/products/:category")
    //     .then((response) => {
    //     if (response.ok) {
    //     response.json().then((data) => {
    //         setProducts(data);
    //     });
    //     } else {
    //     response.json().then((e) => setErrors(e.errors));
    //     }});
    // }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/products/`);
          if (response.ok) {
            const data = await response.json();
            setProducts(data);
          } else {
            const errorData = await response.json();
            setErrors(errorData.errors);
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
  
      fetchData();
      
    }, []);
    
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
    <div className="product-list">
      {products.products?.map((product) => {
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
    </div>
  );
};

export default ProductList;
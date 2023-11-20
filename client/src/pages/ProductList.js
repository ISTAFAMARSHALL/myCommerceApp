import React from 'react'
import { useEffect , useState, useContext} from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ProductList = ({ setItems }) => {

    const [errors, setErrors] = useState([]);

    const [products, setProducts] = useState([]);
    const history = useHistory()

    useEffect(() => {
        fetch("/products")
        .then((response) => {
        if (response.ok) {
        response.json().then((data) => {
            setProducts(data);
        });
        } else {
        response.json().then((e) => setErrors(e.errors));
        }});
    }, []);
    
    
  return (
    <div className="product-list">
      {products.products?.map((product) => (
        <div key={product.sku} className="product-card"  >
          <NavLink to={`/product/${product.sku}`}  >
          <img src={product.image} alt={product.name} className="product-image" />
          </NavLink>
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.salePrice}</p>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
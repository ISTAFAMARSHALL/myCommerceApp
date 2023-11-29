import React from 'react'
import { useEffect , useState, useContext} from "react";
import { NavLink } from "react-router-dom";
import { useHistory , useParams} from "react-router-dom";

const ProductCatergory = ({ setItems }) => {

    const [errors, setErrors] = useState([]);
    const { category } = useParams();

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
          const response = await fetch(`/products/${category}`);
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
        console.log("data", data);
        // setItems(data.items);
        // history.push("/cart");
      }
    }

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
            <button onClick={() => handleAddToCart(product)}
            className="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCatergory;
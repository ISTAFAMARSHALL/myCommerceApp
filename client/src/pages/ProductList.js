import React from 'react'
import { useEffect , useState} from "react";


const ProductList = ({  }) => {

    const [errors, setErrors] = useState([]);

    const [products, setProducts] = useState([]);


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
    
    console.log(products.products)

  return (
    <div className="product-list">
      {products.products?.map((product) => (
        <div key={product.sku} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
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
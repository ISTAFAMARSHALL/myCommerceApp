import React from 'react';

const ProductDetail = ({ product }) => {

    const [errors, setErrors] = useState([]);

    const [product, setProduct] = useState([]);


    useEffect(() => {
        fetch("/products/:id")
        .then((response) => {
        if (response.ok) {
        response.json().then((data) => {
            setProduct(data);
        });
        } else {
        response.json().then((e) => setErrors(e.errors));
        }});
    }, []);
    
    console.log(product.products)

  return (
    <div className="product-detail">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">${product.salePrice}</p>
        <button className="add-to-cart-button">Add to Cart</button>
        <p className="product-description">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
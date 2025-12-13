import React, { useState, useEffect } from "react";
import "./ProductList.css"; // Optional: for styling

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "/api/products";

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        // The API returns an object with a 'data' array
        if (result && Array.isArray(result.data)) {
          setProducts(result.data);
        } else {
          throw new Error(
            "API response format is incorrect or 'data' is missing."
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return <div className="container">Loading products...</div>;
  }

  if (error) {
    return <div className="container error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.product_images?.image_url || "placeholder.jpg"}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-title">{product.name}</h2>
              <p className="product-description">
                {product.description
                  ? product.description.substring(0, 100) + "..."
                  : "No description"}
              </p>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

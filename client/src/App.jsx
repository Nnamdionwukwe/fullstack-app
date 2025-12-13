import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the base URL of your deployed Vercel backend
  // !!! IMPORTANT: REPLACE THIS WITH YOUR ACTUAL DOMAIN !!!
  const API_BASE_URL = "https://mall-ecommerce-api-production.up.railway.app";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch directly from the live backend API endpoint
        const response = await fetch(`${API_BASE_URL}/api/products`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Conditional Rendering
  if (loading) {
    return <div className="App">Loading products...</div>;
  }

  if (error) {
    return <div className="App error-message">Error: {error}</div>;
  }

  // Display the list
  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Catalog (Fetched from Vercel Backend)</h1>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p className="price">${product.price.toFixed(2)}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

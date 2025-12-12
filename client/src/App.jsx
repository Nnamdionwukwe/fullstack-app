import React, { useEffect, useState } from "react";
import "./App.css"; // You might want to add some CSS styles here

function App() {
  // State for the list of products
  const [products, setProducts] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch from the new endpoint we created in the backend
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data); // Store the array of products in our state
        setLoading(false); // Data has loaded
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- Conditional Rendering ---
  if (loading) {
    return <div className="App">Loading products...</div>;
  }

  if (error) {
    return <div className="App error-message">Error: {error}</div>;
  }

  // --- Main Render Logic ---
  return (
    <div className="App">
      <header className="App-header">
        <h1>Our Product Catalog</h1>
        {/* Iterate over the products array using .map() */}
        <div className="product-list">
          {products.map((product) => (
            // Assign a unique key prop for React to manage the list efficiently
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

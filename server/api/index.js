// server/api/index.js
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- In-Memory Product Data ---
const productsData = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 25.99,
    description: "Ergonomic wireless mouse.",
  },
  // ... more products ...
];

// --- API ROUTES ---

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the serverless backend!" });
});

app.get("/api/products", (req, res) => {
  res.json(productsData);
});

// IMPORTANT: Export the app instance for Vercel
module.exports = app;

// REMOVE THIS LINE: Vercel manages the port binding internally.
// app.listen(PORT, () => { ... });

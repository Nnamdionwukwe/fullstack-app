// server/api/index.js
const express = require("express");
const cors = require("cors");
// No Mongoose or dotenv needed

const app = express();

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173", // Your local frontend URL
  "http://localhost:3000", // Common alternative local frontend URL
  "https://fullstack-app-ueic.vercel.app", // Your deployed frontend URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the requesting origin is in the allowed list
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // Some older browsers choke on 204
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// --- In-Memory Product Data ---
const productsData = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 25.99,
    description: "Ergonomic wireless mouse.",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 89.5,
    description: "RGB Mechanical keyboard with clicky switches.",
  },
  {
    id: 3,
    name: "4K Monitor",
    price: 350.0,
    description: "Ultra-sharp 27-inch 4K monitor.",
  },
  {
    id: 4,
    name: "USB-C Hub",
    price: 49.99,
    description: "Multi-port adapter for modern laptops.",
  },
];

// --- API ROUTES ---

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the serverless backend!" });
});

app.get("/api/products", (req, res) => {
  try {
    // Simply return the array as a JSON response
    res.json(productsData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// IMPORTANT: Export the app instance for Vercel to handle internally
module.exports = app;

// Remove the app.listen() call.

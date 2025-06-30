// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/urlRoutes');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/errorHandler');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Establish connection to MongoDB using credentials from environment variables
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Register application routes for URL shortening functionality
app.use('/', route);

// Handle requests to undefined routes (when no route matches the incoming request) with a 404 response
// Useful for: Broken endpoints, Mistyped routes, Legacy API hits
app.use((req, res) => {
  res.status(404).send({ status: false, message: "API not found" });
});

// Centralized error handling middleware for catching and responding to errors
app.use(errorHandler);

// Export the Express app instance for use in other files (e.g., server.js)
module.exports = app;

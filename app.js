const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/urlRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/', route);

// 404 handler
app.use((req, res) => {
  res.status(404).send({ status: false, message: "API not found" });
});

module.exports = app;

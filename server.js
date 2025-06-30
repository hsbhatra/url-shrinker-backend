// Import the Express application instance from the app.js file
const app = require('./app');

// Retrieve the port number from environment variables
const PORT = process.env.PORT;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message to the console when the server is running
  console.log(`Server running on http://localhost:${PORT}`);
});

// Exporting an Express error-handling middleware function
module.exports = (err, req, res, next) => {
  // Log the error details to the console for debugging
  console.error("Error caught:", err);

  // Set the HTTP status code from the error, default to 500 if not provided
  const statusCode = err.statusCode || 500;
  // Set the error message from the error, default to a generic message if not provided
  const message = err.message || "Internal Server Error";

  // Send a JSON response with the error status and message
  return res.status(statusCode).send({
    status: false,
    message
  });
};

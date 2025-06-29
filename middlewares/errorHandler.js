module.exports = (err, req, res, next) => {
  console.error("🔥 Error caught:", err);

  // Default structure
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).send({
    status: false,
    message
  });
};

const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  // Handle express-jwt UnauthorizedError
  if (err.name === "UnauthorizedError") {
    logger.error("JWT Error:", {
      message: err.message,
      code: err.code,
      status: err.status,
    });
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      error: err.message || "Invalid or missing token",
    });
  }

  // Handle other errors
  logger.error("Unexpected Error:", {
    message: err.message,
    stack: err.stack,
  });
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error: err.message,
  });
}

module.exports = errorHandler;

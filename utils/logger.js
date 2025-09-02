const winston = require("winston");

// Create a logger instance with custom settings
const logger = winston.createLogger({
  // Set the default logging level to 'info'
  level: "info",

  // Define the format for log messages.
  format: winston.format.combine(
    // Add a timestamp to each log message.
    winston.format.timestamp(),
    // Format the log message as a JSON object.
    winston.format.json()
  ),

  // Define the destinations for the logs.
  transports: [
    // Create a file transport for error messages only.
    new winston.transports.File({ filename: "error.log", level: "error" }),
    // Create a file transport for all logs.
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console(),
  ],
});

module.exports = logger;

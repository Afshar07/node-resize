const winston = require("winston");
require("winston-daily-rotate-file");
const transport = new winston.transports.DailyRotateFile({
  filename: "logs/%DATE%/avatars.log",
  datePattern: "YYYY-MM-DD",
});

// TODO: Send user id to log it

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [transport],
});
module.exports = logger;

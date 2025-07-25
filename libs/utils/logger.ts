import winston from "winston";

const { combine, timestamp, json, printf, colorize, errors } = winston.format;

const environment = process.env.NODE_ENV || "development";

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const transports = [];

if (environment === "production") {
  transports.push(
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
    })
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        errors({ stack: true }),
        logFormat
      ),
    })
  );
}

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    errors({ stack: true }),
    environment === "production" ? json() : logFormat
  ),
  defaultMeta: { service: "lambda-service" },
  transports,
});

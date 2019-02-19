var winston = require('winston');

const FIVE_MB = 5242880;

const options = {
    file: {
      level: 'info',
      filename: `./logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: FIVE_MB,
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
    error: {
        level: 'error',
        filename: './logs/error.log',
        handleExceptions: true,
        json: true,
        maxsize: FIVE_MB,
        maxFiles: 5,
        colorize: false,
    }
};

const logger = winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.File(options.error),
      new winston.transports.Console(options.console),
    ],
    exitOnError: false,
  });

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;

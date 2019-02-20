const winston = require("./winston");
const morgan = require("morgan");

const logger = {
    general: morgan('combined', { stream: winston.stream }),
    error: winston.error,
}


module.exports = logger;
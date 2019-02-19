require('dotenv').config();
const morgan = require('morgan');

const HTTPStatus = {
    OK: 200,
    serverError: 500
}

const PORT = Number(process.env.PORT);

module.exports = {
    morgan,
    HTTPStatus,
    PORT,
};

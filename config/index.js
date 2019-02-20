require('dotenv').config();

const HTTPStatus = {
    OK: 200,
    serverError: 500
}

const PORT = Number(process.env.PORT);

module.exports = {
    HTTPStatus,
    PORT,
};

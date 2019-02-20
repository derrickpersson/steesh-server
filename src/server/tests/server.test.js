const app = require("../index.js");
const request = require("supertest");
require('dotenv').config();

const testUserData = {
    firstName: "testUser",
    lastName: "testUser",
    email: process.env.TEST_EMAIL,
    kindleEmail: process.env.TEST_KINDLE_EMAIL,
}

const testPDFData = {
    URL: "https://medium.com/@asciidev/testing-a-node-express-application-with-mocha-chai-9592d41c0083",
    userID: 62,
};

describe("server", () => {
    test("GET /health  - returns health check", () => {
        return request(app).get("/health")
            .expect('Content-Type', /json/)
            .then( response => {
                expect(response.body.uptime === typeof Number);
            })
    });

    test("POST /signUp - sign up a user", () => {
        return request(app).post("/signUp")
            .send(testUserData)
            .then( response => {
                expect(response.body.userID === typeof Number);
            });
    });

    test("POST /getPDF - saves a pdf", () => {
        jest.setTimeout(30000);
        return request(app).post("/getPDF")
            .send(testPDFData)
            .then( response => {
                expect(response.status === 200);
            });
    });
})
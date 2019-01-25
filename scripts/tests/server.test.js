const app = require("../server");
const request = require("supertest");

describe("server", () => {
    test("returns health check", () => {
        request(app).get("/health")
            .expect(200)
            .expect('Content-Type', /json/)
            .end();
    });

    test("/getPDF", () => {
        request(app).post("/getPDF")
            .send({
                URL: "testURL",
                userID: 1,
            })
            .expect(200)
            .end();
    });
})
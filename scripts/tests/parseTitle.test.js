const { parseTitle } = require("../parseTitle.js");

describe("parseTitle", () => {
    test("Normal article title is parsed", () => {
        const testURL = "http://www.example.com/test-article-name";
        const expectedTitle = "test article name";
        expect(parseTitle(testURL)).toEqual(expectedTitle);
    });

    test("Hostname returned when not normal article name", () => {
        const testURL = "http://www.example.com";
        const expectedTitle = "www.example.com";
        expect(parseTitle(testURL)).toEqual(expectedTitle);
    });
})
describe("webCrawlerService", () => {
    it("should launch a browser service", () => {
        expect.assertions(1);
        const mockWebCrawler = {
            launch: jest.fn(),
        };

        const webCrawlerService = require("../webCrawlerService")(mockWebCrawler);

        const url = "anyURL";
        const parsedTitle = "any Title";

        webCrawlerService.convertToPDF(url, parsedTitle);
        expect(mockWebCrawler.launch).toBeCalled();
    });

    it("should visit the url specified", async (done) => {
        expect.assertions(1);

        const goto = jest.fn();

        const browser = {
            newPage: function (){
                return {
                    goto: goto,
                    pdf: jest.fn(),
                }
            },
            close: jest.fn(),
        };

        const mockWebCrawler = {
            launch: function() {
                return new Promise( (resolve, reject) => {
                    resolve(browser);
                })
            }
        };

        const webCrawlerService = require("../webCrawlerService")(mockWebCrawler);
        const url = "anyURL";
        const parsedTitle = "any Title";

        webCrawlerService.convertToPDF(url, parsedTitle).then( () => {
            expect(goto).toBeCalled();
            done();
        });
    });

    it("should pdf the visited page", async (done) => {
        expect.assertions(1);

        const pdf = jest.fn();

        const browser = {
            newPage: function (){
                return {
                    goto: jest.fn(),
                    pdf: pdf,
                }
            },
            close: jest.fn(),
        };

        const mockWebCrawler = {
            launch: function() {
                return new Promise( (resolve, reject) => {
                    resolve(browser);
                })
            }
        };

        const webCrawlerService = require("../webCrawlerService")(mockWebCrawler);
        const url = "anyURL";
        const parsedTitle = "any Title";

        webCrawlerService.convertToPDF(url, parsedTitle).then( () => {
            expect(pdf).toBeCalled();
            done();
        });
    });

    it("should close the browser", async (done) => {
        expect.assertions(1);

        const browser = {
            newPage: function (){
                return {
                    goto: jest.fn(),
                    pdf: jest.fn(),
                }
            },
            close: jest.fn(),
        };

        const mockWebCrawler = {
            launch: function() {
                return new Promise( (resolve, reject) => {
                    resolve(browser);
                })
            }
        };

        const webCrawlerService = require("../webCrawlerService")(mockWebCrawler);
        const url = "anyURL";
        const parsedTitle = "any Title";

        webCrawlerService.convertToPDF(url, parsedTitle).then( () => {
            expect(browser.close).toBeCalled();
            done();
        });
    });
});
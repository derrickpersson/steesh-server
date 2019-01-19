const mockSendAPI = {
    messages: jest.fn(() => { 
        const result = {
            send: jest.fn( function (data, callback) {
                return callback()
            }),
        };
        return result;
    }),
}

const emailService = require('../emailService.js')(mockSendAPI);
const path = require('path');

describe("emailService", () => {
    test("kindleData is created", () => {
        const testUser = {
            firstName: "anyFirstName",
            lastName: "anyLastName",
            email: "anyEmail",
            kindleEmail: "anyKindleEmail",
        };

        const testTitle = "example title";

        const filepath = path.join(__dirname, `../../results/example title.pdf`);

        const expectedResult = {
            from: `anyFirstName anyLastName <anyEmail>`,
            to: "anyKindleEmail",
            subject: "Convert",
            text: "Sending article to Kindle",
            attachment: filepath
        }

        expect(emailService.createKindleData(testUser, testTitle)).toStrictEqual(expectedResult);
    });

    test("PDF is emailed", () => {
        expect.assertions(2);
        const filepath = path.join(__dirname, `../../results/example title.pdf`);

        const exampleData = {
            from: `anyFirstName anyLastName <anyEmail>`,
            to: "anyKindleEmail",
            subject: "Convert",
            text: "Sending article to Kindle",
            attachment: filepath
        };

        emailService.sendPDF(exampleData).then((data) => {
            expect(mockSendAPI.messages).toBeCalled();
            expect(mockSendAPI.messages().send).toBeCalled();
        });
    });
});


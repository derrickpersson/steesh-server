const mockDb = jest.fn((table) => {
    return {
        returning: jest.fn((field) => {
            return {
                insert: jest.fn(),
            }
        }),
    }
});

const dataHelpers = require("../dataHelpers.js")(mockDb);


describe("datahelpers", () => {
    test("inserting user", async () => {
        const testUser = {
            firstName: "anyFirstName",
            lastName: "anyLastName",
            email: "anyEmail",
            kindleEmail: "anyKindleEmail",
        };
        const mockUserID = 1;
        mockDb.mockReturnValue([mockUserID]);

        const userID = await dataHelpers.insertUser(testUser);
        expect(userID).toBe(mockUserId);
    })
});


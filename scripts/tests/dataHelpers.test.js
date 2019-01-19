const mockDb = function(table){
    return {
        returning: function(field){
            return {
                insert: jest.fn(),
            }
        }
    }
};

const dataHelpers = require("../dataHelpers.js")(mockDb);

describe("datahelpers", () => {
    test("inserting user", async () => {
        const testUser = {
            firstName: "anyFirstName",
            lastName: "anyLastName",
            email: "anyEmail",
            kindleEmail: "anyKindleEmail",
        };
        const mockUsersID = [1];
        mockDb().returning().insert.mockReturnValue(() => Promise.resolve(mockUsersID));
        console.log(await mockDb().returning().insert())

        const userID = await dataHelpers.insertUser(testUser);
        expect(userID).toBe(mockUserId);
    })
});


describe("datahelpers", () => {
    test("inserting user", () => {
        expect.assertions(1);
        const testUser = {
            firstName: "anyFirstName",
            lastName: "anyLastName",
            email: "anyEmail",
            kindleEmail: "anyKindleEmail",
        };
        const mockUsersID = [1];


        const mockDb = function(table){
            return {
                returning: function(field){
                    return {
                        insert: jest.fn(function(userInfo){
                            return new Promise(function(resolve, reject){
                                return resolve(mockUsersID);
                            });
                        }),
                    }
                }
            }
        };

        const dataHelpers = require("../dataHelpers.js")(mockDb);

        dataHelpers.insertUser(testUser).then(function(userID){
            expect(userID).toBe(mockUsersID[0]);
        });
    });

    test("should return user by id", async () => {
        expect.assertions(1);

        const testUser = {
            id: 1,
            firstName: "test",
            lastName: "test",
            email: "anyEmail",
            kindleEmail: "anyKindleEmail"
        };
        
        const mockDb = {
            select: function() {
                return {
                    from: function() {
                        return {
                            where: jest.fn( function(userId) {
                                return new Promise(function(resolve, reject){
                                    return resolve([testUser]);
                                });
                            })
                        }
                    }
                }
            }
        }

        const dataHelpers = require("../dataHelpers.js")(mockDb);

        dataHelpers.getUserByID(1).then((user) => {

            expect(user).toBe(testUser);
        });
    })
});


import UserService from './UserService';
import HttpService from './HttpService';

jest.mock("./HttpService");

describe("UserService", () => {
    it("register should with username and password get data from POST /spaces/register ", async () => {
        const testUserName:string = "testUserName";
        const testUserPassword:string = "testUserPassword";
        const expectedData:Object = {};
        
        const mockedHttpServicePost = HttpService.post as unknown as jest.Mock;
        mockedHttpServicePost.mockResolvedValue(expectedData);

        const actualData = await UserService.register(testUserName, testUserPassword);

        expect(actualData).toBe(expectedData);
        expect(mockedHttpServicePost).toHaveBeenCalledWith("/spaces/register", { username: testUserName, password: testUserPassword});
      });

      it("login should with username and password set localstorage user from POST /spaces/authenticate ", async () => {
        const testUserName:string = "testUserName";
        const testUserPassword:string = "testUserPassword";
        const expectedData:Object = { token: "testToken"};
        
        const mockedHttpServicePost = HttpService.post as unknown as jest.Mock;
        mockedHttpServicePost.mockResolvedValue({data: expectedData});

        await UserService.login(testUserName, testUserPassword);
        const actualData = localStorage.getItem("user");

        expect(actualData).toBe(JSON.stringify(expectedData));
        expect(mockedHttpServicePost).toHaveBeenCalledWith("/spaces/authenticate", { username: testUserName, password: testUserPassword});
      });

      it("logout should clean localstorage user", async () => {
        localStorage.setItem("user", "testUser");

        UserService.logout();

        const actualData = localStorage.getItem("user");
        expect(actualData).toBeNull();
      });

      it ("getAll should get with headers /spaces/users", async () => {
        const expectedUsers: never[] = [];
        const mockedHttpServiceGet = HttpService.get as unknown as jest.Mock;
        mockedHttpServiceGet.mockResolvedValue(expectedUsers);

        const actualUsers = await UserService.getAll();

        expect(actualUsers).toBe(expectedUsers);
        expect(mockedHttpServiceGet).toHaveBeenCalledWith("/spaces/users", { "headers": {}});
      });
});

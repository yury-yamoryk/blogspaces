import WebTokenHelper from './WebTokenHelper';

describe("WebTokenHelper", () => {
      it("buildHttpHeader should return the token from localstorage", async () => {
        localStorage.setItem("user", JSON.stringify({ token: "testToken" }));

        const headerContainer = WebTokenHelper.buildHttpHeader();

        expect(headerContainer.Authorization).toBe("Bearer testToken");
      });
});
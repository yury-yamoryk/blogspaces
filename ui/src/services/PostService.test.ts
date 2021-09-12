import Post from '../entities/Post';
import Theme from '../entities/Theme';
import PostService from './PostService';
import HttpService from './HttpService';

jest.mock("./HttpService");

describe("PostService", () => {
      it("getPost should return GetPostResponse", async () => {
          var httpResponse: { optionalPost: Post, optionalTheme: Theme } = {
            optionalPost: {
                id: "testPostId",
                title: "Test Post",
                description: "Test Post Description",
                comments: [
                    {"id":"1","text":"Test Comment 1 Text","userName":"Comment User 1"},
                    {"id":"2","text":"Test Comment 2 Text","userName":"Comment User 2"}
                ]
            },
            optionalTheme: {
                id: "testTheme",
                blogColor: "#800000",
                postColor: "#800000",
                commentColor: "#800000",
                blogBackgroundColor: "#ffc0cb",
                postBackgroundColor: "#ff7373",
                commentBackgroundColor: "#ffe4e1"
            }
          };

        const mockedHttpServiceGet = HttpService.get as unknown as jest.Mock;
        mockedHttpServiceGet.mockResolvedValue({data: httpResponse });

        const actualData:typeof httpResponse = await PostService.getPost("testUser/testBlog/testPost");

        expect(actualData).not.toBeNull();
        expect(actualData.optionalPost).toEqual(httpResponse.optionalPost);
        expect(actualData.optionalTheme).toEqual(httpResponse.optionalTheme);
      });
});

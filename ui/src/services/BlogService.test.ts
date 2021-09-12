import BlogService from './BlogService';
import HttpService from './HttpService';
import Blogs from '../entities/Blogs';
import User from '../entities/User';
import Blog from '../entities/Blog';

jest.mock("./HttpService");

describe("BlogService", () => {
    it("getAll should filter blogs by filterUserName", async () => {
        const filterUserName = "user2";
        const httpData:User[] = [
            { name: "user1", blogs: [{id:"blog1", title:"Blog 1", theme: null, posts: null}]},
            { name: "user2", blogs: [{id:"blog2", title:"Blog 2", theme: null, posts: null}]},
            { name: "user3", blogs: [{id:"blog3", title:"Blog 3", theme: null, posts: null}]},
        ];
        
        const mockedHttpServiceGet = HttpService.get as unknown as jest.Mock;
        mockedHttpServiceGet.mockResolvedValue({data: httpData});

        const actualData:Blogs = await BlogService.getAll(filterUserName);

        expect(actualData).toBeDefined();
        expect(actualData.userBlogs).toBeDefined();
        expect(actualData.userBlogs.length).toBe(1);
        expect(actualData.userBlogs[0].link).toBe("spaces/user2/blog2");

        expect(actualData.otherBlogs).toBeDefined();
        expect(actualData.otherBlogs.length).toBe(2);
        expect(actualData.otherBlogs[0].link).toBe("spaces/user1/blog1");
        expect(actualData.otherBlogs[1].link).toBe("spaces/user3/blog3");
      });

      it("getBlog should create link in posts", async () => {
        const httpResponse:Blog = {
            id:"testBlog",
            title:"Test Blog",
            posts:[
                { id: "1", description: null, title: "Test Post 1", comments: null },
                { id: "2", description: null, title: "Test Post 2", comments: null },
            ],
            theme: null,
        };

        const mockedHttpServiceGet = HttpService.get as unknown as jest.Mock;
        mockedHttpServiceGet.mockResolvedValue({data: { optionalBlog: httpResponse }});

        const actualData:Blog = await BlogService.getBlog("testUser/testBlog");

        expect(actualData).not.toBeNull();
        expect(actualData.posts?.length).toBe(2);
        expect(actualData!.posts![0].link).toBe("testUser/testBlog/1");
        expect(actualData!.posts![1].link).toBe("testUser/testBlog/2");
      });
});

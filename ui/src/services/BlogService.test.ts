import BlogService from './BlogService';
import HttpService from './HttpService';
import Blogs from '../entities/Blogs';
import User from '../entities/User';

jest.mock("./HttpService");

describe("BlogService", () => {
    it("getAll should filter blogs by filterUserName", async () => {
        const filterUserName = "user2";
        const httpData:User[] = [
            { name: "user1", blogs: [{id:"blog1", title:"Blog 1", link: undefined}]},
            { name: "user2", blogs: [{id:"blog2", title:"Blog 2", link: undefined}]},
            { name: "user3", blogs: [{id:"blog3", title:"Blog 3", link: undefined}]},
        ];
        
        const mockedHttpServiceGet = HttpService.get as unknown as jest.Mock;
        mockedHttpServiceGet.mockResolvedValue({data: httpData});

        const actualData:Blogs = await BlogService.getAll(filterUserName);

        expect(actualData).toBeDefined();
        expect(actualData.userBlogs).toBeDefined();
        expect(actualData.userBlogs.length).toBe(1);
        expect(actualData.userBlogs[0]).toEqual({ id: "blog2", title:"Blog 2", link:"user2/blog2"});

        expect(actualData.otherBlogs).toBeDefined();
        expect(actualData.otherBlogs.length).toBe(2);
        expect(actualData.otherBlogs[0]).toEqual({ id: "blog1", title:"Blog 1", link:"user1/blog1"});
        expect(actualData.otherBlogs[1]).toEqual({ id: "blog3", title:"Blog 3", link:"user3/blog3"});
      });
});

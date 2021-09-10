import http from "./HttpService";
import Blog from "../entities/Blog";
import User from "../entities/User";

const getAll: (filterUserName?: string) => Promise<{ userBlogs: Blog[], otherBlogs: Blog[]}>
= async (filterUserName?: string) => {
    const response: any = await http.get("/users");
    const users: User[] = response.data;
    console.log(users);
    const filterUser = users.filter((user) => user.name == filterUserName);
    const otherUsers = users.filter((user) => user.name != filterUserName);
    return {
        userBlogs: filterUser.flatMap(user => {
            return user.blogs ? user.blogs.map((blog) => ({...blog, link: user.name + "/" + blog.id})) : [];
        }),
        otherBlogs: otherUsers.flatMap(user => {
            return user.blogs ? user.blogs.map((blog) => ({...blog, link: user.name + "/" + blog.id})) : [];
        }),
    };
};

const BlogService = {
  getAll,
};

export default BlogService
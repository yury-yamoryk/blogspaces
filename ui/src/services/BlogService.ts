import http from "./HttpService";
import Blog from "../entities/Blog";
import User from "../entities/User";

const spacesPrefix = "spaces/";

const getAll: (filterUserName: string) => Promise<{ userBlogs: Blog[], otherBlogs: Blog[]}>
= async (filterUserName?: string) => {
    const response: any = await http.get("/spaces/users");
    const users: User[] = response.data;
    const filterUser = users.filter((user) => user.name == filterUserName);
    const otherUsers = users.filter((user) => user.name != filterUserName);
    return {
        userBlogs: filterUser.flatMap(user => {
            return user.blogs ? user.blogs.map((blog) => ({...blog, link: spacesPrefix + user.name + "/" + blog.id})) : [];
        }),
        otherBlogs: otherUsers.flatMap(user => {
            return user.blogs ? user.blogs.map((blog) => ({...blog, link: spacesPrefix + user.name + "/" + blog.id})) : [];
        }),
    };
};

const getBlog: (blogPath: string) => Promise<Blog>
= async (blogPath: string) => {
    const response: any = await http.get(blogPath);
    const blog: Blog = response.data.optionalBlog;
    if (!blog) {
        return { id: "", title: "", posts: [], theme: null};
    }
    if (blog.posts) {
        blog.posts = blog.posts.map(post => ({...post, link: blogPath + "/" + post.id }));
    }
    return blog;
};

const createBlog = async (userName: string, newBlog: Blog, themeId: string) => {
    const response: any = await http.post("/spaces/createBlog", {
        userName,
        blogId: newBlog.id,
        blogTitle: newBlog.title,
        themeId: themeId
    });

    return response.data;
};

const BlogService = {
  getAll,
  getBlog,
  createBlog,
};

export default BlogService
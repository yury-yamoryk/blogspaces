import Blog from "../entities/Blog";
import BlogService from "../services/BlogService";
import { setMessage } from "./message";
import { CREATE_BLOG, GET_ALL_BLOGS, GET_BLOG } from "./types";

export const getAllBlogs = (filterUserName: string) => async (dispatch) => {
    try {
        const allBlogs = await BlogService.getAll(filterUserName);

        dispatch({
            type: GET_ALL_BLOGS,
            allBlogs
        });
    } catch (error) {
        console.log(error);
    }
};

export const getBlog = (blogPath: string) => async (dispatch) => {
    try {
        const blog = await BlogService.getBlog(blogPath);

        dispatch({
            type: GET_BLOG,
            blog
        });
    } catch (error) {
        console.log(error);
    }
};

export const createBlog = (userName: string, blog: Blog, themeId: string) => async (dispatch) => {
    const response = await BlogService.createBlog(userName, blog, themeId);
    if (response.message) {
        dispatch(setMessage(response.message));
    } else {
        const newBlog = response.newBlog;
        dispatch({
            type: CREATE_BLOG,
            newBlog
        });
    }
    return response;
};

export const deleteBlog = (userName: string, blogId: string) => async (dispatch) => {
    const response = await BlogService.deleteBlog(userName, blogId);
    if (response.message) {
        dispatch(setMessage(response.message));
    }

    return response;
};
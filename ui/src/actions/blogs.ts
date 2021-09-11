import BlogService from "../services/BlogService";
import { GET_ALL_BLOGS, GET_BLOG } from "./types";

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
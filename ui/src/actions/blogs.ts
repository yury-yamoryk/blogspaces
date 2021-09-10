import BlogService from "../services/BlogService";
import { GET_ALL_BLOGS } from "./types";

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
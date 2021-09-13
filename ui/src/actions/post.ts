import Post from "../entities/Post";
import PostService from "../services/PostService";
import { setMessage } from "./message";
import { CREATE_POST, GET_POST } from "./types";

export const getPost = (postPath: string) => async (dispatch) => {
    try {
        const getPostResponse = await PostService.getPost(postPath);

        dispatch({
            type: GET_POST,
            getPostResponse
        });
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (userName: string, blogId: string, post: Post) => async (dispatch) => {
    const response = await PostService.createPost(userName, blogId, post);
    if (response.message) {
        dispatch(setMessage(response.message));
    } else {
        const newPost = response.newPost;
        dispatch({
            type: CREATE_POST,
            newPost,
        });
    }
    return response;
};

export const deletePost = (userName: string, blogId: string, postId: string) => async (dispatch) => {
    const response = await PostService.deletePost(userName, blogId, postId);
    if (response.message) {
        dispatch(setMessage(response.message));
    }
    
    return response;
};
import PostService from "../services/PostService";
import { GET_POST } from "./types";

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
import Comment from "../entities/Comment";
import CommentService from "../services/CommentService";
import { setMessage } from "./message";
import { ADD_COMMENT } from "./types";

export const createComment = (userName: string, blogId: string, postId: string, comment: Comment) => async (dispatch) => {
    const response = await CommentService.createComment(userName, blogId, postId, comment);
    if (response.message) {
        dispatch(setMessage(response.message));
    } else {
        const newComment = response.newComment;
        dispatch({
            type: ADD_COMMENT,
            newComment,
        });
    }
    return response;
};
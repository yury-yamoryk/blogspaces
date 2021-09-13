import http from "./HttpService";
import Comment from "../entities/Comment";
import WebTokenHelper from "../helpers/WebTokenHelper";

const createComment = async (userName: string, blogId: string, postId: string, newComment: Comment) => {
  const response: any = await http.post("/spaces/createComment", {
      userName,
      blogId,
      postId,
      commentText: newComment.text,
      commentUserName: newComment.userName,
  }, { headers:  WebTokenHelper.buildHttpHeader()});

  return response.data;
};

const CommentService = {
  createComment,
};

export default CommentService
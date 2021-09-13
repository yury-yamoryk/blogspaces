import http from "./HttpService";
import Post from "../entities/Post";
import Theme from "../entities/Theme";
import WebTokenHelper from "../helpers/WebTokenHelper";

const getPost: (postPath: string) => Promise<{ optionalPost: Post, optionalTheme: Theme }>
= async (postPath: string) => {
    const httpResponse: any = await http.get(postPath);
    return httpResponse.data;
};

const createPost = async (userName: string, blogId: string, newPost: Post) => {
  const response: any = await http.put("/spaces/post", {
      userName,
      blogId,
      postId: newPost.id,
      postTitle: newPost.title,
      postDescription: newPost.description,
  }, { headers:  WebTokenHelper.buildHttpHeader()});

  return response.data;
};

const deletePost = async (userName: string, blogId: string, postId: string) => {
  const response: any = await http.post("/spaces/post", {
      userName,
      blogId,
      postId,
  }, { headers:  WebTokenHelper.buildHttpHeader()});

  return response.data;
};

const PostService = {
  getPost,
  createPost,
  deletePost,
};

export default PostService
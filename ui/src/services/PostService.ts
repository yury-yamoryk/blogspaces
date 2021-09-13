import http from "./HttpService";
import Post from "../entities/Post";
import Theme from "../entities/Theme";

const getPost: (postPath: string) => Promise<{ optionalPost: Post, optionalTheme: Theme }>
= async (postPath: string) => {
    const httpResponse: any = await http.get(postPath);
    return httpResponse.data;
};

const createPost = async (userName: string, blogId: string, newPost: Post) => {
  const response: any = await http.post("/spaces/createPost", {
      userName,
      blogId,
      postId: newPost.id,
      postTitle: newPost.title,
      postDescription: newPost.description,
  });

  return response.data;
};

const PostService = {
  getPost,
  createPost,
};

export default PostService
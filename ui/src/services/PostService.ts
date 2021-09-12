import http from "./HttpService";
import Post from "../entities/Post";
import Theme from "../entities/Theme";

const getPost: (postPath: string) => Promise<{ optionalPost: Post, optionalTheme: Theme }>
= async (postPath: string) => {
    const httpResponse: any = await http.get(postPath);
    return httpResponse.data;
};

const PostService = {
  getPost,
};

export default PostService
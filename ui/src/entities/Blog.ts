import Post from "./Post";
import Theme from "./Theme";

export default interface Blog {
    id: string | null,
    title: string,
    theme: Theme | null,
    posts: Post[] | null,
    link?: string,
}
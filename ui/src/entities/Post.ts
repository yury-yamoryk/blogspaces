import Comment from "./Comment";

export default interface Post {
    id: string | null,
    title: string,
    description: string | null,
    comments: Comment[] | null,
    link?: string,
}
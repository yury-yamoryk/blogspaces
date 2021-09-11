export default interface Post {
    id: string,
    title: string,
    description: string | null,
    link?: string,
}
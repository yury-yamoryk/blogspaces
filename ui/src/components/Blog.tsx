import React, { useState, useEffect } from "react";
import BlogService from "../services/BlogService";
import { default as BlogEntity } from '../entities/Blog';
import {
    getBlog, deleteBlog
} from '../actions/blog';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import WebTokenData from "../entities/WebTokenData";

const Blog: React.FC = (props: any) => { 
    const userData = useSelector<any, WebTokenData>(state => state.authentication.user);
    const location = useLocation();
    const blog = useSelector<any, BlogEntity>(state => state.blog);
    const dispatch = useDispatch<(action:any)=>any>();

    if (!blog.id) {
        props.history.goBack();
    }
    
    useEffect(() => {
        dispatch(getBlog(location.pathname));
    }, []);

    const newPost = () => {
        props.history.push("/spaces/createpost/" + blog.id);
        window.location.reload();
    };

    const trashBlog = () => {
        const ownerUserName = props.match.params.userName;
        const blogId = props.match.params.blogId;
        dispatch(deleteBlog(ownerUserName, blogId))
            .then(response => {
                props.history.goBack();
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row" style={
            blog.theme
            ? { 
                backgroundColor: blog.theme?.blogBackgroundColor,
                color: blog.theme.blogColor,
            }
            : {}}>
            <div className="col-md-12">
                <h1>{blog.title}</h1>

                {userData && userData.username == props.match.params.userName &&
                <button className="btn btn-success" onClick={newPost}>
                    Add Post
                </button>}

                {blog.posts && (
                    <ul className="list-group">
                        {blog.posts.map((post, index) => (
                            <li className="list-group-item" key={index}>
                                <Link to={post.link!} className="nav-link">
                                    {post.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {userData && userData.username == props.match.params.userName &&
                <button className="btn btn-danger" onClick={trashBlog}>
                    Delete Blog
                </button>}

                {(!blog.posts || blog.posts.length == 0) && (
                    <span>Nothing here right now.</span>
                )}
            </div>
        </div>
    );
};

export default Blog
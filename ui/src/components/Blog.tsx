import React, { useState, useEffect } from "react";
import BlogService from "../services/BlogService";
import { default as BlogEntity } from '../entities/Blog';
import {
    getBlog,
} from '../actions/blogs';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Blog: React.FC = (props) => { 
    const location = useLocation();
    const blog = useSelector<any, BlogEntity>(state => state.blog);
    const dispatch = useDispatch<(action:any)=>any>();
    
    useEffect(() => {
        dispatch(getBlog(location.pathname));
    }, []);

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

                {(!blog.posts || blog.posts.length == 0) && (
                    <span>Nothing here right now.</span>
                )}
            </div>
        </div>
    );
};

export default Blog
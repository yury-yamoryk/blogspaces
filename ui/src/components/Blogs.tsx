import React, { useState, useEffect } from "react";
import { default as BlogsEntity } from '../entities/Blogs';
import { default as UserEntity } from '../entities/User';
import {
    getAllBlogs,
} from '../actions/blogs'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs: React.FC = () => { 
    const blogs = useSelector<any, BlogsEntity>(state => state.blogs);
    const user = useSelector<any, UserEntity>(state => state.authentication.user);
    const dispatch = useDispatch<(action:any)=>any>();
    
    useEffect(() => {
        dispatch(getAllBlogs(user && user.name));
    }, []);

    return (
        <div className="list row">
            <div className="col-md-12">
                <h1>Blogs</h1>

                {blogs.userBlogs && (
                    <ul className="list-group">
                        {blogs.userBlogs.map((blog, index) => (
                            <li className="list-group-item" key={index}>
                                <Link to={blog.link!} className="nav-link">
                                    {blog.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {blogs.otherBlogs && (
                    <ul className="list-group">
                        {blogs.otherBlogs.map((blog, index) => (
                            <li className="list-group-item" key={index}>
                                <Link to={blog.link!} className="nav-link">
                                    {blog.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {(!blogs.userBlogs || blogs.userBlogs.length == 0) && (!blogs.otherBlogs || blogs.otherBlogs.length == 0) && (
                    <span>The space is ready for blogs. Please, create your blog.</span>
                )}
            </div>
        </div>
    );
};

export default Blogs
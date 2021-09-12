import React, { useState, useEffect } from "react";
import PostService from "../services/PostService";
import { default as PostEntity } from '../entities/Post';
import { default as ThemeEntity } from '../entities/Theme';
import {
    getPost,
} from '../actions/post';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Post: React.FC = (props) => { 
    const location = useLocation();
    const post = useSelector<any, PostEntity>(state => state.post);
    const blogTheme = useSelector<any, ThemeEntity>(state => state.blog.theme);
    const dispatch = useDispatch<(action:any)=>any>();
    
    useEffect(() => {
        dispatch(getPost(location.pathname));
    }, []);

    return (
        <div className="list row" style={
            blogTheme
            ? { 
                backgroundColor: blogTheme.postBackgroundColor,
                color: blogTheme.postColor,
            }
            : {}}>
            <div className="col-md-12">
                <h1>{post.title}</h1>

                <div>
                    {post.description}
                </div>

                {post.comments && (
                    <ul className="list-group">
                        {post.comments.map((comment, index) => (
                            <li className="list-group-item" key={index}>
                                <div>
                                    <span className="commentUserName">{comment.userName}: </span>
                                    {comment.text}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Post
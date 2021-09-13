import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { default as PostEntity } from '../entities/Post';
import { default as ThemeEntity } from '../entities/Theme';
import {
    getPost,
} from '../actions/post';
import {
    createComment
} from '../actions/comment'
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearMessage } from "../actions/message";
import Form from "react-validation/build/form";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import WebTokenData from "../entities/WebTokenData";
import Comment from "../entities/Comment";

const notEmpty = (value:string) => {
    if (!value) {
        return (
        <div className="alert alert-danger" role="alert">
            (cannot be empty)
        </div>
        );
    }
};

const Post: React.FC = (props: any) => { 
    const userData = useSelector<any, WebTokenData>(state => state.authentication.user);
    const form = useRef();
    const checkBtn = useRef();
    
    const location = useLocation();
    const post = useSelector<any, PostEntity>(state => state.post);
    const blogTheme = useSelector<any, ThemeEntity>(state => state.blog.theme);
    const dispatch = useDispatch<(action:any)=>any>();
    const [newCommentText, setNewCommentText] = useState<string>("");
    const message = useSelector<any, string>(state => state.message.message);

    const onChangeCommentText = (e: ChangeEvent<HTMLInputElement>) => {
        const commentText = e.target.value;
        setNewCommentText(commentText);
    };
    
    useEffect(() => {
        dispatch(getPost(location.pathname));
    }, []);

    const leaveComment = (e) => {
        e.preventDefault();

        dispatch(clearMessage());

        (form as any).current.validateAll();

        if ((checkBtn as any).current.context._errors.length === 0) {
            const comment: Comment = {
                id: -1,
                text: newCommentText,
                userName: userData.username,
            }
            const ownerUserName = props.match.params.userName;
            const blogId = props.match.params.blogId;
            const postId = props.match.params.postId;
            dispatch(createComment(ownerUserName, blogId, postId, comment));
        }
    };

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

                {userData && <Form onSubmit={leaveComment} ref={form}>
                    <div className="col-md-8">
                        <div className="input-group mb-3">
                            <TextArea style={
                                blogTheme
                                ? { 
                                    backgroundColor: blogTheme.commentBackgroundColor,
                                    color: blogTheme.commentColor,
                                }
                                : {}}
                                type="text"
                                className="form-control"
                                placeholder="Leave a comment..."
                                value={newCommentText}
                                onChange={onChangeCommentText}
                                validations={[notEmpty]}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>

                    {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                        {message}
                        </div>
                    </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>}

                {post.comments && (
                    <ul className="list-group">
                        {post.comments.map((comment, index) => (
                            <li className="list-group-item" key={index}>
                                <div style={
                                    blogTheme
                                    ? { 
                                        backgroundColor: blogTheme.commentBackgroundColor,
                                        color: blogTheme.commentColor,
                                    }
                                    : {}}>
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
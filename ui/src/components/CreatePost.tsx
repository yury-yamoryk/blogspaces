import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from '../actions/post'
import { clearMessage } from '../actions/message';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import WebTokenData from "../entities/WebTokenData";
import Post from "../entities/Post";

const required = (value:string) => {
    if (!value) {
        return (
        <div className="alert alert-danger" role="alert">
            (required)
        </div>
        );
    }
};
  
const verifyPostUrlId = (value:string) => {
    if (!value.match(/^[a-zA-Z0-9-]+$/g))
    return (
    <div className="alert alert-danger" role="alert">
        (must be at least 1 character from alpha-numeric and hyphens)
    </div>
    );
};

const CreatePost: React.FC = (props: any) => {
    const userData = useSelector<any, WebTokenData>(state => state.authentication.user);
    if (!userData) {
        props.history.goBack();
    }

    const form = useRef();
    const checkBtn = useRef();

    const [postId, setPostId] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [successful, setSuccessful] = useState(false);
    
    const message = useSelector<any, string>(state => state.message.message);
    const dispatch = useDispatch<(action:any)=>any>();

    const onChangePostId = (e: { target: { value: string; }; }) => {
        const postId = e.target.value;
        setPostId(postId);
    };

    const onChangePostTitle = (e: { target: { value: string; }; }) => {
        const postTitle = e.target.value;
        setPostTitle(postTitle);
    };

    const onChangePostDescription = (e: { target: { value: string; }; }) => {
        const postDescription = e.target.value;
        setPostDescription(postDescription);
    };

    const submit = (e) => {
        e.preventDefault();

        dispatch(clearMessage());
        setSuccessful(false);

        (form as any).current.validateAll();

        if ((checkBtn as any).current.context._errors.length === 0) {
            const post: Post = {
                id: postId,
                title: postTitle,
                description: postDescription,
                comments: null,
            }
            const blogId = props.match.params.blogId;
            dispatch(createPost(userData.username, blogId, post))
                .then((createPostResponse) => {
                    if (!createPostResponse.message) {
                        setSuccessful(true);
                    } else {
                        setSuccessful(false);
                    }
                });
        } else {
            setSuccessful(false);
        }
    };

    if (successful) {
        props.history.goBack();
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
            <Form onSubmit={submit} ref={form}>
                {!successful && (
                <div>
                    <div>
                        <label htmlFor="blogId">POST URL ID</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="postId"
                            value={postId}
                            onChange={onChangePostId}
                            validations={[required, verifyPostUrlId]}
                        />
                    </div>

                    <div>
                        <label htmlFor="blogTitle">POST TITLE</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="postTitle"
                            value={postTitle}
                            onChange={onChangePostTitle}
                            validations={[required]}
                        />
                    </div>

                    <div>
                        <label htmlFor="blogTitle">POST DESCRIPTION</label>
                        <TextArea
                            className="form-control"
                            name="postDescription"
                            value={postDescription}
                            onChange={onChangePostDescription}
                            validations={[required]}
                        />
                    </div>

                    <div className="text-center">
                        <button className="btn btn-light btn-block">CREATE POST</button>
                    </div>
                </div>
                )}

                {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                    {message}
                    </div>
                </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            </div>
        </div>
    );
};

export default CreatePost;
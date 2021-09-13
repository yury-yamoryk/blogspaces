import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "../entities/Blog";
import { Redirect } from 'react-router-dom';
import { createBlog } from '../actions/blog'
import { clearMessage } from '../actions/message';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import { getThemes } from "../actions/theme";
import Theme from "../entities/Theme";
import WebTokenData from "../entities/WebTokenData";

const required = (value:string) => {
    if (!value) {
        return (
        <div className="alert alert-danger" role="alert">
            (required)
        </div>
        );
    }
};
  
const verifyBlogUrlId = (value:string) => {
    if (!value.match(/^[a-zA-Z0-9-]+$/g))
    return (
    <div className="alert alert-danger" role="alert">
        (must be at least 1 character from alpha-numeric and hyphens)
    </div>
    );
};

const CreateBlog: React.FC = (props:any) => {
    const userData = useSelector<any, WebTokenData>(state => state.authentication.user);
    if (!userData) {
        props.history.goBack();
    }

    const form = useRef();
    const checkBtn = useRef();

    const themes = useSelector<any, Theme[]>(state => state.theme);
    const [blogId, setBlogId] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const [blogThemeId, setBlogThemeId] = useState("");
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        dispatch(getThemes()).then((getThemesResponse) => {
            if (getThemesResponse) {
                setBlogThemeId(getThemesResponse.themes[0].id);
            }
        });
    }, []);
    
    const message = useSelector<any, string>(state => state.message.message);
    const dispatch = useDispatch<(action:any)=>any>();

    const onChangeBlogId = (e: { target: { value: string; }; }) => {
        const blogId = e.target.value;
        setBlogId(blogId);
    };

    const onChangeBlogTitle = (e: { target: { value: string; }; }) => {
        const blogTitle = e.target.value;
        setBlogTitle(blogTitle);
    };

    const onChangeBlogThemeId = (e: { target: { value: string; }; }) => {
        const blogThemeId = e.target.value;
        setBlogThemeId(blogThemeId);
    };

    const submit = (e) => {
        e.preventDefault();

        dispatch(clearMessage());
        setSuccessful(false);

        (form as any).current.validateAll();

        if ((checkBtn as any).current.context._errors.length === 0) {
            const blog: Blog = {
                id: blogId,
                title: blogTitle,
                theme: null,
                posts: null,
            }
            dispatch(createBlog(userData.username, blog, blogThemeId))
                .then((createBlogResponse) => {
                    if (!createBlogResponse.message) {
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
        return <Redirect to="/spaces" />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
            <Form onSubmit={submit} ref={form}>
                {!successful && (
                <div>
                    <div>
                        <label htmlFor="blogId">BLOG URL ID</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="blogId"
                            value={blogId}
                            onChange={onChangeBlogId}
                            validations={[required, verifyBlogUrlId]}
                        />
                    </div>

                    <div>
                        <label htmlFor="blogTitle">BLOG TITLE</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="blogTitle"
                            value={blogTitle}
                            onChange={onChangeBlogTitle}
                            validations={[required]}
                        />
                    </div>

                    <div>
                        <label htmlFor="blogTitle">BLOG THEME</label>
                        <Select
                            className="form-control"
                            name="blogThemeId"
                            value={blogThemeId}
                            onChange={onChangeBlogThemeId}
                            validations={[required]}
                        >
                            {themes && themes.map((theme, index) => (
                            <option value={theme.id} key={index}>{theme.name}</option>
                            ))}
                        </Select>
                    </div>

                    <div className="text-center">
                        <button className="btn btn-light btn-block">CREATE BLOG</button>
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

export default CreateBlog;
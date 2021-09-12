import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from 'react-validation/build/form';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { loginUser } from "../actions/user";

const required = (value:string) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        (required)
      </div>
    );
  }
};

const SignIn = (props: any) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isLoggedIn = useSelector<any, boolean>(state => state.authentication.isLoggedIn);
  const message = useSelector<any, any>(state => state.message.message);

  const dispatch = useDispatch<(action:any)=>any>();

  const onChangeUsername = (e: { target: { value: string; }; }) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e: { target: { value: string; }; }) => {
    const password = e.target.value;
    setPassword(password);
  };

  const signIn = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setLoading(true);

    (form.current as any).validateAll();

    if ((checkBtn as any).current.context._errors.length === 0) {
      dispatch(loginUser(username, password))
        .then(() => {
          props.history.push("/");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/spaces" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={signIn} ref={form}>
            <div className="form-group">
                <label htmlFor="username">USER NAME</label>
                <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required]}
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">PASSWORD</label>
                <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                />
            </div>

            <div className="text-center">
              <button className="btn btn-light btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>SIGN IN</span>
              </button>
            </div>

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

export default SignIn;
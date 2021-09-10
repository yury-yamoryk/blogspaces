import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { registerUser } from "../actions/user";

const required = (value:string) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        (required)
      </div>
    );
  }
};

const verifyUsername = (value:string) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        (must be between 3 and 20 characters)
      </div>
    );
  }
};

const verifyPassword = (value:string) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        (must be between 6 and 40 characters)
      </div>
    );
  }
};

const SignUp = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const message = useSelector<any, string>(state => state.message.message);
  const dispatch = useDispatch<(action:any)=>any>();

  const onChangeUsername = (e: { target: { value: string; }; }) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e: { target: { value: string; }; }) => {
    const password = e.target.value;
    setPassword(password);
  };

  const signUp = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setSuccessful(false);

    (form as any).current.validateAll();

    if ((checkBtn as any).current.context._errors.length === 0) {
      dispatch(registerUser(username, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  if (successful) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={signUp} ref={form}>
          {!successful && (
            <div>
                <div>
                    <label htmlFor="username">USER NAME</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, verifyUsername]}
                    />
                </div>

                <div>
                    <label htmlFor="password">PASSWORD</label>
                    <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required, verifyPassword]}
                    />
                </div>

                <div className="text-center">
                    <button className="btn btn-light btn-block">SIGN UP</button>
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

export default SignUp;
import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./SignIn";
import { Provider } from "react-redux";
import store from "../data/store";

it("SignIn snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <SignIn />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="col-md-12"
    >
      <div
        className="card card-container"
      >
        <form
          onSubmit={[Function]}
        >
          <div
            className="form-group"
          >
            <label
              htmlFor="username"
            >
              USER NAME
            </label>
            <div>
              <input
                className="form-control"
                name="username"
                onBlur={[Function]}
                onChange={[Function]}
                type="text"
                value=""
              />
            </div>
          </div>
          <div
            className="form-group"
          >
            <label
              htmlFor="password"
            >
              PASSWORD
            </label>
            <div>
              <input
                className="form-control"
                name="password"
                onBlur={[Function]}
                onChange={[Function]}
                type="password"
                value=""
              />
            </div>
          </div>
          <div
            className="text-center"
          >
            <button
              className="btn btn-light btn-block"
              disabled={false}
            >
              <span>
                SIGN IN
              </span>
            </button>
          </div>
          
          <button
            disabled={true}
            style={
              Object {
                "display": "none",
              }
            }
          />
        </form>
      </div>
    </div>
  `);
});

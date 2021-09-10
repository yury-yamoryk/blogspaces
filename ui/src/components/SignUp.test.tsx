import React from "react";
import renderer from "react-test-renderer";
import SignUp from "./SignUp";
import { Provider } from "react-redux";
import store from "../data/store";

it("SignUp snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <SignUp />
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
          <div>
            <div>
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
            <div>
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
              >
                SIGN UP
              </button>
            </div>
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

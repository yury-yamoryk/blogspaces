import React from "react";
import renderer from "react-test-renderer";
import Post from "./Post";
import { Provider } from "react-redux";
import store from "../data/store";
import { MemoryRouter } from "react-router-dom";
import CreatePost from "./CreatePost";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/spaces/createPost",
  }),
}));

it("CreatePost snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter>
          <CreatePost history={{ push: () => {} }} />
        </MemoryRouter>
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
                htmlFor="blogId"
              >
                POST URL ID
              </label>
              <div>
                <input
                  className="form-control"
                  name="postId"
                  onBlur={[Function]}
                  onChange={[Function]}
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="blogTitle"
              >
                POST TITLE
              </label>
              <div>
                <input
                  className="form-control"
                  name="postTitle"
                  onBlur={[Function]}
                  onChange={[Function]}
                  type="text"
                  value=""
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="blogTitle"
              >
                POST DESCRIPTION
              </label>
              <div>
                <textarea
                  className="form-control"
                  name="postDescription"
                  onBlur={[Function]}
                  onChange={[Function]}
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
                CREATE POST
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

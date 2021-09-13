import React from "react";
import renderer from "react-test-renderer";
import Blog from "./Blog";
import { Provider } from "react-redux";
import store from "../data/store";
import CreateBlog from "./CreateBlog";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/spaces/createBlog",
  }),
}));

it("CreateBlog snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter>
          <CreateBlog history={{ goBack: () => {} }} />
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
                BLOG URL ID
              </label>
              <div>
                <input
                  className="form-control"
                  name="blogId"
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
                BLOG TITLE
              </label>
              <div>
                <input
                  className="form-control"
                  name="blogTitle"
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
                BLOG THEME
              </label>
              <div>
                <select
                  className="form-control"
                  name="blogThemeId"
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
                CREATE BLOG
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

import React from "react";
import renderer from "react-test-renderer";
import Post from "./Post";
import { Provider } from "react-redux";
import store from "../data/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/testUser/testBlog/testPost",
  }),
}));

it("Post snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Post />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="list row"
      style={Object {}}
    >
      <div
        className="col-md-12"
      >
        <h1>
          
        </h1>
        <div>
          
        </div>
        <ul
          className="list-group"
        />
      </div>
    </div>
  `);
});

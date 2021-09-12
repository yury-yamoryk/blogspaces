import React from "react";
import renderer from "react-test-renderer";
import Blogs from "./Blogs";
import { Provider } from "react-redux";
import store from "../data/store";

it("Blogs snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Blogs />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="list row"
    >
      <div
        className="col-md-12"
      >
        <h1>
          Blogs
        </h1>
        <button
          className="btn btn-success"
          onClick={[Function]}
        >
          Add
        </button>
        <ul
          className="list-group"
        />
        <ul
          className="list-group"
        />
        <span>
          The space is ready for blogs. Please, create your blog.
        </span>
      </div>
    </div>
  `);
});

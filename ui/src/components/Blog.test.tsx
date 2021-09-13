import React from "react";
import renderer from "react-test-renderer";
import Blog from "./Blog";
import { Provider } from "react-redux";
import store from "../data/store";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/testUser/testBlog",
  }),
}));

it("Blog snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter>
          <Blog history={{ goBack: () => {} }} />
        </MemoryRouter>
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
        <ul
          className="list-group"
        />
        <span>
          Nothing here right now.
        </span>
      </div>
    </div>
  `);
});

import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Blogs from './Blogs';
import MockedUserService from "../services/UserService";

jest.mock("../services/UserService", () => {
  return {
    getAll: () => {
        return Promise.resolve({ 
            data: [{
                id: "1",
                name: "Hello blog spaces"
            }],
        });
    },
  };
});

let container: Element | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  let containerElement: Element = container as Element;
  unmountComponentAtNode(containerElement);
  containerElement.remove();
  container = null;
});

it("should render Hello blog spaces", async () => {
  await act(async () => {
    render(
      <Blogs />,
      container
    );
  });

  let containerElement: Element = container as Element;
  expect(
    container.querySelector(".list-group-item").innerHTML
  ).toEqual("Hello blog spaces");
});
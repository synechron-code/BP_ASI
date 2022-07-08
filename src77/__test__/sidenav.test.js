import React from "react";

import { act, render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SideNavigationBar } from "../SideNavigationBar";

// it("render side nav", async () => {
//   // notice the async
//   await act(async () => {
//     // this is kind of ugly, but it works.

//     const { getByTestId } = render(<SideNavigationBar />);
//     expect(getByTestId("side-nav")).toBeInTheDocument();
//   });

// this section will run after the effects within TheComponent were triggered
//});

it("render dashboard option", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId } = render(<SideNavigationBar />);
    expect(getByTestId("home-icon")).toBeInTheDocument();
  });

  // this section will run after the effects within TheComponent were triggered
});

it("render build option", async () => {
  // notice the async

  // this is kind of ugly, but it works.
  const { getByTestId } = render(<SideNavigationBar />);

  expect(getByTestId("icon-build")).toBeInTheDocument();

  // this section will run after the effects within TheComponent were triggered
});

it("render reporting", async () => {
  const { getByTestId } = render(<SideNavigationBar />);
  expect(getByTestId("reporting-icon")).toBeInTheDocument();
});
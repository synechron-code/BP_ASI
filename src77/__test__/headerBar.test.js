import React from "react";

import { act, render, cleanup } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { HeaderBar } from "../HeaderBar";

it("render Headerbar", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.

    const { getByTestId } = render(<HeaderBar />);
    expect(getByTestId("header-james-smith")).toBeInTheDocument();
  });
  cleanup();
  // this section will run after the effects within TheComponent were triggered
});

it("render Header title on heder", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId } = render(<HeaderBar />);
    expect(getByTestId("header-application-stacks")).toBeInTheDocument();
  });
  cleanup();
  // this section will run after the effects within TheComponent were triggered
});

it("render header profile photo", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId } = render(<HeaderBar />);

    expect(getByTestId("header-profile-logo")).toBeInTheDocument();
  });

  // this section will run after the effects within TheComponent were triggered
});

it("render rol on header", async () => {
  const { getByTestId } = render(<HeaderBar />);
  expect(getByTestId("header-product-arch")).toBeInTheDocument();
});
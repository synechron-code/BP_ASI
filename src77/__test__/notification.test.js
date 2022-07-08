import React from "react";

import { act, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import SuccessNotification from "../Pages/Notification";

it("render BluePrint table icons minimise and more", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId } = render(
      <SuccessNotification title="Sample title" message="sample essage" />
    );
    expect(getByTestId("notificaton-icon")).toBeInTheDocument();
  });
  cleanup();
  // this section will run after the effects within TheComponent were triggered
});

it("render more menu on mouse over", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId } = render(
      <SuccessNotification title="Sample title" message="sample essage" />
    );

    expect(getByTestId("message")).toBeInTheDocument();
  });
  cleanup();
  // this section will run after the effects within TheComponent were triggered
});
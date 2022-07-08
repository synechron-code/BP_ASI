import React from "react";
import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
  cleanup
} from "@testing-library/react";
// import userEvent from "@testing-library/fire";
import "@testing-library/jest-dom";

import BluePrintCreator from "../Pages/BluePrintCreator";
class ResizeObserver {
  observe() {}
  unobserve() {}
}

window.ResizeObserver = ResizeObserver;

const dropObjEvent = {
  id: "e7c22db7-b794-4550-a270-85bd84ca0111",
  label: "sint",
  subText: 3,
  type: "controlled",
  isCard: true,
  blueprintid: 5,
};
window.dropObjEvent = dropObjEvent;
test("should rende blueprint-creator ", () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<BluePrintCreator />);
  expect(getByTestId("blueprint-creator")).toBeInTheDocument();
});

test("should render blueprint  tab", async () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<BluePrintCreator selectedNode={"1"} />);
  expect(getByTestId("blueprint-creator")).toBeInTheDocument();
});

it("render alerts table headers", async () => {
  window.ResizeObserver = ResizeObserver;
  render(<BluePrintCreator selectedNode={"1"} />);
  await waitFor(() => {
    expect(screen.getByTestId("blueprint-creator")).toBeInTheDocument();
  });
  cleanup();
});

it("render more menu on mouse over", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    window.ResizeObserver = ResizeObserver;

    render(<BluePrintCreator selectedNode={"1"} />);
    await waitFor(() => {
      expect(screen.getByTestId("blueprint-creator")).toBeInTheDocument();
    });
    window.dropObjEvent = dropObjEvent;
    const inputEl = document.createElement("div", dropObjEvent);
    //("drop-input");
    await fireEvent.drop(inputEl, event);

    expect(screen.getByTestId("blueprint-creator")).toBeInTheDocument();
  });
  cleanup();
  // this section will run after the effects within TheComponent were triggered
});
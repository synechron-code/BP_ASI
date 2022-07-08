import React from "react";
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { TreeView } from "../Pages/TreeView";

class ResizeObserver {
  observe() {}
  unobserve() {}
}
const data = [
  {
    id: "culpa",
    label: "culpa",
    items: [
      {
        id: "cbc26adb-b8a7-480b-a3da-6d47016b88bc",
        label: "culpa",
        subText: 3,
        type: "controlled",
        isCard: true,
        topologyid: 1,
      },
      {
        id: "53477034-1963-4591-9bcc-6be185467cf1",
        label: "culpa",
        subText: 3,
        type: "controlled",
        isCard: true,
        topologyid: 2,
      },
      {
        id: "e7c22db7-b794-4550-a270-85bd84ca0111",
        label: "culpa",
        subText: 3,
        type: "controlled",
        isCard: true,
        topologyid: 1,
      },
    ],
  },
  {
    id: "qui",
    label: "qui",
    items: [
      {
        id: "52489665-0b87-43b8-adea-9dd0359e1d6a",
        label: "qui",
        subText: 3,
        type: "controlled",
        isCard: true,
        topologyid: 2,
      },
      {
        id: "2391a1c3-6af5-4cac-a3bc-302ac27c13e7",
        label: "qui",
        subText: 3,
        type: "controlled",
        isCard: true,
        topologyid: 1,
      },
    ],
  },
];
window.ResizeObserver = ResizeObserver;
test("should render results node", () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<TreeView data={data} />);
  expect(getByTestId("result")).toBeInTheDocument();
});

test("should render expand ", () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<TreeView data={data} />);
  expect(getByTestId("expand")).toBeInTheDocument();
});

test("should render expandbtn", () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<TreeView data={data} />);
  expect(getByTestId("expandbtn")).toBeInTheDocument();
});

test("should render tree-view", () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<TreeView data={data} />);
  expect(getByTestId("tree-view")).toBeInTheDocument();
});

test("should render node-subtext", async () => {
  window.ResizeObserver = ResizeObserver;
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId, getAllByTestId } = render(<TreeView data={data} />);

    await userEvent.click(getByTestId("expand"));
    const response = getAllByTestId("angle-up-down");
    expect(response.length).toBeLessThanOrEqual(2);
  });
});
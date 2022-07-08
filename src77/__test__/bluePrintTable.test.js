import React from "react";

import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import BluePrintTable from "../Pages/DashboardBluePrint";
const data = [
  {
    name: "test",
    type: "type",
    environment: "env",
    tags: [1, 2, 3],
    blueprintVersion: [1, 2, 3],
  },
];
it("render BluePrint table icons minimise and more", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId } = render(<BluePrintTable blueprintsData={data} />);
    expect(getByTestId("blueprint-length")).toBeInTheDocument();
  });

  // this section will run after the effects within TheComponent were triggered
});

it("render more menu on mouse over", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId } = render(<BluePrintTable blueprintsData={data} />);

    expect(getByTestId("minimize-icon")).toBeInTheDocument();

    await userEvent.hover(getByTestId("more"));
    expect(getByTestId("apache-drop-down")).toBeInTheDocument();
    expect(getByTestId("linux-drop-down")).toBeInTheDocument();
    expect(getByTestId("tomcat-drop-down")).toBeInTheDocument();
  });

  // this section will run after the effects within TheComponent were triggered
});

it("render BluePrint table headers", async () => {
  const { getByTestId } = render(<BluePrintTable blueprintsData={data} />);
  expect(getByTestId("version-table-header")).toBeInTheDocument();
  expect(getByTestId("name-table-header")).toBeInTheDocument();
  expect(getByTestId("types-table-header")).toBeInTheDocument();
  expect(getByTestId("env-table-header")).toBeInTheDocument();
});
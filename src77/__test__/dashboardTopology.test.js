/* eslint-disable no-unused-vars */
import React from "react";

import { act, cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import DashboardTopology from "../Pages/DashboardTopology";
const data = [
  {
    id: "1234",
    type: "Type",
    name: "quis",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",
    environment: "uat",
    tags: ["et", "excepteur", "ex"],
    topologyVersion: ["3.8.6", "9.0.8", "2.1.0", "9.1.3"],
  },
  {
    id: "5678",
    type: "Type",
    name: "enim",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    environment: "uat",
    tags: ["non", "deserunt"],
    topologyVersion: ["6.0.0", "1.0.2", "5.3.8"],
  },
  {
    id: "9012",
    type: "Type",
    name: "culpa",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    environment: "uat",
    tags: ["non", "deserunt"],
    topologyVersion: ["6.0.0", "1.0.2", "5.3.8"],
  },
];

test("should render Topologies count tab", () => {
  const getTopologyTableData = jest.fn(() => {
    const data = {
      result: [
        {
          id: "1234",
          type: "Type",
          name: "quis",
          description:
            "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",
          environment: "uat",
          tags: ["et", "excepteur", "ex"],
          topologyVersion: ["3.8.6", "9.0.8", "2.1.0", "9.1.3"],
        },
        {
          id: "5678",
          type: "Type",
          name: "enim",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
          environment: "uat",
          tags: ["non", "deserunt"],
          topologyVersion: ["6.0.0", "1.0.2", "5.3.8"],
        },
        {
          id: "9012",
          type: "Type",
          name: "culpa",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
          environment: "uat",
          tags: ["non", "deserunt"],
          topologyVersion: ["6.0.0", "1.0.2", "5.3.8"],
        },
      ],
    };
    return data;
  });
  const { getByText } = render(<DashboardTopology topologyData={data} />);
  expect(getByText(/Topologies/)).toBeInTheDocument();
  expect(getTopologyTableData.mock.calls.length).toBe(0);
});

it("render topology table tags", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.

    const { getByTestId } = render(<DashboardTopology topologyData={data} />);
    expect(
      getByTestId("dashboard-topology-table-label-enim")
    ).toBeInTheDocument();
    expect(
      getByTestId("dashboard-topology-table-icon-delete")
    ).toBeInTheDocument();
  });
  cleanup();
  // this section will run after the effects within TheComponent were triggered
});

it("render topology table icons minimise and more", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId } = render(<DashboardTopology topologyData={data} />);
    expect(
      getByTestId("dashboard-topology-table-icon-minimise")
    ).toBeInTheDocument();
    expect(
      getByTestId("dashboard-topology-table-icon-more")
    ).toBeInTheDocument();
    await userEvent.hover(getByTestId("dashboard-topology-table-icon-more"));
  });
  cleanup();
  // this section will run after the effects within TheComponent were triggered
});

it("render more menu on mouse over", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId } = render(<DashboardTopology topologyData={data} />);

    expect(
      getByTestId("dashboard-topology-table-icon-more")
    ).toBeInTheDocument();

    await userEvent.hover(getByTestId("dashboard-topology-table-icon-more"));
    expect(
      getByTestId("dashboard-topology-table-more-item-web-farm")
    ).toBeInTheDocument();
    expect(
      getByTestId("dashboard-topology-table-more-item-apache")
    ).toBeInTheDocument();
    expect(
      getByTestId("dashboard-topology-table-more-item-tomcat")
    ).toBeInTheDocument();
    expect(
      getByTestId("dashboard-topology-table-more-item-linux")
    ).toBeInTheDocument();
  });
  cleanup();
  // this section will run after the effects within TheComponent were triggered
});

it("render topology table headers", async () => {
  const { getByTestId } = render(<DashboardTopology topologyData={data} />);
  expect(
    getByTestId("dashboard-topology-table-header-name")
  ).toBeInTheDocument();
  expect(getByTestId("dashboard-topology-table-header-id")).toBeInTheDocument();
  expect(
    getByTestId("dashboard-topology-table-header-environment")
  ).toBeInTheDocument();
  expect(
    getByTestId("dashboard-topology-table-header-type")
  ).toBeInTheDocument();
  expect(
    getByTestId("dashboard-topology-table-header-version")
  ).toBeInTheDocument();
  expect(
    getByTestId("dashboard-topology-table-header-tags")
  ).toBeInTheDocument();
});
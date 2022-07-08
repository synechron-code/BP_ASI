import React from "react";

import { act, render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TagsTable from "../Pages/DashboardTags";

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get("./dashboard-data.json", (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json({
        tagsData: [
          {
            topologies: "TagsLinuxWebplant",
            tags: "Payment, Cart, Shopping, CRM",
            versions: "1.3.1",
            lastModified: "5 months ago",
          },
          {
            topologies: "Linux Web plant",
            tags: "Payment, Cart, Shopping, CRM",
            versions: "1.3.1",
            lastModified: "5 months ago",
          },
          {
            topologies: "Linux Web plant",
            tags: "Payment, Cart, Shopping, CRM",
            versions: "1.3.1",
            lastModified: "5 months ago",
          },
          {
            topologies: "Linux Web plant",
            tags: "Payment, Cart, Shopping, CRM",
            versions: "1.3.1",
            lastModified: "5 months ago",
          },
          {
            topologies: "Linux Web plant",
            tags: "Payment, Cart, Shopping, CRM",
            versions: "1.3.1",
            lastModified: "5 months ago",
          },
          {
            topologies: "Linux Web plant",
            tags: "Payment, Cart, Shopping, CRM",
            versions: "1.3.1",
            lastModified: "5 months ago",
          },
        ],
      })
    );
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

it("render tags table tags", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.

    const { getByTestId } = render(<TagsTable />);
    expect(getByTestId("dashboard-tags-table-apache-tag")).toBeInTheDocument();
    expect(
      getByTestId("dashboard-tags-table-apache-delete-icon")
    ).toBeInTheDocument();
  });

  // this section will run after the effects within TheComponent were triggered
});

it("render tags table icons minimise and more", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId } = render(<TagsTable />);
    expect(
      getByTestId("dashboard-tags-table-minimise-icon")
    ).toBeInTheDocument();
  });

  // this section will run after the effects within TheComponent were triggered
});

it("render more menu on mouse over", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId } = render(<TagsTable />);

    expect(getByTestId("dashboard-tags-table-more-item")).toBeInTheDocument();

    await userEvent.hover(getByTestId("dashboard-tags-table-more-item"));
    expect(
      getByTestId("dashboard-tags-table-more-item-linux")
    ).toBeInTheDocument();
  });

  // this section will run after the effects within TheComponent were triggered
});

it("render tags table headers", async () => {
  const { getByTestId } = render(<TagsTable />);
  expect(
    getByTestId("dashboard-tags-table-header-topology")
  ).toBeInTheDocument();
  expect(getByTestId("dashboard-tags-table-header-tags")).toBeInTheDocument();
  expect(
    getByTestId("dashboard-tags-table-header-versions")
  ).toBeInTheDocument();
  expect(
    getByTestId("dashboard-tags-table-header-last-modified")
  ).toBeInTheDocument();
});

it("render alerts table headers", async () => {
  render(<TagsTable />);
  await waitFor(() => {
    expect(screen.getByText("TagsLinuxWebplant")).toBeInTheDocument();
  });
});
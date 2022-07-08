import React from "react";

import {
  act,
  render,
  //  waitFor, screen
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import CreateTopology from "../Pages/CreateTopology";

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
            topologies: "LinuxWebplant",
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

it("render create topology modal", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const setShowTopoNotification = jest.fn();
    const { getByTestId } = render(
      <CreateTopology setShowTopoNotification={setShowTopoNotification} />
    );
    expect(getByTestId("create-topology-trigger")).toBeInTheDocument();
  });

  // this section will run after the effects within TheComponent were triggered
});

test("should render header on create topology", async () => {
  // window.ResizeObserver = ResizeObserver;
  await act(async () => {
    // this is kind of ugly, but it works.
    const setShowTopoNotification = jest.fn();
    const { getByTestId } = render(
      <CreateTopology setShowTopoNotification={setShowTopoNotification} />
    );

    await userEvent.click(getByTestId("create-topology-trigger"));
    // const response = getByTestId("header");
    expect(getByTestId("header")).toBeInTheDocument();
  });
});

test("should rendr create topology form", async () => {
  // window.ResizeObserver = ResizeObserver;
  await act(async () => {
    // this is kind of ugly, but it works.
    const setShowTopoNotification = jest.fn();
    const { getByTestId } = render(
      <CreateTopology setShowTopoNotification={setShowTopoNotification} />
    );

    await userEvent.click(getByTestId("create-topology-trigger"));
    // const response = getByTestId("header");
    expect(getByTestId("submit-button")).toBeInTheDocument();
    expect(getByTestId("cancel-button")).toBeInTheDocument();
    await userEvent.click(getByTestId("submit-button"));
    await userEvent.click(getByTestId("cancel-button"));
  });
});

test("should rendr create topology form inputes", async () => {
  // window.ResizeObserver = ResizeObserver;
  await act(async () => {
    // this is kind of ugly, but it works.
    const setShowTopoNotification = jest.fn();
    const { getByTestId } = render(
      <CreateTopology setShowTopoNotification={setShowTopoNotification} />
    );

    await userEvent.click(getByTestId("create-topology-trigger"));
    // const response = getByTestId("header");
    expect(getByTestId("tags-input")).toBeInTheDocument();
    expect(getByTestId("discription-input")).toBeInTheDocument();
    expect(getByTestId("environment-input")).toBeInTheDocument();
    expect(getByTestId("name-input")).toBeInTheDocument();
  });
});
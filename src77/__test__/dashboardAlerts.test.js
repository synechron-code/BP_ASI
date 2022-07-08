import React from "react";

import { act, render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AlertsTable from "../Pages/DashboardAlerts";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get("./dashboard-data.json", (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json({
        alertsData: [
          {
            topoligies: "LinuxWebPlant",
            environments: "Dev",
            versions: "2.1.3",
            descriptions: "ServerDown",
          },
          {
            topoligies: "Linux Web Plant",
            environments: "Dev",
            versions: "2.1.3",
            descriptions: "Server Down",
          },
          {
            topoligies: "Linux Web Plant",
            environments: "Dev",
            versions: "2.1.3",
            descriptions: "Server Down",
          },
          {
            topoligies: "Linux Web Plant",
            environments: "Dev",
            versions: "2.1.3",
            descriptions: "Server Down",
          },
          {
            topoligies: "Linux Web Plant",
            environments: "Dev",
            versions: "2.1.3",
            descriptions: "Server Down",
          },
          {
            topoligies: "Linux Web Plant",
            environments: "Dev",
            versions: "2.1.3",
            descriptions: "Server Down",
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

// it("render alerts table icons minimise and more", async () => {
//   // notice the async
//   await act(async () => {
//     // this is kind of ugly, but it works.
//     const { getByTestId } = render(<AlertsTable />);
//     expect(
//       getByTestId("dashboard-alerts-table-minimise-icon").l
//     ).toBeInTheDocument();
//   });

//   // this section will run after the effects within TheComponent were triggered
// });

it("render more menu on mouse over", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId } = render(<AlertsTable />);

    expect(getByTestId("dashboard-alerts-table-more-item")).toBeInTheDocument();

    await userEvent.hover(getByTestId("dashboard-alerts-table-more-item"));
    expect(getByTestId("show-all-alerts")).toBeInTheDocument();
  });

  // this section will run after the effects within TheComponent were triggered
});

it("render alerts table headers", async () => {
  const { getByTestId } = render(<AlertsTable />);
  expect(getByTestId("topology")).toBeInTheDocument();
  expect(getByTestId("environment")).toBeInTheDocument();
  expect(getByTestId("versions")).toBeInTheDocument();
  expect(getByTestId("description")).toBeInTheDocument();
});

it("render alerts table headers", async () => {
  render(<AlertsTable />);
  await waitFor(() => {
    expect(screen.getByText("LinuxWebPlant")).toBeInTheDocument();
  });
});
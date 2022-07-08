/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { act, render, waitFor, screen, cleanup } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import BluePrintDashboardContent from "../Pages/BlueprintDashboardContent";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get("./MockFiles/Blueprint/getBluePrint.json", (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json({
        data: {
          result: [
            {
              id: "1234",
              type: "Type",
              name: "quis",
              description:
                "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",
              environment: "uat",
              tags: ["et", "excepteur", "ex"],
              blueprintVersion: ["3.8.6", "9.0.8", "2.1.0", "9.1.3"],
            },
            {
              id: "5678",
              type: "Type",
              name: "enim",
              description:
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
              environment: "uat",
              tags: ["non", "deserunt"],
              blueprintVersion: ["6.0.0", "1.0.2", "5.3.8"],
            },
            {
              id: "9012",
              type: "Type",
              name: "culpa",
              description:
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
              environment: "uat",
              tags: ["non", "deserunt"],
              blueprintVersion: ["6.0.0", "1.0.2", "5.3.8"],
            },
          ],
        },
      })
    );
  })
);

//alert

const alertserver = setupServer(
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

//tags
const tagsServer = setupServer(
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

beforeAll(() => {
  server.listen();
  alertserver.listen();
  tagsServer.listen();
});
afterEach(() => {
  server.resetHandlers();
  alertserver.resetHandlers();
  tagsServer.resetHandlers();
});
// clean up once the tests are done
afterAll(() => {
  server.close();
  alertserver.close();
  tagsServer.close();
});
it("render blueprint dashboard content", async () => {
  // notice the async
  await act(async () => {
    // this is kind of ugly, but it works.
    const { getByTestId } = render(<BluePrintDashboardContent />);

    expect(getByTestId("blueprint-dashboard-content")).toBeInTheDocument();
  });
  cleanup();

  // this section will run after the effects within TheComponent were triggered
});

// it("render alerts blue print dashbaord headers", async () => {
//   render(<BluePrintDashboardContent />);
//   await waitFor(() => {
//     expect(
//       screen.getByTestId("blueprint-dashboard-content")
//     ).toBeInTheDocument();
//   });
//   cleanup();
// });
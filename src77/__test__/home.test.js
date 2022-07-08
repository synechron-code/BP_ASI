import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "../Pages/Home";
// import { rest } from "msw";
// import { setupServer } from "msw/node";

// const server = setupServer(
//   // capture "GET /greeting" requests
//   rest.get("./MockFiles/Topology/getTopology.json", (req, res, ctx) => {
//     // respond using a mocked JSON body
//     return res(
//       ctx.json({
//         data: {
//           result: [
//             {
//               id: "1234",
//               type: "Type",
//               name: "quis",
//               description:
//                 "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",
//               environment: "uat",
//               tags: ["et", "excepteur", "ex"],
//               topologyVersion: ["3.8.6", "9.0.8", "2.1.0", "9.1.3"],
//             },
//             {
//               id: "5678",
//               type: "Type",
//               name: "enim",
//               description:
//                 "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
//               environment: "uat",
//               tags: ["non", "deserunt"],
//               topologyVersion: ["6.0.0", "1.0.2", "5.3.8"],
//             },
//             {
//               id: "9012",
//               type: "Type",
//               name: "culpa",
//               description:
//                 "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
//               environment: "uat",
//               tags: ["non", "deserunt"],
//               topologyVersion: ["6.0.0", "1.0.2", "5.3.8"],
//             },
//           ],
//           meta: {
//             currentPage: 1,
//             pageCount: 1,
//             pageSize: 3,
//             count: 3,
//           },
//         },
//       })
//     );
//   })
// );
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// // clean up once the tests are done
// afterAll(() => server.close());

test("should render Topologies tab", async () => {
  render(<Dashboard />);
  expect(screen.getByText("Topologies")).toBeInTheDocument();
  // await waitFor(() => {
  //   expect(screen.getByText("Topologies")).toBeInTheDocument();
  // });
});

test("should render Blueprints tab", () => {
  const { getByText } = render(<Dashboard />);
  expect(getByText("Blueprints")).toBeInTheDocument();
});
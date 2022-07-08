import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/fire";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import TopologyFlow from "../Pages/Topology";
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

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get("./MockFiles/Topology/getTopologyById.json", (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json({
        data: {
          data: {
            nodes: [
              {
                data: {
                  label: {
                    key: null,
                    ref: null,
                    props: {
                      children: [
                        {
                          type: "strong",
                          key: null,
                          ref: null,
                          props: {
                            children: [" ", "nulla-1", " "],
                          },
                          _owner: null,
                          _store: {},
                        },
                        {
                          type: "br",
                          key: null,
                          ref: null,
                          props: {},
                          _owner: null,
                          _store: {},
                        },
                        3,
                      ],
                    },
                    _owner: null,
                    _store: {},
                  },
                },
                id: "2",
                position: {
                  x: 9453,
                  y: 303,
                },
              },
              {
                source: "2",
                target: "1.1",
                id: "1.1-2",
                arrowHeadType: "arrowclosed",
              },
            ],
          },
        },
      })
    );
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

test("should render topology flow creator", async () => {
  window.ResizeObserver = ResizeObserver;
  await render(<TopologyFlow selectedNode={"2"} selectedVersion="v.1.1.0" />);
  expect(screen.getByTestId("topology-flow-test")).toBeInTheDocument();
});

// test("should render topology flow  tab", async () => {
//   window.ResizeObserver = ResizeObserver;
//   await render(
//     <TopologyFlow selectedNode={2} selectedVersion="v.1.1.0" />
//   );
//   expect(screen.getByTestId("topology-flow-test")).toBeInTheDocument();
// });
import React from "react";

import {
  act,
  render,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

/* Mock Service Worker is an API mocking library that uses Service Worker API 
to intercept actual requests */
import { rest } from "msw";
import { setupServer } from "msw/node";

import CreateBluePrint from "../Pages/CreateBluePrint";
import { getBluePrints, postBluePrintDropNode, putBluePrintDropNode, getTopologyMetadataById,
  getBlueprintMetadataById } from '../Actions/Build';

const expected = {
  "success": true,
  "data": {
    "sint": [
      {
        "type": {
          "id": "8e4b9d48-3066-45ff-b5a4-872edfe92aa8",
          "name": "sint",
          "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
        },
        "id": "cbc26adb-b8a7-480b-a3da-6d47016b88bc",
        "lifecycleStage": "controlled",
        "schemaNamespace": "http://golda.name",
        "subscribers": 6,
        "blueprintid": 1,
        "versions": ["5.4.4", "6.3.5", "8.8.5"]
      },
      {
        "type": {
          "id": "9c138c15-fe10-41e5-b2e0-c7412cda30c3",
          "name": "sint",
          "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
        },
        "id": "53477034-1963-4591-9bcc-6be185467cf1",
        "blueprintid": 2,
        "lifecycleStage": "controlled",
        "schemanamespace": "https://hilton.org",
        "subscribers": 7,
        "versions": ["8.0.6", "5.9.6", "6.5.0"]
      },
      {
        "type": {
          "id": "45904af0-448f-4244-a6ae-0adf0f09ddfc",
          "name": "sint",
          "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
        },
        "id": "e7c22db7-b794-4550-a270-85bd84ca0111",
        "blueprintid": 1,
        "lifecycleStage": "controlled",
        "schemanamespace": "http://jodie.com",
        "subscribers": 7,
        "versions": ["5.5.0", "7.5.8", "1.2.3"]
      },
      {
        "type": {
          "id": "45904af0-448f-4244-a6ae-0adf0f09ddfc",
          "name": "sint",
          "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
        },
        "id": "e7c22db7-b794-4550-a270-85bd84ca0111",
        "blueprintid": 2,
        "lifecycleStage": "controlled",
        "schemanamespace": "http://stevie.com",
        "subscribers": 7,
        "versions": ["5.5.0", "7.5.8", "1.2.3"]
      },
      {
        "type": {
          "id": "45904af0-448f-4244-a6ae-0adf0f09ddfc",
          "name": "sint",
          "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
        },
        "id": "e7c22db7-b794-4550-a270-85bd84ca0111",
        "blueprintid": 1,
        "lifecycleStage": "controlled",
        "schemanamespace": "http://eduardo.name",
        "subscribers": 7,
        "versions": ["5.5.0", "7.5.8", "1.2.3"]
      }
    ],
    "incididunt": [
      {
        "type": {
          "id": "c68578b1-75e8-4e3c-98db-46aa5f9efd76",
          "name": "incididunt",
          "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
        },
        "id": "52489665-0b87-43b8-adea-9dd0359e1d6a",
        "lifecycleStage": "controlled",
        "schemanamespace": "https://anthony.net",
        "subscribers": 4,
        "versions": ["7.2.7", "0.6.9", "2.1.5"]
      },
      {
        "type": {
          "id": "d495174c-9769-43b0-98a8-18b33be4a339",
          "name": "incididunt",
          "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
        },
        "id": "2391a1c3-6af5-4cac-a3bc-302ac27c13e7",
        "lifecycleStage": "controlled",
        "schemanamespace": "https://winston.com",
        "subscribers": 6,
        "versions": ["9.7.9", "9.1.0", "9.2.4"]
      }
    ]
  }
};

const blueprint_node = {
  "category": "blueprint",
  "categoryerror": false,
  "description": "Test Apache Server 4.1.0",
  "descriptionError": false,
  "lifecyclestatus": "blueprint",
  "lifecyclestatusError": false,
  "name": "Apache Server",
  "nameError": false,
  "tags": ""
};

const handlers = [
  rest.get("./blueprints-data.json", (req, res, ctx) => {
    
    return res(
      ctx.json({
        "success": true,
        "data": {
          "sint": [
            {
              "type": {
                "id": "8e4b9d48-3066-45ff-b5a4-872edfe92aa8",
                "name": "sint",
                "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
              },
              "id": "cbc26adb-b8a7-480b-a3da-6d47016b88bc",
              "lifecycleStage": "controlled",
              "schemaNamespace": "http://golda.name",
              "subscribers": 6,
              "blueprintid": 1,
              "versions": ["5.4.4", "6.3.5", "8.8.5"]
            },
            {
              "type": {
                "id": "9c138c15-fe10-41e5-b2e0-c7412cda30c3",
                "name": "sint",
                "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
              },
              "id": "53477034-1963-4591-9bcc-6be185467cf1",
              "blueprintid": 2,
              "lifecycleStage": "controlled",
              "schemanamespace": "https://hilton.org",
              "subscribers": 7,
              "versions": ["8.0.6", "5.9.6", "6.5.0"]
            },
            {
              "type": {
                "id": "45904af0-448f-4244-a6ae-0adf0f09ddfc",
                "name": "sint",
                "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
              },
              "id": "e7c22db7-b794-4550-a270-85bd84ca0111",
              "blueprintid": 1,
              "lifecycleStage": "controlled",
              "schemanamespace": "http://jodie.com",
              "subscribers": 7,
              "versions": ["5.5.0", "7.5.8", "1.2.3"]
            },
            {
              "type": {
                "id": "45904af0-448f-4244-a6ae-0adf0f09ddfc",
                "name": "sint",
                "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
              },
              "id": "e7c22db7-b794-4550-a270-85bd84ca0111",
              "blueprintid": 2,
              "lifecycleStage": "controlled",
              "schemanamespace": "http://stevie.com",
              "subscribers": 7,
              "versions": ["5.5.0", "7.5.8", "1.2.3"]
            },
            {
              "type": {
                "id": "45904af0-448f-4244-a6ae-0adf0f09ddfc",
                "name": "sint",
                "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
              },
              "id": "e7c22db7-b794-4550-a270-85bd84ca0111",
              "blueprintid": 1,
              "lifecycleStage": "controlled",
              "schemanamespace": "http://eduardo.name",
              "subscribers": 7,
              "versions": ["5.5.0", "7.5.8", "1.2.3"]
            }
          ],
          "incididunt": [
            {
              "type": {
                "id": "c68578b1-75e8-4e3c-98db-46aa5f9efd76",
                "name": "incididunt",
                "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
              },
              "id": "52489665-0b87-43b8-adea-9dd0359e1d6a",
              "lifecycleStage": "controlled",
              "schemanamespace": "https://anthony.net",
              "subscribers": 4,
              "versions": ["7.2.7", "0.6.9", "2.1.5"]
            },
            {
              "type": {
                "id": "d495174c-9769-43b0-98a8-18b33be4a339",
                "name": "incididunt",
                "access": ["AccessControl1", "AccessControl2", "AccessControl3"]
              },
              "id": "2391a1c3-6af5-4cac-a3bc-302ac27c13e7",
              "lifecycleStage": "controlled",
              "schemanamespace": "https://winston.com",
              "subscribers": 6,
              "versions": ["9.7.9", "9.1.0", "9.2.4"]
            }
          ]
        }
      })
    );
  }),

  rest.post('./blueprints-data.json/blueprint', async (req, res, ctx) => {
    const {blueprint} = req.body;
    const newBlueprint = await postBluePrintDropNode(blueprint_node);
    return res(ctx.status(201), ctx.json({blueprint: newBlueprint}));
  }),
]
/* Request handler and Response resolver */
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

it("render get blueprint api", async () => {
  // notice the async
  server.use(
    rest.get('*', (req, res, ctx) =>
      res(ctx.status(200), ctx.json(expected)),
    ),
  );
  await act(async () => {
    
    const setShowBluePrintNotification = jest.fn();
    render(
      <CreateBluePrint
        setShowBluePrintNotification={setShowBluePrintNotification}
      />
    );

    return getBluePrints()
    .then(response => {
      expect (typeof response).not.toEqual('undefined');
    });
  });
});

it("render post blueprint api", async () => {
  await act(async () => {
    
    const postBluePrintDropNode = jest.fn(blueprint_node);
    postBluePrintDropNode.mockReturnValue({status: 201, message: 'Blueprint posted successfully!'});
    console.log("Blueprints post response: ");

    const response = postBluePrintDropNode(blueprint_node)
    console.log(response);
    expect (response.status).toBe(201);
    
  });
});

it("render put blueprint api", async () => {
  await act(async () => {
    
  const putBluePrintDropNode = jest.fn((node, id) => {
    return Promise.resolve({status: 201, data: 'Blueprint modified successfully!'});
  });
  putBluePrintDropNode.mockReturnValue({status: 201, data: 'Blueprint modified successfully!'});
  console.log("Blueprints put response: ");

  const response = putBluePrintDropNode(blueprint_node, 1)
  expect (response.status).toBe(201);
  });
});

it("render patch blueprint api", async () => {
  await act(async () => {
    
  const patchBluePrintDropNode = jest.fn((node, id) => {
    return Promise.resolve({status: 201, data: 'Blueprint modified successfully!'});
  });
  patchBluePrintDropNode.mockReturnValue({status: 201, data: 'Blueprint modified successfully!'});
  console.log("Blueprints put response: ");

  const response = patchBluePrintDropNode(blueprint_node, 1)
  expect (response.status).toBe(201);
  });
});

it("render getTopologyMetadataById api", async () => {
  server.use(
    rest.get('*', (req, res, ctx) =>
      res(ctx.status(200), ctx.json(expected)),
    ),
  );
  await act(async () => {
    
    const setShowBluePrintNotification = jest.fn();
    render(
      <CreateBluePrint
        setShowBluePrintNotification={setShowBluePrintNotification}
      />
    );

    return getTopologyMetadataById(1)
    .then(response => {
      expect (typeof response).not.toEqual('object');
    });
  });
});

it("render getBlueprintMetadataById api", async () => {
  server.use(
    rest.get('*', (req, res, ctx) =>
      res(ctx.status(200), ctx.json(expected)),
    ),
  );
  await act(async () => {
    
    const setShowBluePrintNotification = jest.fn();
    render(
      <CreateBluePrint
        setShowBluePrintNotification={setShowBluePrintNotification}
      />
    );

    return getBlueprintMetadataById(1)
    .then(response => {
      expect (typeof response).not.toEqual('object');
    });
  });
});


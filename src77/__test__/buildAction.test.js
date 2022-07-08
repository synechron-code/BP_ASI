/* eslint-disable no-undef */
import axios from "axios";

import geBuildData, {
  getRightPaneBuildData,
  getBluePrints,
  getTopologies,
} from "../actions/Build";

jest.mock("axios");

describe(" build data ", () => {
  it("fetches successfully data from an API", async () => {
    const data = {
      status: 200,
      data: {
        sampleArray: [
          {
            id: "deployed",
            label: "Deployed",
            items: [
              {
                id: "webFarm",
                label: "Web Farm",
                subText: "7 Blueprints",
                type: "Controlled",
                isCard: true,
              },
              {
                id: "cardAuthorization",
                label: "Card Authorization Service Platform",
                subText: "4 Blueprints",
                type: "Controlled",
                isCard: true,
              },
              {
                id: "cardTransaction",
                label: "Card Transaction Service Platform",
                subText: "4 Blueprints",
                type: "Core",
                isCard: true,
              },
              {
                id: "cardBilling",
                label: "Card Billing & Payments Platform",
                subText: "4 Blueprints",
                type: "Controlled",
                isCard: true,
              },
              {
                id: "tadeConfirm",
                label: "Trade Confirm Matching Platform",
                subText: "4 Blueprints",
                type: "Core",
                isCard: true,
              },
            ],
          },
          {
            id: "drafts",
            label: "Drafts",
            items: [
              {
                id: "tradingBook",
                label: "Trading Book Oversight Platform",
                subText: "2 Blueprints",
                type: "Controlled",
                isCard: true,
              },
              {
                id: "creditRisk",
                label: "Credit Risk Operations Platform",
                subText: "1 Blueprints",
                type: "Controlled",
                isCard: true,
              },
              {
                id: "tradePrice",
                label: "Trade/Price Reporting Platform",
                subText: "2 Blueprints",
                type: "Core",
                isCard: true,
              },
            ],
          },
        ],
        sampleBluePrintArray: [
          {
            id: "webServer",
            label: "Web Server",
            items: [
              {
                id: "apacheSingleton",
                label: "Apache Singleton",
                subText: "24 Toplogies",
                isCard: true,
              },
              {
                id: "apacheCluster",
                label: "Apache Cluster",
                subText: "6 Topologies",
                isCard: true,
              },
              {
                id: "webFarm",
                label: "Web Farm",
                subText: "6 Toplogies",
                isCard: true,
              },
            ],
          },
          {
            id: "middlewear",
            label: "Middlewear",
            items: [
              {
                id: "jbossSingleton",
                label: "Jboss Singleton",
                subText: "24 Toplogies",
                isCard: true,
              },
              {
                id: "jbossCluster",
                label: "Jboss Cluster",
                subText: "6 Topologies",
                isCard: true,
              },
              {
                id: "mule",
                label: "Mule",
                subText: "24 Topologies",
                isCard: true,
              },
              {
                id: "mq",
                label: "MQ",
                subText: "6 Topologies",
                isCard: true,
              },
            ],
          },
          {
            id: "dualSiteHaPatroniCluster",
            label: "Dual Site HA Patroni Cluster",
            items: [
              {
                id: "compute",
                label: "Compute",
                items: [
                  {
                    id: "patroni-server",
                    label: "Patroni Server",
                    subText: "24 Topologies",
                    isCard: true,
                  },
                  {
                    id: "linux-server",
                    label: "Linux Server",
                    subText: "24 Topologies",
                    isCard: true,
                  },
                  {
                    id: "ha-proxy-server",
                    label: "HA Proxy Server",
                    subText: "2 Topologies",
                    isCard: true,
                  },
                  {
                    id: "consul-server",
                    label: "Consul Server",
                    subText: "24 Topologies",
                    isCard: true,
                  },
                  {
                    id: "postgress-server",
                    label: "Postgress Server",
                    subText: "24 Topologies",
                    isCard: true,
                  },
                ],
              },
              {
                id: "cluster",
                label: "Cluster",
                items: [
                  {
                    id: "single-site-patroni-server",
                    label: "Single Site Patroni Server",
                    subText: "24 Topologies",
                    isCard: true,
                  },
                ],
              },
              {
                id: "network",
                label: "Network",
                items: [
                  {
                    id: "load-balancer",
                    label: "Load Balancer Server",
                    subText: "24 Topologies",
                  },
                ],
              },
              {
                id: "network-2",
                label: "Network Two",
                items: [
                  {
                    id: "load-balancer-one",
                    label: "Load Balancer Server One",
                    subText: "2 Topologies",
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const response = await geBuildData();
    expect(response).toEqual(data.data);
    expect(axios.get).toHaveBeenCalledWith(`./build-data.json`);
  });

  it("fetches successfully right pane build data from an API", async () => {
    const data = {
      status: 200,
      data: {
        sampleArray: [
          {
            id: "details",
            label: "Details",
            items: [
              {
                id: "webFarm",
                label: "Web Farm",
                subText: "details",
                type: "Controlled",
                isCard: true,
              },
            ],
          },
          {
            id: "share",
            label: "Share",
            items: [
              {
                id: "tradingBook",
                label: "Trading Book Oversight Platform",
                subText: "share",
                type: "Controlled",
                isCard: true,
              },
            ],
          },
          {
            id: "versions",
            label: "Versions",
            items: [
              {
                id: "webFarm",
                label: "Web Farm",
                subText: "versions",
                type: "Controlled",
                isCard: true,
              },
            ],
          },
        ],

        sampleBluePrintArray: [
          {
            id: "loadbalance",
            label: "Load Balance",
            items: [
              {
                id: "apacheSingleton",
                label: "Apache Singleton",
                subText: "loadbalance",
                isCard: true,
              },
            ],
          },
          {
            id: "singlesitepatroniclisterone",
            label: "Single Site Patroni Cluster #1",
            items: [
              {
                id: "patroni-server",
                label: "Patroni Server #1",
                items: [
                  {
                    id: "patroni-server",
                    label: "Patroni Server #1",
                    subText: "patroniserver1",
                    isCard: true,
                  },
                ],
              },
              {
                id: "linux-server",
                label: "Linux Server #1",
                items: [
                  {
                    id: "linux-server-content",
                    label: "Linux Server #1",
                    subText: "patroniserver1",
                    isCard: true,
                  },
                ],
              },
              {
                id: "ha-proxy-server",
                label: "HA Proxy Server #1",
                items: [
                  {
                    id: "ha-proxy-server-content",
                    label: "HA Proxy Server #1",
                    subText: "haproxyserver1",
                    isCard: true,
                  },
                ],
              },
            ],
          },
        ],
        sampleLogsArray: [
          {
            id: "loadbalance",
            label: "Logs",
            items: [
              {
                id: "apacheSingleton",
                label: "Apache Singleton",
                subText: "loadbalance",
                isCard: true,
              },
            ],
          },
          {
            id: "singlesitepatroniclisterone",
            label: "Log server ",
            items: [
              {
                id: "patroni-server",
                label: "Log Server #1",
                items: [
                  {
                    id: "patroni-server",
                    label: "Primary Log Server #1",
                    subText: "patroniserver1",
                    isCard: true,
                  },
                ],
              },
              {
                id: "linux-server",
                label: "Linux Log Server #1",
                items: [
                  {
                    id: "linux-server-content",
                    label: "Linux Log Server #1",
                    subText: "patroniserver1",
                    isCard: true,
                  },
                ],
              },
              {
                id: "ha-proxy-server",
                label: "HA Proxy Server #1",
                items: [
                  {
                    id: "ha-proxy-server-content",
                    label: "HA Proxy Server #1",
                    subText: "haproxyserver1",
                    isCard: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const response = await getRightPaneBuildData();
    expect(response).toEqual(data.data);
    expect(axios.get).toHaveBeenCalledWith(`./right-pane-data.json`);
  });
  it("fetches successfully getBluePrints  build data from an API", async () => {
    const data = {
      status: 200,
      data: {
        success: true,
        data: {
          sint: [
            {
              type: {
                id: "8e4b9d48-3066-45ff-b5a4-872edfe92aa8",
                name: "sint",
                access: ["AccessControl1", "AccessControl2", "AccessControl3"],
              },
              id: "cbc26adb-b8a7-480b-a3da-6d47016b88bc",
              lifecycleStage: "controlled",
              schemaNamespace: "http://golda.name",
              subscribers: 6,
              blueprintid: 1,
              versions: ["5.4.4", "6.3.5", "8.8.5"],
            },
            {
              type: {
                id: "9c138c15-fe10-41e5-b2e0-c7412cda30c3",
                name: "sint",
                access: ["AccessControl1", "AccessControl2", "AccessControl3"],
              },
              id: "53477034-1963-4591-9bcc-6be185467cf1",
              blueprintid: 2,
              lifecycleStage: "controlled",
              schemanamespace: "https://hilton.org",
              subscribers: 7,
              versions: ["8.0.6", "5.9.6", "6.5.0"],
            },
            {
              type: {
                id: "45904af0-448f-4244-a6ae-0adf0f09ddfc",
                name: "sint",
                access: ["AccessControl1", "AccessControl2", "AccessControl3"],
              },
              id: "e7c22db7-b794-4550-a270-85bd84ca0111",
              blueprintid: 3,
              lifecycleStage: "controlled",
              schemanamespace: "http://jodie.com",
              subscribers: 7,
              versions: ["5.5.0", "7.5.8", "1.2.3"],
            },
            {
              type: {
                id: "45904af0-448f-4244-a6ae-0adf0f09ddfc",
                name: "sint",
                access: ["AccessControl1", "AccessControl2", "AccessControl3"],
              },
              id: "e7c22db7-b794-4550-a270-85bd84ca0111",
              blueprintid: 4,
              lifecycleStage: "controlled",
              schemanamespace: "http://stevie.com",
              subscribers: 7,
              versions: ["5.5.0", "7.5.8", "1.2.3"],
            },
            {
              type: {
                id: "45904af0-448f-4244-a6ae-0adf0f09ddfc",
                name: "sint",
                access: ["AccessControl1", "AccessControl2", "AccessControl3"],
              },
              id: "e7c22db7-b794-4550-a270-85bd84ca0111",
              blueprintid: 5,
              lifecycleStage: "controlled",
              schemanamespace: "http://eduardo.name",
              subscribers: 7,
              versions: ["5.5.0", "7.5.8", "1.2.3"],
            },
          ],
          incididunt: [
            {
              type: {
                id: "c68578b1-75e8-4e3c-98db-46aa5f9efd76",
                name: "incididunt",
                access: ["AccessControl1", "AccessControl2", "AccessControl3"],
              },
              id: "52489665-0b87-43b8-adea-9dd0359e1d6a",
              blueprintid: 6,
              lifecycleStage: "controlled",
              schemanamespace: "https://anthony.net",
              subscribers: 4,
              versions: ["7.2.7", "0.6.9", "2.1.5"],
            },
            {
              type: {
                id: "d495174c-9769-43b0-98a8-18b33be4a339",
                name: "incididunt",
                access: ["AccessControl1", "AccessControl2", "AccessControl3"],
              },
              id: "2391a1c3-6af5-4cac-a3bc-302ac27c13e7",
              blueprintid: 7,
              lifecycleStage: "controlled",
              schemanamespace: "https://winston.com",
              subscribers: 6,
              versions: ["9.7.9", "9.1.0", "9.2.4"],
            },
          ],
        },
      },
    };
    const processedBluePrints = [
      {
        id: "sint",
        label: "sint",
        items: [
          {
            id: "cbc26adb-b8a7-480b-a3da-6d47016b88bc",
            label: "sint",
            subText: 3,
            type: "controlled",
            isCard: true,
            blueprintid: 1,
          },
          {
            id: "53477034-1963-4591-9bcc-6be185467cf1",
            label: "sint",
            subText: 3,
            type: "controlled",
            isCard: true,
            blueprintid: 2,
          },
          {
            id: "e7c22db7-b794-4550-a270-85bd84ca0111",
            label: "sint",
            subText: 3,
            type: "controlled",
            isCard: true,
            blueprintid: 3,
          },
          {
            id: "e7c22db7-b794-4550-a270-85bd84ca0111",
            label: "sint",
            subText: 3,
            type: "controlled",
            isCard: true,
            blueprintid: 4,
          },
          {
            id: "e7c22db7-b794-4550-a270-85bd84ca0111",
            label: "sint",
            subText: 3,
            type: "controlled",
            isCard: true,
            blueprintid: 5,
          },
        ],
      },
      {
        id: "incididunt",
        label: "incididunt",
        items: [
          {
            id: "52489665-0b87-43b8-adea-9dd0359e1d6a",
            label: "incididunt",
            subText: 3,
            type: "controlled",
            isCard: true,
            blueprintid: 6,
          },
          {
            id: "2391a1c3-6af5-4cac-a3bc-302ac27c13e7",
            label: "incididunt",
            subText: 3,
            type: "controlled",
            isCard: true,
            blueprintid: 7,
          },
        ],
      },
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const response = await getBluePrints();
    expect(response).toEqual(processedBluePrints);
    expect(axios.get).toHaveBeenCalledWith(
      `./MockFiles/Hierarchy/getBluePrints.json`
    );
  });

  it("fetches successfully getTopology  build data from an API", async () => {
    const data = {
      status: 200,
      data: {
        success: true,
        data: {
          culpa: [
            {
              type: {
                id: "8e4b9d48-3066-45ff-b5a4-872edfe92aa8",
                name: "culpa",
                access: ["AccessControl1", "AccessControl2", "AccessControl3"],
              },
              id: "cbc26adb-b8a7-480b-a3da-6d47016b88bc",
              topologyid: 1,
              lifecycleStage: "controlled",
              schemaNamespace: 9,
              versions: ["5.4.4", "6.3.5", "8.8.5"],
            },
            {
              type: {
                id: "9c138c15-fe10-41e5-b2e0-c7412cda30c3",
                name: "culpa",

                access: ["AccessControl1", "AccessControl2", "AccessControl3"],
              },
              id: "53477034-1963-4591-9bcc-6be185467cf1",
              topologyid: 2,
              lifecycleStage: "controlled",
              schemanamespace: "https://francisco.info",
              subscribers: 5,
              versions: ["8.0.6", "5.9.6", "6.5.0"],
            },
            {
              type: {
                id: "45904af0-448f-4244-a6ae-0adf0f09ddfc",
                name: "culpa",
                access: ["AccessControl1", "AccessControl2", "AccessControl3"],
              },
              id: "e7c22db7-b794-4550-a270-85bd84ca0111",
              topologyid: 1,
              lifecycleStage: "controlled",
              schemanamespace: "http://rosa.name",
              subscribers: 2,
              versions: ["5.5.0", "7.5.8", "1.2.3"],
            },
          ],
          qui: [
            {
              type: {
                id: "c68578b1-75e8-4e3c-98db-46aa5f9efd76",
                name: "qui",
                access: ["AccessControl1", "AccessControl2", "AccessControl3"],
              },
              id: "52489665-0b87-43b8-adea-9dd0359e1d6a",
              topologyid: 2,
              lifecycleStage: "controlled",
              schemanamespace: "https://leif.info",
              subscribers: 0,
              versions: ["7.2.7", "0.6.9", "2.1.5"],
            },
            {
              type: {
                id: "d495174c-9769-43b0-98a8-18b33be4a339",
                name: "qui",
                access: ["AccessControl1", "AccessControl2", "AccessControl3"],
              },
              id: "2391a1c3-6af5-4cac-a3bc-302ac27c13e7",
              topologyid: 1,
              lifecycleStage: "controlled",
              schemanamespace: "https://grayson.info",
              subscribers: 7,
              versions: ["9.7.9", "9.1.0", "9.2.4"],
            },
          ],
        },
      },
    };
    const processedTopologies = [
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

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const response = await getTopologies();
    expect(response).toEqual(processedTopologies);
    expect(axios.get).toHaveBeenCalledWith(
      `./MockFiles/Hierarchy/getTopologies.json`
    );
  });
});
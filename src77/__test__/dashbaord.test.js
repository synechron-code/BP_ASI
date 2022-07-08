/* eslint-disable no-undef */
import axios from "axios";

import getDashboardData, {
  getTopologyTableData,
  getBluPrintData,
} from "../actions/Dashboard";

jest.mock("axios");

describe(" dashboard data ", () => {
  it("fetches successfully data from an API", async () => {
    const data = {
      status: 200,
      data: {
        TopologyTableData: [
          {
            topology: "Equities Web Plant",
            version: "3.2.1",
            environment: "Prod",
            lifecycle: "Controlled",
            lastDeployed: "2 months ago",
            deployedBy: "James Smith",
            blueprints: "4",
            tags: "Apache, Linux",
          },
          {
            topology: "Web Plant",
            version: "2.2.1",
            environment: "Dev",
            lifecycle: "Controlled",
            lastDeployed: "1 month ago",
            deployedBy: "Jhone",
            blueprints: "1",
            tags: "Linux",
          },
          {
            topology: "Test ",
            version: "3.2.1",
            environment: "Prod",
            lifecycle: "Controlled",
            lastDeployed: "2 months ago",
            deployedBy: "James Smith",
            blueprints: "4",
            tags: "Apache, Linux",
          },
          {
            topology: "Equities Web Plant",
            version: "3.2.1",
            environment: "Prod",
            lifecycle: "Controlled",
            lastDeployed: "2 months ago",
            deployedBy: "James Smith",
            blueprints: "4",
            tags: "Apache, Linux",
          },
          {
            topology: "Web Plant",
            version: "2.2.1",
            environment: "Dev",
            lifecycle: "Controlled",
            lastDeployed: "1 month ago",
            deployedBy: "Jhone",
            blueprints: "1",
            tags: "Linux",
          },
          {
            topology: "Test ",
            version: "3.2.1",
            environment: "Prod",
            lifecycle: "Controlled",
            lastDeployed: "2 months ago",
            deployedBy: "James Smith",
            blueprints: "4",
            tags: "Apache, Linux",
          },
          {
            topology: "Equities Web Plant",
            version: "3.2.1",
            environment: "Prod",
            lifecycle: "Controlled",
            lastDeployed: "2 months ago",
            deployedBy: "James Smith",
            blueprints: "4",
            tags: "Apache, Linux",
          },
          {
            topology: "Web Plant",
            version: "2.2.1",
            environment: "Dev",
            lifecycle: "Controlled",
            lastDeployed: "1 month ago",
            deployedBy: "Jhone",
            blueprints: "1",
            tags: "Linux",
          },
          {
            topology: "Test ",
            version: "3.2.1",
            environment: "Prod",
            lifecycle: "Controlled",
            lastDeployed: "2 months ago",
            deployedBy: "James Smith",
            blueprints: "4",
            tags: "Apache, Linux",
          },
          {
            topology: "Equities Web Plant",
            version: "3.2.1",
            environment: "Prod",
            lifecycle: "Controlled",
            lastDeployed: "2 months ago",
            deployedBy: "James Smith",
            blueprints: "4",
            tags: "Apache, Linux",
          },
          {
            topology: "Web Plant",
            version: "2.2.1",
            environment: "Dev",
            lifecycle: "Controlled",
            lastDeployed: "1 month ago",
            deployedBy: "Jhone",
            blueprints: "1",
            tags: "Linux",
          },
          {
            topology: "Test ",
            version: "3.2.1",
            environment: "Prod",
            lifecycle: "Controlled",
            lastDeployed: "2 months ago",
            deployedBy: "James Smith",
            blueprints: "4",
            tags: "Apache, Linux",
          },
          {
            topology: "Equities Web Plant",
            version: "3.2.1",
            environment: "Prod",
            lifecycle: "Controlled",
            lastDeployed: "2 months ago",
            deployedBy: "James Smith",
            blueprints: "4",
            tags: "Apache, Linux",
          },
          {
            topology: "Web Plant",
            version: "2.2.1",
            environment: "Dev",
            lifecycle: "Controlled",
            lastDeployed: "1 month ago",
            deployedBy: "Jhone",
            blueprints: "1",
            tags: "Linux",
          },
          {
            topology: "Test ",
            version: "3.2.1",
            environment: "Prod",
            lifecycle: "Controlled",
            lastDeployed: "2 months ago",
            deployedBy: "James Smith",
            blueprints: "4",
            tags: "Apache, Linux",
          },
          {
            topology: "Equities Web Plant",
            version: "3.2.1",
            environment: "Prod",
            lifecycle: "Controlled",
            lastDeployed: "2 months ago",
            deployedBy: "James Smith",
            blueprints: "4",
            tags: "Apache, Linux",
          },
          {
            topology: "Web Plant",
            version: "2.2.1",
            environment: "Dev",
            lifecycle: "Controlled",
            lastDeployed: "1 month ago",
            deployedBy: "Jhone",
            blueprints: "1",
            tags: "Linux",
          },
          {
            topology: "Test ",
            version: "3.2.1",
            environment: "Prod",
            lifecycle: "Controlled",
            lastDeployed: "2 months ago",
            deployedBy: "James Smith",
            blueprints: "4",
            tags: "Apache, Linux",
          },
        ],
        blueprintsData: [
          {
            version: "3.2.1",
            prodtops: "2",
            startingtopos: "3",
            lastdeployed: "2 months ago",
            modifiedby: "James Smith",
            tags: "Apache, Linux",
          },
          {
            version: "3.2.1",
            prodtops: "2",
            startingtopos: "3",
            lastdeployed: "2 months ago",
            modifiedby: "James Smith",
            tags: "Apache, Linux",
          },
          {
            version: "3.2.1",
            prodtops: "2",
            startingtopos: "3",
            lastdeployed: "2 months ago",
            modifiedby: "James Smith",
            tags: "Apache, Linux",
          },
          {
            version: "3.2.1",
            prodtops: "2",
            startingtopos: "3",
            lastdeployed: "2 months ago",
            modifiedby: "James Smith",
            tags: "Apache, Linux",
          },
          {
            version: "3.2.1",
            prodtops: "2",
            startingtopos: "3",
            lastdeployed: "2 months ago",
            modifiedby: "James Smith",
            tags: "Apache, Linux",
          },
          {
            version: "3.2.1",
            prodtops: "2",
            startingtopos: "3",
            lastdeployed: "2 months ago",
            modifiedby: "James Smith",
            tags: "Apache, Linux",
          },
          {
            version: "3.2.1",
            prodtops: "2",
            startingtopos: "3",
            lastdeployed: "2 months ago",
            modifiedby: "James Smith",
            tags: "Apache, Linux",
          },
          {
            version: "3.2.1",
            prodtops: "2",
            startingtopos: "3",
            lastdeployed: "2 months ago",
            modifiedby: "James Smith",
            tags: "Apache, Linux",
          },
          {
            version: "3.2.1",
            prodtops: "2",
            startingtopos: "3",
            lastdeployed: "2 months ago",
            modifiedby: "James Smith",
            tags: "Apache, Linux",
          },
        ],
        tagsData: [
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
          {
            topologies: "Linux Web plant",
            tags: "Payment, Cart, Shopping, CRM",
            versions: "1.3.1",
            lastModified: "5 months ago",
          },
        ],
        alertsData: [
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
          {
            topoligies: "Linux Web Plant",
            environments: "Dev",
            versions: "2.1.3",
            descriptions: "Server Down",
          },
        ],
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const response = await getDashboardData();
    console.log("response da:", response);
    expect(response).toEqual(data.data);
    expect(axios.get).toHaveBeenCalledWith(`./dashboard-data.json`);
  });

  it("fetches successfully topology data from an API", async () => {
    const data = {
      status: 200,
      data: {
        success: true,
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
          meta: {
            currentPage: 1,
            pageCount: 1,
            pageSize: 3,
            count: 3,
          },
        },
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const response = await getTopologyTableData();
    console.log("response da:", response);
    expect(response).toEqual(data.data);
    expect(axios.get).toHaveBeenCalledWith(
      `./MockFiles/Topology/getTopology.json`
    );
  });

  it("fetches successfully blueprint data from an API", async () => {
    const data = {
      status: 200,
      data: {
        success: true,
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
          meta: {
            currentPage: 1,
            pageCount: 1,
            pageSize: 3,
            count: 3,
          },
        },
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const response = await getBluPrintData();
    console.log("response da:", response);
    expect(response).toEqual(data.data);
    expect(axios.get).toHaveBeenCalledWith(
      `./MockFiles/Blueprint/getBluePrint.json`
    );
  });
});

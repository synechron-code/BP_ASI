import React from "react";
import axios from "axios";

// import { store } from "../index";
import http from "../Shared/services/http-common";
// import { fetchBlueprintsCategory } from './Actions';

let nodeCount = 1;
let parentNode = 1;
let parentX = 350;
let parentY = 50;
let takenX = [];

/** Transform the create blueprint form details, to a readable blueprint node. */
const postBlueprintRequestObj = {
  id: "",
  createdDate: "",
  createdBy: "",
  lifeCycleStage: "",
  tags: [""],
  version: "",
  lastModifiedDate: "",
  nodes: [
    {
      id: "",
      parentId: "",
      title: "",
      type: "",
      nodeLevel: 0,
      properties: [
        {
          id: "",
          title: "",
          type: "",
          required: true,
          description: "",
          example: "",
          pattern: "",
          const: true,
          default: "",
          properties: [""],
        },
      ],
      children: [""],
    },
  ],
};

/* Check if the object has any properties*/
const isEmpty = (obj) => {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) return false;
  }
  return true;
};

/* Construct blueprint object as per below format which could be used for sending as
 * request object to perform CRUD operations(POST, PUT, PATCH).
 */
const buildBlueprintNode = (tree, obj) => {
  if (!isEmpty(obj) && obj === null) {
    return;
  } else {
    var keys = Object.keys(tree);
    keys.forEach((key) => {
      if (key === "lifeCycleStage") {
        tree[key] = obj["lifecyclestatus"];
      } else if (key === "tags") {
        tree[key] = [obj["tags"]];
      } else if (key === "nodes") {
        tree[key].forEach((item) => {
          if (item["id"] !== "") {
            console.log(item, "item id is empty");
          } else {
            item["title"] = obj["name"];
            item["type"] = obj["category"];
            if (item["properties"]) {
              item["properties"].forEach((nestedItem) => {
                nestedItem["title"] = obj["name"];
                nestedItem["description"] = obj["description"];
              });
            }
          }
        });
      }
    });
    return tree;
  }
};

/**
 *  x: childX + node.nodeLevel + parentNode + (index + 1) * 20,
        y: childY + parentNode + (index + 1),
 */

const getBuildData = async () => {
  const response = await axios.get("./build-data.json");
  if (response.status === 200) {
    return response.data;
  } else {
    alert("Something went wrong!");
  }
};
export default getBuildData;

export const getRightPaneBuildData = async () => {
  const response = await axios.get("./right-pane-data.json");
  if (response.status === 200) {
    return response.data;
  } else {
    alert("Something went wrong!");
  }
};
const handleNodeChildren = (children, resultArr = [], resultEd = []) => {
  const resultNodes = resultArr;
  const resultEdges = resultEd;
  let childX = parentX - 250 * Math.ceil(children.length / 2);
  console.log("childX::", childX);
  let childY = parentY + 250;
  console.log("childY::", childY);
  children.forEach((node) => {
    if (node.parentId) {
      const edgeNode = {};
      edgeNode.source = node.parentId;
      edgeNode.target = node.id;
      edgeNode.id = `${node.id}-${node.parentId}`;
      edgeNode.arrowHeadType = "arrowclosed";
      const nodeInstance = {
        data: {
          label: null,
        },
      };
      nodeInstance.id = node.id;
      nodeInstance.data.label = (
        <React.Fragment>
          <strong> {node.title} </strong>
          <br />
          {node.children.length}
        </React.Fragment>
      );
      nodeInstance.position = {
        x: childX,
        // + (index + 1) * 150,
        y: childY,
      };
      // nodeInstance.parentNode = node.parentId;
      // nodeInstance.extent = 'parent';

      parentNode = parentNode + 1;
      resultEdges.push(edgeNode);
      resultNodes.push(nodeInstance);
      if (node.children.length) {
        parentX = childX;
        parentY = childY;
        const {
          nodes: resultIntermediateNodes,
          edges: resultIntermediateEdges,
        } = handleNodeChildren(node.children, resultNodes, resultEdges);
        resultNodes.concat(resultIntermediateNodes);
        resultEdges.concat(resultIntermediateEdges);
      }
      const nextX = parentX + 250 * Math.ceil(children.length / 2);
      if (takenX.includes(nextX)) {
        childX = parentX + 250 * Math.ceil(children.length / 2) + 150;
        takenX.push(childX);
      } else {
        childX = parentX + 250 * Math.ceil(children.length / 2);
        takenX.push(childX);
      }
      console.log("childX for next item:", childX);
    }
  });
  parentX = childX;
  parentY = childY;
  takenX.push(parentX);
  return { nodes: resultNodes, edges: resultEdges };
};
const handleFlowNodes = async (nodes) => {
  const nodesArray = [];
  const edgesArray = [];
  if (nodes?.length) {
    nodes.forEach((item, index) => {
      if (item.parentId == null) {
        const nodeInstance = {
          data: {
            label: null,
          },
        };
        nodeInstance.id = item.id;
        nodeInstance.data.label = (
          <React.Fragment>
            <strong> {item.title} </strong>
            <br />
            {item.children.length}
          </React.Fragment>
        );
        nodeInstance.position = {
          x: parentX + (index + 1) + nodeCount,
          y: parentY + (index + 1) + nodeCount,
        };
        nodeInstance.type = 'group';
        nodeCount = nodeCount + 1;
        nodesArray.push(nodeInstance);
        const { nodes, edges } = handleNodeChildren(item.children);
        nodesArray.push(...nodes);
        edgesArray.push(...edges);
      }
    });
  }
  return { nodes: nodesArray, edges: edgesArray };
};
export const getTopologyByIdJson = async (id = 1, version) => {
  console.log("id::", id, version);
  const response = await axios.get("./MockFiles/Topology/getTopologyById.json");

  const nodes =
    response?.data?.data?.nodes?.filter((node) => node.id == id);
  const nodesArr = await handleFlowNodes(nodes);
  // if (response.status === 200) {
  //   return response.data;
  // }
  return nodesArr || {};
};

export const getBluePrintByIdJson = async (bluePrintId) => {
  const response = await axios.get(
    "./MockFiles/Blueprint/getBlueprintbyId.json"
  );
  if (response.status === 200) {
    const nodes = response?.data?.data?.nodes?.filter(
      (node) => node.id == bluePrintId
    );
    const nodesArr = await handleFlowNodes(nodes);
    return nodesArr || {};
    //return response.data;
  }
};

export const postBluePrintDropNode = async (node) => {
  const requestObj = buildBlueprintNode(postBlueprintRequestObj, node);

  http
    .post("/blueprint", requestObj)
    .then((response) => {
      if (response.status === 201) {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const putBluePrintDropNode = async (node, id) => {
  const requestObj = buildBlueprintNode(postBlueprintRequestObj, node);

  http
    .put(`/blueprint/${id}`, requestObj)
    .then((response) => {
      if (response.status === 201) {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const patchBluePrintDropNode = async (node, id) => {
  const requestObj = buildBlueprintNode(postBlueprintRequestObj, node);

  http
    .patch(`/blueprint/${id}`, requestObj)
    .then((response) => {
      if (response.status === 201) {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getTopologies = async () => {
  const response = await axios.get("./MockFiles/Hierarchy/getTopologies.json");
  if (response.status === 200) {
    const data = response.data.data;
    const dataKeys = Object.keys(data);
    const processedResponse = [];
    dataKeys.forEach((item) => {
      const itemArray = data[item];
      const tempObj = {
        id: item,
        label: item,
        items: [],
      };
      itemArray.forEach((t1) => {
        const temp1 = {};
        temp1.id = t1.id;
        temp1.label = t1.type.name;
        temp1.subText = t1.versions.length || 0;
        temp1.type = t1.lifecycleStage;
        temp1.isCard = true;
        temp1.topologyid = t1.topologyid;
        tempObj.items.push(temp1);
      });
      processedResponse.push(tempObj);
    });
    return processedResponse;
  } else {
    alert("Something went wrong!");
  }
};

export const getBluePrints = async () => {
  const response = await axios.get("./MockFiles/Hierarchy/getBluePrints.json");
  if (response.status === 200) {
    const data = response.data.data;
    const dataKeys = Object.keys(data);
    const processedResponse = [];

    console.log("datakeys::", dataKeys, data);
    // store.dispatch(fetchBlueprintsCategory(dataKeys));

    dataKeys.forEach((item) => {
      const itemArray = data[item];
      const tempObj = {
        id: item,
        label: item,
        items: [],
      };
      itemArray.forEach((t1) => {
        const temp1 = {};
        temp1.id = t1.id;
        temp1.label = t1.type.name;
        temp1.subText = t1.versions.length || 0;
        temp1.type = t1.lifecycleStage;
        temp1.isCard = true;
        temp1.blueprintid = t1.blueprintid;
        tempObj.items.push(temp1);
      });
      processedResponse.push(tempObj);
    });
    return processedResponse;
  } else {
    alert("Something went wrong!");
  }
};

export const postTopology = async (node) => {
  http
    .post("/topology", node)
    .then((response) => {
      if (response.status === 201) {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const putTopology = async (node, id) => {
  http
    .put(`/topology/${id}`, node)
    .then((response) => {
      if (response.status === 201) {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const patchTopology = async (node, id) => {
  http
    .patch(`/topology/${id}`, node)
    .then((response) => {
      if (response.status === 201) {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getTopologyMetadataById = async (id) => {
  http
    .get(`/topology/${id}/meta`)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getBlueprintMetadataById = async (id) => {
  http
    .get(`/blueprint/${id}/meta`)
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
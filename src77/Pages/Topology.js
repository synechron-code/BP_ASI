import React, { useEffect, useState, useCallback, useMemo } from "react";

import PropTypes from "prop-types";
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MarkerType,
} from "react-flow-renderer";
import { getTopologyByIdJson } from "../Actions/Build";
import CardSelectorNode from "./CardSelectorNode";

// const nodeType = {
//     selectorNode: CardSelectorNode
// }
const onLoad = (reactFlowInstance) => {
  console.log("flow loaded:", reactFlowInstance);
  reactFlowInstance.fitView();
};

const TopologyFlow = ({ selectedNode, selectedVersion }) => {
  console.log("selectedNode::", selectedNode);
  const [elements, setElements] = useState([]);
  const [edges, setEdges] = useState([]);
  const prepareNodeData = async (id = 1) => {
    const response = await getTopologyByIdJson(id, selectedVersion);
    console.log("getTopologyByIdJson:", response);
    if (Object.keys(response).length) {
      const { nodes, edges: nodeEdges } = response;
      const elementsNew = [...nodes];
      /*Adding the custom nodeType: CardSelectorNode*/
      elementsNew.map(ele => ele['type']='selectorNode');
      /*Adding edgeType to smoothStep for connections*/
      nodeEdges.map(ele => {
        ele['type']='smoothstep';
        ele['markerEnd']={
          type: MarkerType.ArrowClosed,
        };
      });
      console.log("elementsNew::", elementsNew);
      setElements(elementsNew);
      setEdges([...nodeEdges]);
    }
  };
  const nodeTypes = useMemo(() => ({ selectorNode: CardSelectorNode }), []);

  useEffect(() => {
    if (selectedNode) {
      prepareNodeData(selectedNode);
    } else {
      prepareNodeData();
    }
  }, [selectedNode, selectedVersion]);
  // const onElementsRemove = (elementsToRemove) =>
  //   setElements((els) => removeElements(elementsToRemove, els));
  const onNodesChange = useCallback(
    (changes) => setElements((ns) => applyNodeChanges(changes, ns)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  console.log("selectedNode::", selectedNode);
  console.log("elements::", elements);
  return (
    <ReactFlow
      nodes={elements}
      data-testid="topology-flow-test"
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onLoad={onLoad}
      nodeTypes={nodeTypes}
      snapToGrid={true}
      snapGrid={[15, 15]}
      fitView
    >
      {/* <MiniMap
        nodeStrokeColor={(n) => {
          if (n.style && n.style.background) return n.style.background;
          if (n.type === "input") return "#0041d0";
          if (n.type === "output") return "#ff0072";
          if (n.type === "default") return "#1a192b";

          return "#eee";
        }}
        nodeColor={(n) => {
          if (n.style && n.style.background) return n.style.background;

          return "#fff";
        }}
        nodeBorderRadius={2}
      /> */}
      <Controls style={{ top: 0, left: 0, height: "fit-content" }} />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};
TopologyFlow.propTypes = {
  selectedNode: PropTypes.string,
  selectedVersion: PropTypes.string,
};

export default TopologyFlow;
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType
} from "react-flow-renderer";
import { getBluePrintByIdJson, postBluePrintDropNode } from "../Actions/Build";
import PropTypes from "prop-types";
import CardSelectorNode from "./CardSelectorNode";

import "../Styles/dnd.css";
import "../Styles/Build.css";

// const nodeType = {
//   selectorNode: CardSelectorNode
// }
let id = 0;
const getId = () => `dndnode_${id++}`;

const BluePrintCreator = ({ selectedNode }) => {
  const reactFlowWrapper = useRef(null);
  // const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [edges, setEdges] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const prepareNodeData = async (blueprintid) => {
    const response = await getBluePrintByIdJson(blueprintid);
    console.log("getBluePrintByIdJson:", response);
    if (Object.keys(response).length) {
      const { nodes, edges: nodeEdges } = response;
      /*Adding the custom nodeType: CardSelectorNode*/
      nodes.map(ele => ele['type']='selectorNode');
      /*Adding edgeType to smoothStep for connections*/
      nodeEdges.map(ele => {
        ele['type']='smoothstep';
        ele['markerEnd']={
          type: MarkerType.ArrowClosed,
        };
      });
      setElements([...elements, ...nodes]);
      setEdges([...edges, ...nodeEdges]);
    }
  };
  const nodeTypes = useMemo(() => ({ selectorNode: CardSelectorNode }), []);
  useEffect(() => {
    if (selectedNode) {
      console.log("selected node::", selectedNode);
      prepareNodeData(selectedNode);
    }
  }, [selectedNode]);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
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

  // const onLoad = (_reactFlowInstance) =>
  //   setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop =  useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const dropnode = event.dataTransfer.getData('application/reactflow');

      const nodeObj = JSON.parse(dropnode);
      console.log("nodeobj::", nodeObj);
      const type = nodeObj.label;
      console.log("type::", type);
      const blueprintid = nodeObj.blueprintid;
      console.log("blueprint id::", blueprintid);

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: 'selectorNode',
        position,
        data: { label: `${type} node`, id: blueprintid, type: nodeObj.type },
      };
      //prepareNodeData(blueprintid);
      setElements((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
/*
  const onDrop = async (event) => {
    console.log("Hello Earth 30");
    event.preventDefault();
    console.log(
      "event on drop node::",
      event,
      event.target,
      event.dataTransfer
    );
    // const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const dropnode = event.dataTransfer.getData("application/reactflow");
    const nodeObj = JSON.parse(dropnode);
    console.log("nodeobj::", nodeObj);
    const type = nodeObj.label;
    console.log("type::", type);
    const blueprintid = nodeObj.blueprintid;
    console.log("blueprint id::", blueprintid);
    //await prepareNodeData(blueprintid);
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    console.log("position:", position);

    const newNode = {
      id: blueprintid,
      type: 'selectorNode',
      position,
      data: { label: `${type} node` },
    };

    setElements((nds) => nds.concat(newNode));
    const postresponse = await postBluePrintDropNode(nodeObj);
    console.log(postresponse);
  };
  */
  const graphstyle = {
    height: "100%",
    width: "100%",
  };
  return (
    <div className="flex fle-1 w-100p h-100p" data-testid="blueprint-creator">
      <div className="dndflow" style={graphstyle}>
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={elements}
              edges={edges}
              onConnect={onConnect}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              onInit={setReactFlowInstance}
              // onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
              snapToGrid={true}
              snapGrid={[15, 15]}
            >
              <Controls style={{ top: 0, left: 0, height: "fit-content" }} />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

BluePrintCreator.propTypes = {
  selectedNode: PropTypes.string,
};

export default BluePrintCreator;
/* eslint-disable react/no-children-prop */
import React, { useState, useEffect, useMemo } from "react";
import { Icon, Divider, Card } from "semantic-ui-react";
import PropTypes from "prop-types";
import CardSelectorNode from "./CardSelectorNode";

import LayersIcon from ".././Assets/Layers.svg";

export const TreeView = ({ data, setNode, selectedNode }) => {
  const [isExpandAll, setExpandAll] = useState(false);
  const [resultCount, setResultCount] = useState(0);

  useEffect(async () => {
    if (data.length) {
      const result = await countResultLength(data, 0);
      setResultCount(result);
    }
  }, [data]);
  if (!data || data.length === 0) {
    return null;
  }

  const countResultLength = (data, initialValue = 0) => {
    let count = initialValue;
    data.forEach((item) => {
      if (item.items && item.items.length > 0 && item.items[0].subText) {
        count += item.items.length;
      } else if (item.items && item.items.length > 0) {
        count = countResultLength(item.items, count);
      }
    });
    return count;
  };

  return (
    <React.Fragment>
      <div className="flex gap-10 flex-j-s-b m-0-20">
        <div
          className="fs-16"
          data-testid="result"
        >{`${resultCount} Results`}</div>
        <div
          className="flex color-sky-label cursor-p flex-j-end fs-16"
          data-testid="expand"
          onClick={() => setExpandAll(!isExpandAll)}
        >
          <span data-testid="expandbtn">
            {isExpandAll ? "Collapse All" : "Expand All"}
          </span>
        </div>
      </div>
      <Divider />
      <div className="flex-c oflow-y-auto" data-testid="tree-view">
        {data.map((item, index) => {
          const items = item.items;
          return (
            <TreeNode
              key={index}
              node={item}
              children={items}
              isExpandAll={isExpandAll}
              onNodeClick={setNode}
              selectedNode={selectedNode}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};
TreeView.propTypes = {
  data: PropTypes.array,
  setNode: PropTypes.func,
};

export const TreeNode = ({
  node,
  children,
  isExpandAll,
  onNodeClick,
  selectedNode
}) => {
  const [isChildrenVisible, setChildrenVisible] = useState(isExpandAll);
  const nodeTypes = useMemo(() => ({ selectorNode: CardSelectorNode }), []);
  const [isDragInProgress, setDragInProgress] = useState(false);
  useEffect(() => {
    setChildrenVisible(isExpandAll);
  }, [isExpandAll]);
  const renderChildren = () => {
    return children.map((subChild, index) => (
      <TreeNode
        key={index}
        node={subChild}
        children={subChild.items}
        isExpandAll={isExpandAll}
        onNodeClick={onNodeClick}
        selectedNode={selectedNode}
      />
    ));
  };
  const handleNodeClick = () => {
    if (children) {
      setChildrenVisible(!isChildrenVisible);
    }
  };
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
    setDragInProgress(true);
  };
  const onDragEnd = () => {
    setDragInProgress(false);
  };

  const nodeid = node.topologyid
    ? node.topologyid
    : node.blueprintid
    ? node.blueprintid
    : node.id;

  return (
    <div className="flex w-100p">
      <div className="flex-c gap-10 w-100p m-b-2">
        <div className="flex-c  w-100p ">
          {node.subText && (
            <Card
              data-testid="cardid"
              className={`m-0-20 cardClasses ${
                nodeid === selectedNode || isDragInProgress
                  ? "selected-card"
                  : "non-selected-card"
              }`}
              key={node.id}
              onClick={() => onNodeClick(nodeid)}
            >
              <Card.Content
                className="displayBlock"
                onDragStart={(event) =>
                  onDragStart(event, JSON.stringify(node))
                }
                onDragEnd={onDragEnd}
                draggable
              >
                {
                  <div className="flex node-wrapper">
                    <div className="circle-5"></div>
                    <div className="flex-c flex-1 gap-10">
                      <div className="fw-b card-label-1">{node.label}</div>
                      <div className="flex flex-j-s-b node-footer">
                        <div data-testid="node-type" className={node.type}>
                          {node.type}
                        </div>
                        <div>
                          <img alt="" src={LayersIcon} />
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </Card.Content>
            </Card>
          )}
          {!node.subText && (
            <div
              className="flex w-100p flex-a-center flex-j-s-b border-b p-0-20 cursor-p"
              onClick={handleNodeClick}
            >
              <div className="accordion-padding fw-b fs-18">
                {node.label} &nbsp;
                {children &&
                  children.length > 0 &&
                  children[0].subText &&
                  `(${children.length})`}
              </div>
              <Icon
                name={isChildrenVisible ? "angle up" : "angle down"}
                data-testid="angle-up-down"
              />
            </div>
          )}
        </div>
        {children &&
          children.length > 0 &&
          isChildrenVisible &&
          renderChildren()}
      </div>
    </div>
  );
};
TreeNode.propTypes = {
  node: PropTypes.object,
  children: PropTypes.object,
  isExpandAll: PropTypes.bool,
  onNodeClick: PropTypes.func,
};
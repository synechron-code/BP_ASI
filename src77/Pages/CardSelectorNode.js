import React, { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';

import LayersIcon from ".././Assets/Layers.svg";

const handleStyle = { left: 10 };

function CardSelectorNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const renderSubFlowNodes = (id) => {
    console.log(id);
  }

  return (
    <>
        <Handle type="target" position={Position.Top} />
        <div className="flex node-wrapper">
            <div className="circle-5"></div>
            <div className="flex-c flex-1 gap-10"> 
                <div className="fw-b card-label-1">{data['label']}</div>
                <div className="flex flex-j-s-b node-footer">
                    <span className="controlled">{data['type']}</span>
                <div>
                    {/* <img alt="" src={LayersIcon} /> */}
                    <button className="btn-transparent btn-toggle-node" href="#" onClick={() => renderSubFlowNodes(data['id']) }>
                      <div> 
                          <img src={LayersIcon}/>    
                      </div>
                    </button>
                </div>
                </div>
            </div>
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default CardSelectorNode;
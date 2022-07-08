/* istanbul ignore file */
/* eslint-disable react/no-children-prop */
import React, { useState, useEffect } from "react";
import {
  // Tab,
  Icon,
  Divider,
  Checkbox,
  Label,
  Segment,
  Dropdown,
  Form,
  Radio,
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { getRightPaneBuildData } from "../Actions/Build";

import TrashIcon from ".././Assets/Trash.svg";
import LockIcon from ".././Assets/Lock.svg";
import UnLockIcon from ".././Assets/Unlock.svg";

const countryOptions = [
  { key: "af", value: "af", text: "CTI" },
  { key: "ax", value: "ax", text: "Benjamin Kerry" },
  { key: "al", value: "al", text: "Cathy Harrison" },
  { key: "dz", value: "dz", text: "Tom" },
  { key: "as", value: "as", text: "Dick" },
  { key: "ad", value: "ad", text: "Andora" },
  { key: "ao", value: "ao", text: "Angola" },
  { key: "ai", value: "ai", text: "Anguilla" },
];

const TreeView = ({ data }) => {
  console.log("TreeView::", data);
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
        console.log("else if:", item.items);
        count = countResultLength(item.items, count);
      }
    });
    return count;
  };
  return (
    <React.Fragment>
      <div className="flex gap-10 flex-j-s-b rightResults  flex-a-center">
        <div className="fs-16">{`${resultCount} Results`}</div>
        <div
          className="flex color-sky-label cursor-p flex-j-end fs-16"
          onClick={() => setExpandAll(!isExpandAll)}
        >
          <span>{isExpandAll ? "Collapse All" : "Expand All"}</span>
        </div>
        {/* <div className="color-sky-label cursor-p">
          <span>Collapse All</span>
        </div> */}
      </div>
      <Divider />
      <div className="flex-c oflow-y-auto">
        {data.map((item, index) => {
          return (
            <TreeNode
              key={index}
              node={item}
              children={item.items}
              isExpandAll={isExpandAll}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};
TreeView.propTypes = {
  data: PropTypes.array,
};

const TreeNode = ({ node, children, isExpandAll }) => {
  const [isChildrenVisible, setChildrenVisible] = useState(isExpandAll);
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
      />
    ));
  };
  const handleNodeClick = () => {
    if (children) {
      setChildrenVisible(!isChildrenVisible);
    }
  };
  const renderComponent = (type) => {
    switch (type) {
      case "details":
        return <DetailsComponent />;
      case "versions":
        return <VersionsComponent />;
      case "share":
        return <ShareComponent />;
      case "loadbalance":
        return <LoadBalancerContent />;
      case "haproxyserver1":
        return <HAProxyContent />;
      default:
        return <div className="flex column gap-4 p-0-20">No Content</div>;
    }
  };
  return (
    <div className="flex w-100p  ">
      <div className="flex-c gap-10 w-100p ">
        <div className="flex-c  w-100p ">
          {node.subText && renderComponent(node.subText)}

          {!node.subText && (
            <div
              className="flex w-100p flex-a-center flex-j-s-b border-b p-0-20 cursor-p"
              onClick={handleNodeClick}
            >
              <div className="accordion-padding fw-b fs-18">{node.label}</div>
              <Icon name={isChildrenVisible ? "angle up" : "angle down"} />
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
};

const DetailsComponent = () => {
  return (
    <div className="flex column gap-4 p-0-20">
      <Segment secondary className="bg-secondary">
        <div className="flex flex-j-s-b">
          <div className="">Name</div>
          <div className="">Web Farm</div>
        </div>
      </Segment>
      <Segment secondary className="bg-secondary">
        <div className="flex flex-j-s-b">
          <div className="">UID</div>
          <div className="">10112</div>
        </div>
      </Segment>
      <Segment secondary className="bg-secondary">
        <div className="flex flex-j-s-b">
          <div className="">Environment</div>
          <div className="">Production</div>
        </div>
      </Segment>
      <Segment>
        <div className="flex column">
          <div className="">Description</div>
          <p className="text">
            Web Form for Q1 2022. This blueprint has proven successful and can
            be deployed across all environment. Web Form for Q1 2022. This
            blueprint has proven successful and can be deployed across all
            environment.
          </p>
        </div>
      </Segment>
      <Segment>
        <div className="flex column">
          <div className="">Tags</div>
          <div className="flex">
            <Label basic size="mini">
              Web-Farm-01
            </Label>
            <Label basic size="mini">
              Apache
            </Label>
            <Label basic size="mini">
              Load balancer
            </Label>
          </div>
        </div>
      </Segment>
    </div>
  );
};
const ShareComponent = () => {
  const [accessValue, setAccessValue] = useState({});
  const handleChange = (e, { value }) => setAccessValue({ value });
  return (
    <div className="flex column p-0-10 gap-4">
      <div className="flex">
        <Form className="flex">
          <Form.Field>
            <Radio
              label="Open access"
              name="radioGroup"
              value="this"
              checked={accessValue.value === "this"}
              onChange={handleChange}
              className="fs-16"
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Restricted access"
              name="radioGroup"
              value="that"
              checked={accessValue.value === "that"}
              onChange={handleChange}
              className="fs-16"
            />
          </Form.Field>
        </Form>
      </div>
      <div className="color-sky-label">+ Add Individual or Group</div>
      <div className="flex gap-4">
        <Dropdown
          placeholder="Search"
          fluid
          search
          selection
          className="bg-secondary"
          options={countryOptions}
        />
        <img alt="" src={TrashIcon} />
      </div>
      <div className="flex gap-4">
        <Dropdown
          placeholder="Search"
          fluid
          search
          selection
          className="bg-secondary"
          options={countryOptions}
        />
        <img alt="" src={TrashIcon} />
      </div>
      <div className="flex gap-4">
        <Dropdown
          placeholder="Search"
          fluid
          search
          selection
          className="bg-secondary"
          options={countryOptions}
        />
        <img alt="" src={TrashIcon} />
      </div>
    </div>
  );
};

const VersionsComponent = () => {
  return (
    <div className="flex column p-0-10 gap-4">
      <Checkbox
        label={{
          children: (
            <span className="fs-16">
              <b>v. 1.1.5</b> | 12/16/21 By James Smith{" "}
              <span className="color-violet float-right">Controlled</span>
            </span>
          ),
        }}
      />
      <Checkbox
        label={{
          children: (
            <span className="fs-16">
              <b>v. 1.1.4</b> | 12/16/21 By James Smith
              <span className="core-color float-right">Core</span>
            </span>
          ),
        }}
      />
      <Checkbox
        label={{
          children: (
            <span className="fs-16">
              <b>v. 1.1.3</b> | 12/16/21 By James Smith
              <span className="color-violet float-right">Controlled</span>
            </span>
          ),
        }}
      />
      <Checkbox
        label={{
          children: (
            <span className="fs-16">
              <b>v. 1.1.2</b> | 12/16/21 By James Smith
              <span className="core-color float-right">Core</span>
            </span>
          ),
        }}
      />
      <Checkbox
        label={{
          children: (
            <span className="fs-16">
              <b>v. 1.1.1</b> | 12/16/21 By James Smith
              <span className="color-violet float-right">Controlled</span>
            </span>
          ),
        }}
      />
      <Checkbox
        label={{
          children: (
            <span className="fs-16">
              <b>v. 1.1.0</b> | 12/16/21 By James Smith
              <span className="core-color float-right">Core</span>
            </span>
          ),
        }}
      />
    </div>
  );
};
const OverViewSection = () => {
  const [overViewData, setOverViewData] = useState([]);
  useEffect(async () => {
    const response = await getRightPaneBuildData();
    setOverViewData(response.sampleArray);
  }, []);
  return (
    <div className="flex">
      <div className="flex-c h-100p rightTabWidth">
        <TreeView data={overViewData} />
      </div>
    </div>
  );
};

const LoadBalancerContent = () => {
  return (
    <div className="flex column p-0-10 gap-4">
      <div className="color-sky-label">+ Add Properties</div>
      <div className="flex gap-10 flex-a-center">
        <Segment secondary className="bg-secondary flex-1 m-b-0" size="mini">
          <div className="flex flex-j-s-b">
            <div className="">VIP</div>
            <div className="">Text</div>
          </div>
        </Segment>
        <img alt="" src={LockIcon} />
        <img alt="" src={TrashIcon} />
      </div>
      <div className="flex gap-10 flex-a-center">
        <Segment secondary className="bg-secondary flex-1 m-b-0" size="mini">
          <div className="flex flex-j-s-b">
            <div className="">VIP</div>
            <div className="">Text</div>
          </div>
        </Segment>
        <img alt="" src={LockIcon} />
        <img alt="" src={TrashIcon} />
      </div>
      <div className="flex gap-10 flex-a-center">
        <Segment secondary className="bg-secondary flex-1 m-b-0" size="mini">
          <div className="flex flex-j-s-b">
            <div className="">VIP</div>
            <div className="">Text</div>
          </div>
        </Segment>
        <img alt="" src={UnLockIcon} />
        <img alt="" src={TrashIcon} />
      </div>
      <div className="flex gap-10 flex-a-center">
        <Segment secondary className="bg-secondary flex-1 m-b-0" size="mini">
          <div className="flex flex-j-s-b">
            <div className="">VIP</div>
            <div className="">Text</div>
          </div>
        </Segment>
        <img alt="" src={UnLockIcon} />
        <img alt="" src={TrashIcon} />
      </div>
      <div className="flex gap-10 flex-a-center">
        <Segment secondary className="bg-secondary flex-1 m-b-0" size="mini">
          <div className="flex flex-j-s-b">
            <div className="">VIP</div>
            <div className="">Text</div>
          </div>
        </Segment>
        <img alt="" src={LockIcon} />
        <img alt="" src={TrashIcon} />
      </div>
    </div>
  );
};

const HAProxyContent = () => {
  return (
    <div className="flex column p-0-10 gap-4">
      <div className="color-sky-label">+ Add Properties</div>
      <div className="flex gap-10 flex-a-center">
        <Segment secondary className="bg-secondary flex-1 m-b-0" size="mini">
          <div className="flex flex-j-s-b">
            <div className="">Proxy POrt</div>
            <div className="">Int</div>
          </div>
        </Segment>
        <img alt="" src={LockIcon} />
        <img alt="" src={TrashIcon} />
      </div>
      <div className="flex gap-10 flex-a-center">
        <Segment secondary className="bg-secondary flex-1 m-b-0" size="mini">
          <div className="flex flex-j-s-b">
            <div className="">Max Connection</div>
            <div className="">Int</div>
          </div>
        </Segment>
        <img alt="" src={UnLockIcon} />
        <img alt="" src={TrashIcon} />
      </div>
      <div className="flex gap-10 flex-a-center">
        <Segment secondary className="bg-secondary flex-1 m-b-0" size="mini">
          <div className="flex flex-j-s-b">
            <div className="">User</div>
            <div className="">Text</div>
          </div>
        </Segment>
        <img alt="" src={LockIcon} />
        <img alt="" src={TrashIcon} />
      </div>
      <div className="flex gap-10 flex-a-center">
        <Segment secondary className="bg-secondary flex-1 m-b-0" size="mini">
          <div className="flex flex-j-s-b">
            <div className="">Group</div>
            <div className="">Text</div>
          </div>
        </Segment>
        <img alt="" src={UnLockIcon} />
        <img alt="" src={TrashIcon} />
      </div>
      <div className="flex gap-10 flex-a-center">
        <Segment secondary className="bg-secondary flex-1 m-b-0" size="mini">
          <div className="flex flex-j-s-b">
            <div className="">Num Procs</div>
            <div className="">Int</div>
          </div>
        </Segment>
        <img alt="" src={LockIcon} />
        <img alt="" src={TrashIcon} />
      </div>
      <div className="flex gap-10 flex-a-center">
        <Segment secondary className="bg-secondary flex-1 m-b-0" size="mini">
          <div className="flex flex-j-s-b">
            <div className="">Time Out Cliet</div>
            <div className="">Int</div>
          </div>
        </Segment>
        <img alt="" src={UnLockIcon} />
        <img alt="" src={TrashIcon} />
      </div>
    </div>
  );
};
const ProertiesSection = () => {
  const [propertyData, setPropertyData] = useState([]);
  useEffect(async () => {
    const response = await getRightPaneBuildData();
    setPropertyData(response.sampleBluePrintArray);
  }, []);
  return (
    <div className="flex">
      <div className="flex-c h-100p rightTabWidth">
        <TreeView data={propertyData} />
      </div>
    </div>
  );
};

const LogSection = () => {
  const [logData, setLogData] = useState([]);
  useEffect(async () => {
    const response = await getRightPaneBuildData();
    setLogData(response.sampleLogsArray);
  }, []);
  return (
    <div className="flex">
      <div className="flex-c h-100p rightTabWidth">
        <TreeView data={logData} />
      </div>
    </div>
  );
};
const RightEndSection = ({ rightSideTab, showRightPane }) => {
  if (!showRightPane) {
    return null;
  }
  return (
    <div className="rightTabWidth">
      {rightSideTab === "overview" && (
        <div className="p-0 mh-93p  h-100p oflow-y-auto m-t-0">
          <OverViewSection />
        </div>
      )}
      {rightSideTab === "properties" && (
        <div className="p-0 mh-93p  h-100p oflow-y-auto m-t-0">
          <ProertiesSection />
        </div>
      )}
      {rightSideTab === "logs" && (
        <div className="p-0 mh-93p  h-100p oflow-y-auto m-t-0">
          <LogSection />
        </div>
      )}
    </div>
    // <Tab
    //   menu={{ secondary: true, pointing: true }}
    //   panes={panes}
    //   className="rightTabWidth"
    // />
  );
};

RightEndSection.propTypes = {
  rightSideTab: PropTypes.string
};

export default RightEndSection;
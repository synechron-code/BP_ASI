/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
import { Icon, Input, Menu, Dropdown, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import FilterIcon from ".././Assets/Filter.svg";
import RightEndSection from "./RightSidePane";
import OverviewFlow from "./Topology";
import AceEditor from "react-ace";
import Discard from ".././Assets/Discard.svg";
import Save from ".././Assets/Save.svg";
import TableView from ".././Assets/TableView.svg";
import InactiveTableView from ".././Assets/InactiveTableView.svg";
import ActiveCodeIcon from ".././Assets/ActiveCodeIcon.svg";
import InactiveCodeIcon from ".././Assets/InactiveCodeIcon.svg";
import BluePrintIcon from ".././Assets/BluePrintIcon.svg";
import InactiveBluePrintIcon from "../Assets/InactiveBluePrintIcon.svg";
import TopologyIcon from "../Assets/TopologyIcon.svg";
import InactiveTopologyIcon from "../Assets/InactiveTopologyIcon.svg";
import OverviewButton from "../Assets/OverviewButton.svg";
import OverviewButtonSelected from "../Assets/OverviewButtonSelected.svg";
import PropertiesButton from "../Assets/PropertiesButton.svg";
import PropertiesButtonSelected from "../Assets/PropertiesButtonSelected.svg";
import BluePrintCreator from "./BluePrintCreator.js";
import Tooltip from "@material-ui/core/Tooltip";
import getBuildData, { getTopologies, getBluePrints } from "../Actions/Build";
import CreateTopologyModal from "./CreateTopology";
import CreateBluePrintModal from "./CreateBluePrint";
import SuccessNotification from "./Notification";
import { TreeView } from "./TreeView";

import "../Styles/Build.css";

const sampleYMALData = `...
blueprint: "Front End Web Server"
version: 1.1.5
lifecycle: "Core"
topology_uuid: bb28f520-20a0-4267-98f8-ca58dcc99447
blueprint_uuid: 6acd4e51-c0db-43e9-8c25-6ba0aa1c8b1a
description: "Topology for front end web server Q1 2022"
tags:
   - Front-end-web-server
   - web-server-blueprint
   - Linux-2021
   - Apache
share:
   restricted-access: true
   roles:
      - "CTI"
      - "Benjamin Kerry"
      - "Cathy Harrison"
component_blueprints:
      - blueprint: "Load Balancer"
            - name: load_balancer1
            - version: 1.1.1
            - vip: https://www.bankofamerica.com
            - connection:
                  - connects:
                        - destination: apache_web_server1
                        - type: "vip"
                  - connects:
                        - destination: apache_web_server2
                        - type: "vip"
      - blueprint: "Apache Web Server"
            - name: apache_web_server1
            - version: 1.1.1
            - url: https://www.bankofamerica.com
            - admin: https://nyws123.boa.net:8282
      - blueprint: "Apache Web Server"
            - name: apache_web_server2
            - version: 1.1.1
            - url: https://www.bankofamerica.com
            - admin: https://caws456.boa.net:8282
      - blueprint: "Linux Server"
            - name: linux_server1
            - version: 1.2.11
            - host: "nyws123.boa.net"
            - cpu: 2
            - memory: 16
      - blueprint: "Linux Server"
            - name: linux_server2
            - version: 1.2.1
            - host: "nyws123.boa.net"
            - cpu: 2
            - memory: 16`;

const TopologyContent = ({
  activeItem,
  selectedNode,
  setNode,
  showTopoNotification,
  setShowTopoNotification,
  selectedVersion,
  showLeftPane
}) => {
  const [topologyData, setTopologyData] = useState([]);
  useEffect(async () => {
    const response = await getBuildData();
    const r1 = await getTopologies();
    setTopologyData(r1);
  }, []);
  return (
    <div className="flex h-100p">
      {showLeftPane && (
        <div className="border-r-1 flex-c h-100p  tabsWidth">
          <div className="ui icon input m-20">
            <i aria-hidden="true" className="search icon left-0"></i>
            <input
              type="text"
              className="p-l-icon"
              placeholder="Search..."
              data-testid="search-box-topology"
            />
            <i aria-hidden="true" className="icon m-8">
              <img alt="" src={FilterIcon} />
            </i>
          </div>
          <TreeView
            data={topologyData}
            setNode={setNode}
            selectedNode={selectedNode}
          />
        </div>
      )}
      <div className="flex flex-c flex-1 w-100p h-100vh main-background">
        {showTopoNotification && (
          <SuccessNotification
            message={"Topology has been saved as a draft."}
            title={"Success!"}
            onClose={setShowTopoNotification}
          />
        )}
        {activeItem === "flow" && (
          <OverviewFlow
            selectedNode={selectedNode}
            selectedVersion={selectedVersion}
          />
        )}
        {activeItem === "code" && (
          <div className="flex">
            <AceEditor
              placeholder="Placeholder Text"
              mode="javascript"
              theme="monokai"
              name="blah2"
              fontSize={14}
              width="800px"
              height="900px"
              showPrintMargin={false}
              showGutter={true}
              highlightActiveLine={true}
              value={sampleYMALData}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 3,
                readOnly: true,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

TopologyContent.propTypes = {
  activeItem: PropTypes.string,
  selectedNode: PropTypes.string,
  setNode: PropTypes.func,
  showTopoNotification: PropTypes.bool,
  setShowTopoNotification: PropTypes.func,
  selectedVersion: PropTypes.string,
};

const BluePrintContent = ({
  activeItem,
  selectedNode,
  showBluePrintNotification,
  setShowBluePrintNotification,
  setNode,
  showLeftPane
}) => {
  const [bluePrintData, setBluePrintData] = useState([]);

  useEffect(async () => {
    const response = await getBuildData();
    const r2 = await getBluePrints();

    setBluePrintData(r2);
  }, []);
  return (
    <div className="flex h-100p" data-testid="blueprint-content">
      {/* <div className="border-r-1 flex-c h-100p h-100vh tabsWidth ">  */}
      {showLeftPane && (
        <div className="border-r-1 flex flex-c h-100p  tabsWidth">
          <Input icon placeholder="Search..." className="m-20">
            <input />
            <Icon name="search" />
          </Input>

          <TreeView data={bluePrintData} setNode={setNode} />
        </div>
      )}
      <div className="flex flex-c flex-1 w-100p h-100p">
        {showBluePrintNotification && (
          <SuccessNotification
            message={"Blueprint has been saved as a draft."}
            title={"Success!"}
            onClose={setShowBluePrintNotification}
          />
        )}
        {activeItem === "flow" && (
          <BluePrintCreator selectedNode={selectedNode} />
        )}
        {activeItem === "code" && (
          <div className="flex">
            <AceEditor
              placeholder="Placeholder Text"
              mode="javascript"
              theme="monokai"
              name="blah2"
              fontSize={14}
              width="800px"
              height="900px"
              showPrintMargin={false}
              showGutter={true}
              highlightActiveLine={true}
              value={sampleYMALData}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 3,
                readOnly: true,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

BluePrintContent.propTypes = {
  activeItem: PropTypes.string,
  selectedNode: PropTypes.string,
  showBluePrintNotification: PropTypes.bool,
  setShowBluePrintNotification: PropTypes.func,
  setNode: PropTypes.func
};

const Tabs = ({
  activeItem,
  setShowTopoNotification,
  showTopoNotification,
  setShowBluePrintNotification,
  showBluePrintNotification,
  selectedVersion,
  activeTab,
  showLeftPane
}) => {
  const [selectedNode, setNode] = useState("");

  return (
    <div className="flex flex-1">
      {activeTab === "Topology" && (
        <div className="p-0 mh-93p w-100p h-100p mt-0">
          <TopologyContent
            activeItem={activeItem}
            selectedNode={selectedNode}
            setNode={setNode}
            showTopoNotification={showTopoNotification}
            setShowTopoNotification={setShowTopoNotification}
            selectedVersion={selectedVersion}
            showLeftPane={showLeftPane}
          />
        </div>
      )}
      {activeTab === "Blueprint" && (
        <div className="p-0 mh-93p w-100p h-100p mt-0 bg-white">
          <BluePrintContent
            activeItem={activeItem}
            selectedNode={selectedNode}
            setNode={setNode}
            showBluePrintNotification={showBluePrintNotification}
            setShowBluePrintNotification={setShowBluePrintNotification}
            showLeftPane={showLeftPane}
          />
        </div>
      )}
      {/* <Tab
        menu={{ secondary: true, pointing: true }}
        onTabChange={onTabChange}
        panes={[
          {
            menuItem: () => (
              <img alt="" src={TableView} className="tabiconClasses" />
            ),

            render: () => (
              <Tab.Pane attached={false} className="p-0 mh-93p h-100p mt-0">
                <TopologyContent
                  activeItem={activeItem}
                  selectedNode={selectedNode}
                  setNode={setNode}
                  showTopoNotification={showTopoNotification}
                  setShowTopoNotification={setShowTopoNotification}
                  selectedVersion={selectedVersion}
                />
              </Tab.Pane>
            ),
          },
          {
            menuItem: { key: "blueprint", icon: "caret square right" },
            render: () => (
              <Tab.Pane attached={false} className="p-0 mh-93p  h-100p mt-0">
                <BluePrintContent
                  activeItem={activeItem}
                  selectedNode={selectedNode}
                  setNode={setNode}
                  showBluePrintNotification={showBluePrintNotification}
                  setShowBluePrintNotification={setShowBluePrintNotification}
                />
              </Tab.Pane>
            ),
          },
        ]}
        className="flex-1"
        activeItem={activeItem}
      /> */}
    </div>
  );
};

Tabs.propTypes = {
  activeItem: PropTypes.string,
  showTopoNotification: PropTypes.bool,
  setShowTopoNotification: PropTypes.func,
  onTabChange: PropTypes.func,
  setShowBluePrintNotification: PropTypes.func,
  showBluePrintNotification: PropTypes.bool,
  selectedVersion: PropTypes.string,
  activeTab: PropTypes.string
};

const Build = () => {
  const [activeItem, setActiveItem] = useState("flow");
  const [showTopoNotification, setShowTopoNotification] = React.useState(false);
  const [showBluePrintNotification, setShowBluePrintNotification] =
    React.useState(false);
  const [selectedVersion, setVersion] = useState("v.1.1.0");
  const [activeTab, setActiveTab] = useState("Topology");
  const [rightSideTab, setRightSideTab] = useState("overview");
  const [showLeftPane, setShowLeftPane] = useState(true);
  const [showRightPane, setShowRightPane] = useState(true);
  const onTabChange = (data) => {
    if (data === "Topology") {
      setActiveTab("Topology");
      if (activeTab === "Topology") {
        setShowLeftPane(!showLeftPane);
      } else {
        setShowLeftPane(true);
      }
    } else if (data === "Blueprint") {
      setActiveTab("Blueprint");
      if (activeTab === "Blueprint") {
        setShowLeftPane(!showLeftPane);
      } else {
        setShowLeftPane(true);
      }
    }
  };
  const onChangeRightSideTab = (item) => {
    setRightSideTab(item);
    if (rightSideTab === "overview" && item === "overview") {
      setShowRightPane(!showRightPane);
    } else if (rightSideTab === "properties" && item === "properties") {
      setShowRightPane(!showRightPane);
    } else {
      setShowRightPane(true);
    }
  };
  return (
    <div className="flex flex-c flex-1">
      <Header
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        setShowTopoNotification={setShowTopoNotification}
        setShowBluePrintNotification={setShowBluePrintNotification}
        activeTab={activeTab}
        selectedVersion={selectedVersion}
        setVersion={setVersion}
        onTabChange={onTabChange}
        onChangeRightSideTab={onChangeRightSideTab}
        rightSideTab={rightSideTab}
      />
      <div className="flex flex-j-s-b flex-1 mh-build">
        <Tabs
          activeItem={activeItem}
          showTopoNotification={showTopoNotification}
          setShowTopoNotification={setShowTopoNotification}
          setShowBluePrintNotification={setShowBluePrintNotification}
          showBluePrintNotification={showBluePrintNotification}
          activeTab={activeTab}
          selectedVersion={selectedVersion}
          showLeftPane={showLeftPane}

          // setActiveTab={setActiveTab}
        />
        <RightEndSection
          rightSideTab={rightSideTab}
          showRightPane={showRightPane}
        />
      </div>
    </div>
  );
};
const Header = ({
  activeItem,
  setActiveItem,
  setShowTopoNotification,
  setShowBluePrintNotification,
  activeTab,
  selectedVersion,
  setVersion,
  onTabChange,
  onChangeRightSideTab,
  rightSideTab
}) => {
  return (
    <Menu>
      <div className="flex  flex-a-center gap-10 p-l-10">
        <Menu.Item
          name="Topology"
          onClick={() => {
            onTabChange("Topology");
          }}
          data-testid="Topology-menu"
          active={activeTab === "Topology"}
          className="p-0"
        >
          {activeTab === "Topology" ? (
            <Tooltip title="Topology" placement="top" arrow>
              <img alt="" src={TopologyIcon} className="tabiconClasses" />
            </Tooltip>
          ) : (
            <Tooltip title="Topology" placement="top" arrow>
              <img
                alt=""
                src={InactiveTopologyIcon}
                className="tabiconClasses"
              />
            </Tooltip>
          )}
        </Menu.Item>

        <Menu.Item
          name="blueprint"
          data-testid="Blueprint"
          onClick={() => {
            onTabChange("Blueprint");
          }}
          active={activeTab === "Blueprint"}
          className="p-0"
        >
          {/* <Icon name="code" color={activeItem === "code" ? "blue" : "grey"} /> */}
          {activeTab === "Blueprint" ? (
            <Tooltip title="BluePrint" placement="top" arrow>
              <img alt="" src={BluePrintIcon} className="tabiconClasses" />
            </Tooltip>
          ) : (
            <Tooltip title="BluePrint" placement="top" arrow>
              <img
                alt=""
                src={InactiveBluePrintIcon}
                className="tabiconClasses"
              />
            </Tooltip>
          )}
        </Menu.Item>
      </div>
      <Menu.Item name="browse" onClick={() => {}} active={false}>
        <div className="color-red fs-16" data-testid="web-farm-header">
          Web Farm
        </div>
      </Menu.Item>

      <Dropdown item text={selectedVersion} value={selectedVersion}>
        <Dropdown.Menu>
          <Dropdown.Item
            value="v.1.1.0"
            data-testid="v110-dropdown"
            selected={selectedVersion === "v.1.1.0"}
            onClick={() => setVersion("v.1.1.0")}
          >
            v. 1.1.0
          </Dropdown.Item>
          <Dropdown.Item
            value="v.1.2.0"
            data-testid="v120-dropdown"
            selected={selectedVersion === "v.1.2.0"}
            onClick={() => setVersion("v.1.2.0")}
          >
            v. 1.2.0
          </Dropdown.Item>
          <Dropdown.Item
            value="v.1.2.3"
            data-testid="v123-dropdown"
            selected={selectedVersion === "v.1.2.3"}
            onClick={() => {
              setVersion("v.1.2.3");
            }}
          >
            v. 1.2.3
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="flex flex-1 flex-a-center flex-j-end p-r-20">
        <Menu.Item
          name="signup"
          onClick={() => {
            setActiveItem("flow");
          }}
          active={activeItem === "flow"}
        >
          {/* <Icon
            name="add circle"
            color={activeItem === "flow" ? "blue" : "grey"}
          /> */}
          {activeItem === "flow" ? (
            <Tooltip title="Canvas" placement="top" arrow>
              <img alt="" src={TableView} className="tabiconClasses" />
            </Tooltip>
          ) : (
            <Tooltip title="Canvas" placement="top" arrow>
              <img alt="" src={InactiveTableView} className="tabiconClasses" />
            </Tooltip>
          )}
        </Menu.Item>

        <Menu.Item
          name="code"
          onClick={() => {
            setActiveItem("code");
          }}
          active={activeItem === "code"}
        >
          {/* <Icon name="code" color={activeItem === "code" ? "blue" : "grey"} /> */}
          {activeItem === "code" ? (
            <Tooltip title="Editor" placement="top" arrow>
              <img alt="" src={ActiveCodeIcon} className="tabiconClasses" />
            </Tooltip>
          ) : (
            <Tooltip title="Editor" placement="top" arrow>
              <img alt="" src={InactiveCodeIcon} className="tabiconClasses" />
            </Tooltip>
          )}
        </Menu.Item>
      </div>
      <Menu.Menu position="right">
        {/* <Menu.Item name="signup" onClick={() => {}} active={false}>
          <Tooltip title="Add" placement="top" arrow>
            <img alt="" src={AddButton} className="iconClasses" />
          </Tooltip>
        </Menu.Item> */}

        <div className="flex  flex-a-center">
          <Menu.Item
            name="overview"
            onClick={() => {
              onChangeRightSideTab("overview");
            }}
            active={rightSideTab === "overview"}
          >
            {/* <Icon
            name="add circle"
            color={activeItem === "flow" ? "blue" : "grey"}
          /> */}
            {rightSideTab === "overview" ? (
              <Tooltip title="overview" placement="top" arrow>
                <img
                  alt=""
                  src={OverviewButtonSelected}
                  className="tabiconClasses"
                />
              </Tooltip>
            ) : (
              <Tooltip title="overview" placement="top" arrow>
                <img alt="" src={OverviewButton} className="tabiconClasses" />
              </Tooltip>
            )}
          </Menu.Item>

          <Menu.Item
            name="properties"
            onClick={() => {
              onChangeRightSideTab("properties");
            }}
            active={rightSideTab === "properties"}
          >
            {/* <Icon name="code" color={activeItem === "code" ? "blue" : "grey"} /> */}
            {rightSideTab === "properties" ? (
              <Tooltip title="properties" placement="top" arrow>
                <img
                  alt=""
                  src={PropertiesButtonSelected}
                  className="tabiconClasses"
                />
              </Tooltip>
            ) : (
              <Tooltip title="properties" placement="top" arrow>
                <img alt="" src={PropertiesButton} className="tabiconClasses" />
              </Tooltip>
            )}
          </Menu.Item>
          {/* <Menu.Item
            name="logs"
            onClick={() => {
              onChangeRightSideTab("logs");
            }}
            active={rightSideTab === "logs"}
            className={
              rightSideTab === "logs" ? "tab-menu-item-active" : "tab-menu-item"
            }
          >
            {rightSideTab === "logs" ? (
              <Tooltip title="logs" placement="top" arrow>
                <img alt="" src={ActiveCodeIcon} className="tabiconClasses " />
              </Tooltip>
            ) : (
              <Tooltip title="logs" placement="top" arrow>
                <img alt="" src={InactiveCodeIcon} className="tabiconClasses" />
              </Tooltip>
            )}
          </Menu.Item> */}
        </div>
        {activeTab === "Topology" && (
          <CreateTopologyModal
            setShowTopoNotification={setShowTopoNotification}
          />
        )}
        {activeTab === "Blueprint" && (
          <CreateBluePrintModal
            setShowBluePrintNotification={setShowBluePrintNotification}
          />
        )}
        <Menu.Item
          name="signup"
          onClick={() => {}}
          active={false}
          data-testid="signup"
        >
          <Tooltip title="Discard" placement="top" arrow>
            <img alt="" src={Discard} className="tabIconClasses" />
          </Tooltip>
        </Menu.Item>
        <Menu.Item name="signup" onClick={() => {}} active={false}>
          <Tooltip title="Save" placement="top" arrow>
            <img
              alt=""
              src={Save}
              className="tabIconClasses"
              data-testid="save-icon"
            />
          </Tooltip>
        </Menu.Item>
        <Menu.Item name="help" onClick={() => {}} active={false}>
          <Tooltip title="Deploy" placement="top" arrow>
            <Button color="red" data-testid="deploy-header">
              {activeTab === "Topology" ? "Publish" : "Deploy"}
            </Button>
          </Tooltip>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
Header.propTypes = {
  activeItem: PropTypes.string,
  setActiveItem: PropTypes.func,
  setShowTopoNotification: PropTypes.func,
  setShowBluePrintNotification: PropTypes.func,
  activeTab: PropTypes.string,
  selectedVersion: PropTypes.string,
  setVersion: PropTypes.func,
  onTabChange: PropTypes.func,
  onChangeRightSideTab: PropTypes.func,
  rightSideTab: PropTypes.string
};
export default Build;
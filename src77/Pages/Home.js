import React, { useEffect, useState } from "react";
import {
  Tab
} from "semantic-ui-react";
import "../Styles/home.css";
import TopologiesTable from "./DashboardTopology";
import BluePrintDashboardContent from "./BlueprintDashboardContent";
import AlertsTable from "./DashboardAlerts";
import TagsTable from "./DashboardTags";
import { getTopologyTableData } from "../Actions/Dashboard";

const panes = [
  {
    menuItem: "Topologies",
    render: () => (
      <Tab.Pane
        attached={false}
        className="p-0 mh-93p  h-100p noBordertabPane main-background"
      >
        <TopologyDashboardContent />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Blueprints",
    render: () => (
      <Tab.Pane
        attached={false}
        className="p-0 mh-93p  h-100p noBordertabPane main-background"
      >
        <BluePrintDashboardContent />
      </Tab.Pane>
    ),
  },
];

const Tabs = () => (
  <Tab
    menu={{ secondary: true, pointing: true }}
    panes={panes}
    className="w-100p noBordertabPane"
  />
);

const TopologyDashboardContent = () => {
  const [topologyData, setTopologyData] = useState([]);
  useEffect(async () => {
    const res = await getTopologyTableData();
    const data = res.data.result;
    setTopologyData(data);
  }, []);
  return (
    <div className="flex column gap24 main-background">
      <div className="flex flex_1 p20 bg-white">
        <TopologiesTable topologyData={topologyData} />
      </div>
      <div className="flex gap24">
        <div className="flex flex_1 p20 bg-white">
          <TagsTable />
        </div>
        <div className="flex flex_1 p20 bg-white">
          <AlertsTable />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex flex_1 p40">
      <Tabs />
    </div>
  );
};

export default Dashboard;
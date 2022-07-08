import React, { useEffect, useState } from "react";
import "../Styles/home.css";
import BluePrintTable from "./DashboardBluePrint";
import AlertsTable from "./DashboardAlerts";
import TagsTable from "./DashboardTags";
import { getBluPrintData } from "../Actions/Dashboard";

const BluePrintDashboardContent = () => {
  const [blueprintsData, setBlueprintsData] = useState([]);
  useEffect(async () => {
    // const response = await getDashboardData();
    const res = await getBluPrintData();
    const data = res.data.result;
    setBlueprintsData(data);
  }, []);
  return (
    <div
      className="flex column gap24 main-background"
      data-testid="blueprint-dashboard-content"
    >
      <div className="flex flex_1 p20 bg-white">
        <BluePrintTable blueprintsData={blueprintsData} />
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

export default BluePrintDashboardContent;
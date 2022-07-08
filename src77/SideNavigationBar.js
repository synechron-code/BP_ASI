import React from "react";
import { useState } from "react";
import activeBuildLogo from "./Assets/Build-Active.svg";
import activeHomeLogo from "./Assets/Home-Active.svg";
import activeReportLogo from "./Assets/Reporting-Active.svg";
import inactiveHomeLogo from "./Assets/Home-Inactive.svg";
import inactiveBuildLogo from "./Assets/Build-Inactive.svg";
import inactiveReportLogo from "./Assets/Reporting-Inactive.svg";
import { Report } from "./Pages/Report.js";
import Tooltip from "@material-ui/core/Tooltip";
import SideNav from "./Pages/Build.js";
import Home from "./Pages/Home.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Styles/SideNavigationBar.css";
export function SideNavigationBar() {
  const [home, setHome] = useState(true);
  const [build, setBuild] = useState(false);
  const [report, setReport] = useState(false);

  return (
    <Router>
      {/* code for icons of Side Navigation bar*/}
      <div className="content bg-leftnav">
        <div className="side-navigationbar" data-testid="side-nav">
          <Link to={"/"}>
            <Tooltip
              title="Dashboard"
              data-testid="tooltip-dashboard"
              placement="top"
              arrow
            >
              <img
                data-testid="home-icon"
                src={home ? activeHomeLogo : inactiveHomeLogo}
                onClick={() => {
                  setHome(true);
                  setBuild(false);
                  setReport(false);
                }}
                className="nav-icon"
                alt="home-icon"
              />
            </Tooltip>
          </Link>
          <Link to={"/build"}>
            <Tooltip title="Build" data-testid="build" placement="top" arrow>
              <img
                data-testid="icon-build"
                src={build ? activeBuildLogo : inactiveBuildLogo}
                onClick={() => {
                  setBuild(true);
                  setHome(false);
                  setReport(false);
                }}
                className="nav-icon"
                alt="build-icon"
              />
            </Tooltip>
          </Link>
          <Link to={"/Report"}>
            <Tooltip
              title="Reporting"
              data-testid="reporting"
              placement="top"
              arrow
            >
              <img
                data-testid="reporting-icon"
                src={report ? activeReportLogo : inactiveReportLogo}
                onClick={() => {
                  setReport(true);
                  setBuild(false);
                  setHome(false);
                }}
                className="nav-icon"
                alt="report-icon"
              />
            </Tooltip>
          </Link>
        </div>
        {/* loades the respective component depending on which is selected */}
        <div className="screen">
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/Build" render={() => <SideNav />} />
            <Route exact path="/Report" render={() => <Report />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

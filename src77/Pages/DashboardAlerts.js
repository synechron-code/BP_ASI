import React, { useEffect, useState } from "react";
import { Table, Dropdown, Radio } from "semantic-ui-react";
import Tooltip from "@material-ui/core/Tooltip";
import MaximizeIcon from ".././Assets/Maximize.svg";
import getDashboardData from "../Actions/Dashboard";
const AlertsTable = () => {
  const [alertsData, setAlertsData] = useState([]);
  useEffect(async () => {
    const response = await getDashboardData();
    setAlertsData(response.alertsData);
  }, []);
  return (
    <div className="flex column flex_1">
      <div className="flex flex_1 f_j_c_sb">
        <div className="flex flex_1 gap16 p-l-10">
          <div className="fw-b" data-testid="alerts-header">
            Alerts this Week ({alertsData?.length}){" "}
          </div>
        </div>
        <div className="flex gap16 f_a_i_c">
          <Tooltip
            title="Maximize"
            placement="top"
            arrow
            data-testid="dashboard-alerts-table-minimise-icon"
          >
            <img alt="" src={MaximizeIcon} />
          </Tooltip>
          <Dropdown
            item
            icon="ellipsis vertical customIcon"
            data-testid="dashboard-alerts-table-more-item"
            simple
            floating
          >
            <Dropdown.Menu direction="left">
              <Dropdown.Item>
                <Radio label=" Show all alerts" data-testid="show-all-alerts" />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Radio label=" Show alerts this week" />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Radio label=" Show alerts this month" />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Radio label=" Show alerts past 60 days" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell data-testid="topology">Topology</Table.HeaderCell>
            <Table.HeaderCell data-testid="environment">
              Environment
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="versions">Versions</Table.HeaderCell>
            <Table.HeaderCell data-testid="description">
              Description
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {alertsData?.map((item, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <div className="flex gap8 flex-a-center">
                    <div className="circle-5-red"></div>
                    <div className="">{item.topoligies}</div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  <div className="">{item.environments}</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="color-sky-label">{item.versions}</div>
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  <div className="">{item.descriptions}</div>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AlertsTable;
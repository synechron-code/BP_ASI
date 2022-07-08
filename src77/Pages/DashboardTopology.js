import React from "react";
import {
  Table,
  Label,
  Icon,
  Dropdown,
  Checkbox
} from "semantic-ui-react";
import Tooltip from "@material-ui/core/Tooltip";
import MinimizeIcon from ".././Assets/Minimize.svg";
import PropTypes from "prop-types";

// import { getTopologyTableData } from "../actions/Dashboard";
const TopologiesTable = ({ topologyData }) => {
  return (
    <div className="flex column flex_1">
      <div className="flex flex_1 f_j_c_sb">
        <div className="flex flex_1 gap16 p-l-10">
          <div className="fw-b">Topologies ({topologyData.length}) </div>
          <Label size="tiny" data-testid="label-tiny">
            <div className="flex gap8 f_a_i_c">
              <div className="circle-5"></div>
              <div
                className="fs-12"
                data-testid="dashboard-topology-table-label-quis"
              >
                quis
              </div>
              <Icon name="delete" data-testid="delete-icon" />
            </div>
          </Label>
          <Label size="tiny">
            <div className="flex gap8 f_a_i_c">
              <div className="circle-5" data-testid="circle-5"></div>
              <div
                className="fs-12"
                data-testid="dashboard-topology-table-label-enim"
              >
                enim
              </div>
              <Icon
                name="delete"
                data-testid="dashboard-topology-table-icon-delete"
              />
            </div>
          </Label>
        </div>
        <div className="flex gap16 f_a_i_c">
          <Tooltip title="Minimize" placement="top" arrow>
            <img
              alt=""
              src={MinimizeIcon}
              data-testid="dashboard-topology-table-icon-minimise"
            />
          </Tooltip>
          <Dropdown
            item
            icon="ellipsis vertical customIcon"
            simple
            floating
            data-testid="dashboard-topology-table-icon-more"
          >
            <Dropdown.Menu direction="left">
              <Dropdown.Item className="p-0">
                <Checkbox
                  label=" Web Farm"
                  data-testid="dashboard-topology-table-more-item-web-farm"
                />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="p-0">
                <Checkbox
                  label=" Apache"
                  data-testid="dashboard-topology-table-more-item-apache"
                />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="p-0">
                <Checkbox
                  label=" Tomcat"
                  data-testid="dashboard-topology-table-more-item-tomcat"
                />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="p-0">
                <Checkbox
                  label=" Linux"
                  data-testid="dashboard-topology-table-more-item-linux"
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Table basic fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell data-testid="dashboard-topology-table-header-name">
              Name
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="dashboard-topology-table-header-id">
              Id
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="dashboard-topology-table-header-environment">
              Environment
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="dashboard-topology-table-header-type">
              Type
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="dashboard-topology-table-header-version">
              Versions
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="dashboard-topology-table-header-tags">
              Tags
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {topologyData.map((item, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <div className="flex gap8 flex-a-center">
                    <div className="circle-5"></div>
                    <div className="">{item.name}</div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="color-sky-label">{item.id}</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="">{item.environment}</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="typeLabelClasses">{item.type}</div>
                </Table.Cell>

                <Table.Cell className="color-sky-label">
                  <div className="color-sky-label">
                    {item.topologyVersion.map((topologyversion, index) => {
                      return (
                        <React.Fragment key={topologyversion}>
                          {index !== item.topologyVersion.length - 1
                            ? `${topologyversion},`
                            : topologyversion}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {item.tags.map((i, index) => {
                    return (
                      <React.Fragment key={i}>
                        {index !== item.tags.length - 1 ? `${i},` : i}
                      </React.Fragment>
                    );
                  })}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

TopologiesTable.propTypes = {
  topologyData: PropTypes.array,
};

export default TopologiesTable;
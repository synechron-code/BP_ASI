import React, { useEffect, useState } from "react";
import {
  Table,
  Label,
  Icon,
  Dropdown,
  Checkbox
} from "semantic-ui-react";
import Tooltip from "@material-ui/core/Tooltip";
import MaximizeIcon from ".././Assets/Maximize.svg";
import getDashboardData from "../Actions/Dashboard";
const TagsTable = () => {
  const [tagsData, setTagsData] = useState([]);
  useEffect(async () => {
    const response = await getDashboardData();
    setTagsData(response.tagsData);
  }, []);
  return (
    <div className="flex column flex_1">
      <div className="flex flex_1 f_j_c_sb">
        <div className="flex flex_1 gap16 p-l-10">
          <div className="fw-b">Tags ({tagsData.length}) </div>
          <Label size="tiny">
            <div className="flex gap8 f_a_i_c">
              <div
                className="fs-12"
                data-testid="dashboard-tags-table-apache-tag"
              >
                Apache
              </div>
              <Icon name="delete" />
            </div>
          </Label>
          <Label size="tiny">
            <div className="flex gap8 f_a_i_c">
              <div className="fs-12" data-testid="dashboard-tags-table-web-tag">
                Web
              </div>
              <Icon
                name="delete"
                data-testid="dashboard-tags-table-apache-delete-icon"
              />
            </div>
          </Label>
        </div>
        <div className="flex gap16 f_a_i_c">
          <Tooltip title="Maximize" placement="top" arrow>
            <img
              alt=""
              src={MaximizeIcon}
              data-testid="dashboard-tags-table-minimise-icon"
            />
          </Tooltip>
          <Dropdown
            item
            icon="ellipsis vertical customIcon"
            simple
            floating
            data-testid="dashboard-tags-table-more-item"
          >
            <Dropdown.Menu direction="left">
              <Dropdown.Item className="p-0">
                <Checkbox
                  label=" Web Farm"
                  data-testid="dashboard-tags-table-more-item-web-farm"
                />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="p-0">
                <Checkbox
                  label=" Apache"
                  data-testid="dashboard-tags-table-more-item-apache"
                />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="p-0">
                <Checkbox
                  label=" Tomcat"
                  data-testid="dashboard-tags-table-more-item-tomcat"
                />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="p-0">
                <Checkbox
                  label=" Linux"
                  data-testid="dashboard-tags-table-more-item-linux"
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Table basic fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell data-testid="dashboard-tags-table-header-topology">
              Topology
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="dashboard-tags-table-header-tags">
              Tags
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="dashboard-tags-table-header-versions">
              Versions
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="dashboard-tags-table-header-last-modified">
              Last Modified
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tagsData.map((item, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <div className="flex gap8 flex-a-center">
                    <div className="circle-5"></div>
                    <div className="">{item.topologies}</div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="">{item.tags}</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="color-sky-label">{item.versions}</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="">{item.lastModified}</div>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TagsTable;
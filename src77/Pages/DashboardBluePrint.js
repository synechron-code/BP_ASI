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

const BluePrintTable = ({ blueprintsData }) => {
  return (
    <div className="flex column flex_1">
      <div className="flex flex_1 f_j_c_sb">
        <div className="flex flex_1 gap16 p-l-10">
          <div className="fw-b" data-testid="blueprint-length">
            Blueprint ({blueprintsData?.length}){" "}
          </div>
          <Label size="tiny">
            <div className="flex gap8 f_a_i_c">
              <div className="circle-5"></div>
              <div className="fs-12" data-testid="quis-tag">
                quis
              </div>
              <Icon name="delete" />
            </div>
          </Label>
          <Label size="tiny">
            <div className="flex gap8 f_a_i_c">
              <div className="circle-5"></div>
              <div className="fs-12" data-testid="enim-tag">
                enim
              </div>
              <Icon name="delete" data-testid="delete-icon-enim-tag" />
            </div>
          </Label>
        </div>
        <div className="flex gap16 f_a_i_c">
          <Tooltip title="Minimize" placement="top" arrow>
            <img alt="" src={MinimizeIcon} data-testid="minimize-icon" />
          </Tooltip>
          <Dropdown
            item
            icon="ellipsis vertical customIcon"
            data-testid="more"
            simple
            floating
          >
            <Dropdown.Menu direction="left">
              <Dropdown.Item>
                <Checkbox label=" Web Farm" />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item data-testid="apache-drop-down">
                Apache
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item data-testid="linux-drop-down">Linux</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item data-testid="tomcat-drop-down">
                Tomcat
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Table basic fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell data-testid="version-table-header">
              Version
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="name-table-header">
              Name
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="types-table-header">
              Types
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="env-table-header">
              Environment
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="tags-table-header">
              Tags
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {blueprintsData?.map((item, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <div className="color-sky-label">
                    {item.blueprintVersion.map((blueprintVersion, index) => {
                      return (
                        <React.Fragment key={blueprintVersion}>
                          {index !== item.blueprintVersion.length - 1
                            ? `${blueprintVersion},`
                            : blueprintVersion}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="color-sky-label">{item.name}</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="color-sky-label">{item.type}</div>
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  <div className="">{item.environment}</div>
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  <div className="">
                    {item.tags.map((tag, index) => {
                      return (
                        <span key={tag} className="mr-5 p-l-10">
                          {index !== item.tags.length - 1 ? `${tag},` : tag}
                        </span>
                      );
                    })}
                  </div>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

BluePrintTable.propTypes = {
  blueprintsData: PropTypes.array,
};

export default BluePrintTable;
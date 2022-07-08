import React, { useEffect } from "react";
import { Menu, Form, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";
import AddButton from ".././Assets/AddButton.svg";

import { postTopology } from '../Actions/Build';

const options = [
  { key: "m", text: "BluePrint", value: "blueprint" },
  { key: "f", text: "Topology", value: "topology" },
  { key: "o", text: "Other", value: "other" },
];

class TopologyForm extends React.Component {
  state = {
    name: "",
    environment: "",
    description: "",
    tags: "",
    nameError: false,
    environmentError: false,
    descriptionError: false,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSubmit = () => {
    const { name, environment, description } = this.state;
    if (
      name.length === 0 ||
      environment.length === 0 ||
      description.length === 0
    ) {
      if (this.state.name.length === 0) {
        this.setState({ nameError: true });
      }
      if (this.state.environment.length === 0) {
        this.setState({ environmentError: true });
      }
      if (this.state.description.length === 0) {
        this.setState({ descriptionError: true });
      }
    } else {
      this.props.setOpen(false);
      this.props.setShowTopoNotification(true);
      postTopology({
        description: this.state.description, 
        descriptionError: this.state.descriptionError, 
        name: this.state.name, 
        nameError: this.state.nameError, 
        tags: this.state.tags, 
        category: this.state.category, 
        categoryerror:  this.state.categoryerror, 
        lifecyclestatus: this.state.lifecyclestatus, 
        lifecyclestatusError: this.state.lifecyclestatusError
      });
    }
  };
  render() {
    const {
      name,
      environment,
      description,
      tags,
      nameError,
      descriptionError,
      environmentError,
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Name"
            name="name"
            placeholder="Name"
            className="required"
            value={name}
            error={nameError && "Name required"}
            onChange={this.handleChange}
            data-testid="name-input"
          />

          <Form.Select
            fluid
            name="environment"
            label="Environment"
            className="required"
            value={environment}
            options={options}
            placeholder="Select Environmant"
            error={environmentError && "Environment required"}
            onChange={this.handleChange}
            data-testid="environment-input"
          />
        </Form.Group>
        <Form.Group widths={"equal"} className="p-t-30">
          <Form.TextArea
            label="Description"
            name="description"
            className="required"
            value={description}
            placeholder="Description"
            error={descriptionError && "Description Required"}
            onChange={this.handleChange}
            data-testid="discription-input"
          />
          <Form.TextArea
            label="Tags (optional)"
            name="tags"
            value={tags}
            placeholder="Tags"
            onChange={this.handleChange}
            data-testid="tags-input"
          />
        </Form.Group>
        <Form.Group className="p-t-20">
          <Form.Button
            color="grey"
            type="button"
            onClick={() => this.props.setOpen(false)}
            data-testid="cancel-button"
            className="cancelButton"
          >
            Cancel
          </Form.Button>
          <Form.Button
            content="Save"
            type="submit"
            color="blue"
            data-testid="submit-button"
            className="saveButton"
          />
        </Form.Group>
        {/* <Form.Button>Cancel</Form.Button>
        <Form.Button>Submit</Form.Button> */}
      </Form>
    );
  }
}

TopologyForm.propTypes = {
  setOpen: PropTypes.func,
  setShowTopoNotification: PropTypes.func,
};

const CreateTopologyModal = ({ setShowTopoNotification }) => {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setShowTopoNotification(false);
  }, []);
  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className="modalClasses"
        trigger={
          <Menu.Item
            name="signup"
            data-testid="create-topology-trigger"
            onClick={() => {
              setShowTopoNotification(false);
            }}
            active={false}
          >
            <img alt="" src={AddButton} className="tabIconClasses" />
          </Menu.Item>
        }
      >
        <Modal.Header data-testid="header" className="modal-bg">Create New</Modal.Header>
        <Modal.Content className="modal-bg">
          <TopologyForm
            setOpen={setOpen}
            setShowTopoNotification={setShowTopoNotification}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};

CreateTopologyModal.propTypes = {
  setShowTopoNotification: PropTypes.func,
};

export default CreateTopologyModal;
import React, { useEffect } from "react";
// import { connect } from 'react-redux';
import { Menu, Form, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";
import AddButton from ".././Assets/AddButton.svg";

import { addBlueprintNode } from "../Actions/Actions";
// import { ADD_BLUEPRINT_NODE } from "../Actions/Types";
// import { store } from '../index'
import { postBluePrintDropNode } from '../Actions/Build';
class BluePrintForm extends React.Component {
  state = {
    name: "",
    lifecyclestatus: "",
    category: "",
    description: "",
    tags: "",
    nameError: false,
    lifecyclestatusError: false,
    descriptionError: false,
    categoryerror: false,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSubmit = () => {
    const { name, lifecyclestatus, description, nameError } = this.state;
    if (
      name.length === 0 ||
      lifecyclestatus.length === 0 ||
      description.length === 0
    ) {
      if (this.state.name.length === 0) {
        this.setState({ nameError: !nameError });
      }
      if (this.state.category.length === 0) {
        this.setState({ categoryerror: true });
      }
      if (this.state.lifecyclestatus.length === 0) {
        this.setState({ lifecyclestatusError: true });
      }
      if (this.state.description.length === 0) {
        this.setState({ descriptionError: true });
      }
    } else {
      this.props.setOpen(false);
      this.props.setShowBluePrintNotification(true);
      postBluePrintDropNode({
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
      addBlueprintNode({
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
      
      // store.dispatch(addBlueprintNode({
      //   description: this.state.description, 
      //   descriptionError: this.state.descriptionError, 
      //   name: this.state.name, 
      //   nameError: this.state.nameError, 
      //   tags: this.state.tags, 
      //   category: this.state.category, 
      //   categoryerror:  this.state.categoryerror, 
      //   lifecyclestatus: this.state.lifecyclestatus, 
      //   lifecyclestatusError: this.state.lifecyclestatusError
      // }))
    }
  };

  componentDidMount(){
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const {
      name,
      description,
      tags,
      nameError,
      descriptionError
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          fluid
          label="Name"
          name="name"
          className="required"
          placeholder="Name"
          value={name}
          error={nameError && "Name required"}
          onChange={this.handleChange}
          data-testid="name-input"
        />
        <Form.Group widths={"equal"} className="p-t-30">
          <Form.TextArea
            label="Description"
            name="description"
            className="required"
            value={description}
            placeholder="Description"
            error={descriptionError && "Description required"}
            onChange={this.handleChange}
            data-testid="discription-input"
          />
          <Form.TextArea
            label="Tags (optional)"
            name="tags"
            value={!tags ? true : false}
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
            content="Submit"
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

BluePrintForm.propTypes = {
  setOpen: PropTypes.func,
  setShowBluePrintNotification: PropTypes.func,
  dispatch: PropTypes.func
};

// const mapStateToProps = state => {
//   return {
//       blueprints: state,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   addBlueprintNode: node => {
//     dispatch({ type: ADD_BLUEPRINT_NODE});
//   }
// }

// connect(mapStateToProps, mapDispatchToProps)(BluePrintForm);

const CreateBluePrintModal = ({ setShowBluePrintNotification }) => {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setShowBluePrintNotification(false);
  }, []);
  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Menu.Item
            name="signup"
            data-testid="create-blueprint-trigger"
            onClick={() => {
              setShowBluePrintNotification(false);
            }}
            active={false}
          >
            <img alt="" src={AddButton} className="tabIconClasses" />
          </Menu.Item>
        }
      >
        <Modal.Header data-testid="header">Create New</Modal.Header>
        <Modal.Content>
          <BluePrintForm
            setOpen={setOpen}
            setShowBluePrintNotification={setShowBluePrintNotification}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};
CreateBluePrintModal.propTypes = {
  setShowBluePrintNotification: PropTypes.func,
};

export default CreateBluePrintModal;
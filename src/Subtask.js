import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SaveIcon from "@material-ui/icons/Save";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class Subtask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editSubtask: false,
      editedSubtaskText: props.subtask.subText
    };
  }

  editSubtask = () => {
    this.setState({
      editSubtask: true
    });
  };

  saveSubtask = () => {
    const { taskId, subtask, onEditSubtask } = this.props;
    this.setState({
      editSubtask: false
    });
    onEditSubtask(taskId, subtask.id, this.state.editedSubtaskText);
  };

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.saveSubtask();
    }
  };

  handleChange = e => {
    this.setState({
      editedSubtaskText: e.target.value
    });
  };

  subtaskHandleDone = e => {
    const { taskId, subtask, isSubtaskChecked } = this.props;
    isSubtaskChecked(taskId, subtask.id, e.target.checked);
  };

  render() {
    const { taskId, subtask, onDeleteSubtask, classes } = this.props;
    return this.state.editSubtask ? (
      <div>
        <div className="addTaskForm">
          <TextField
            className={classes.textFieldStyles}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            value={this.state.editedSubtaskText}
            autoComplete="off"
            id="standard-with-placeholder"
            label="Edit subtask"
            margin="normal"
          />
        </div>
        <span className="buttonX">
          <Button
            mini
            variant="contained"
            size="small"
            onClick={this.saveSubtask}
          >
            <SaveIcon />
            Save
          </Button>
        </span>
      </div>
    ) : (
      <div className="subtaskItem">
        <FormControlLabel
          control={
            <Switch
              className={classes.switchStyles}
              checked={subtask.done}
              onChange={this.subtaskHandleDone}
              value="checkedB"
              color="primary"
            />
          }
          label={<p key={subtask.subText}>{subtask.subText}</p>}
        />
        <img
          onClick={this.editSubtask}
          className="subtaskIcon"
          alt="edit"
          src={require("./icons/edit.svg")}
        />
        <img
          onClick={() => onDeleteSubtask(taskId, subtask.id)}
          className="subtaskIcon"
          alt="delete"
          src={require("./icons/delete.svg")}
        />
      </div>
    );
  }
}

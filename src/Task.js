import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Subtask from "./Subtask";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editedText: props.task.text
    };
  }

  editTask = () => {
    this.setState({
      edit: true
    });
  };

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.saveTask();
    }
  };

  handleChange = e => {
    this.setState({
      editedText: e.target.value
    });
  };

  saveTask = () => {
    this.setState({
      edit: false
    });
    this.props.onEdit(this.props.task.id, this.state.editedText);
  };

  mainHandleDone = e => {
    this.props.isMainChecked(this.props.task.id, e.target.checked);
  };

  render() {
    const {
      classes,
      task,
      onDelete,
      onDeleteSubtask,
      isSubtaskChecked,
      onEditSubtask
    } = this.props;
    return (
      <div className="task" style={{ opacity: task.done ? "0.3" : "1" }}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContentStyles}>
            <Typography component="div">
              {/* Edit task */}
              {this.state.edit ? (
                <div className="addTaskForm">
                  <TextField
                    className={classes.textFieldStyles}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                    value={this.state.editedText}
                    autoComplete="off"
                    id="standard-with-placeholder"
                    label="Edit task"
                    margin="normal"
                  />
                </div>
              ) : (
                // or view Task name
                <div>
                  <p className="taskText">{task.text}</p>
                  <div className="subTasks">
                    {task.subTask &&
                      task.subTask.map(item => {
                        return (
                          <Subtask
                            key={item.id}
                            subtask={item}
                            taskId={task.id}
                            classes={classes}
                            isSubtaskChecked={isSubtaskChecked}
                            onEditSubtask={onEditSubtask}
                            onDeleteSubtask={onDeleteSubtask}
                          />
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Common task view */}
              {this.state.edit ? (
                <span className="buttonX">
                  <Button
                    mini
                    variant="contained"
                    size="small"
                    onClick={this.saveTask}
                  >
                    <SaveIcon />
                    Save
                  </Button>
                </span>
              ) : (
                <span>
                  <span className="buttonX">
                    <Button
                      mini
                      title="Delete task"
                      variant="fab"
                      aria-label="Delete"
                      onClick={() => onDelete(task.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </span>

                  <span className="buttonX">
                    <Button
                      mini
                      title="Add subtask"
                      variant="fab"
                      aria-label="Add"
                      onClick={this.addSubtask}
                    >
                      <Icon>playlist_add</Icon>
                    </Button>
                  </span>
                  <span className="buttonX">
                    <Button
                      mini
                      title="Edit task"
                      variant="fab"
                      aria-label="Edit"
                      onClick={this.editTask}
                    >
                      <Icon>edit_icon</Icon>
                    </Button>
                  </span>
                </span>
              )}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActionsStyles}>
            <FormControlLabel
              control={
                <Switch
                  className={classes.switchStyles}
                  checked={task.done}
                  onChange={this.mainHandleDone}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Done"
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default Task;

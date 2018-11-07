import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import "./css/App.css";
import Task from "./Task";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import ReceiptIcon from "@material-ui/icons/Receipt";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import SearchBar from "material-ui-search-bar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskText: "",
      taskArray: [
        {
          id: 1,
          text: "Understand Higher Order Components",
          subTask: [
            {
              id: 1,
              subText: "First step to this",
              done: false
            },
            {
              id: 2,
              subText: "Second step to this",
              done: false
            }
          ],
          done: false
        },
        {
          id: 2,
          text: "Understand Lifecycle Methods",
          subTask: [
            {
              id: 1,
              subText: "First step to this",
              done: false
            },
            {
              id: 2,
              subText: "Second attempt",
              done: false
            }
          ],
          done: false
        }
      ],
      filter: "all",
      filterededArray: [],
      searchText: ""
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     taskArray: JSON.parse(localStorage.getItem("taskArray"))
  //   });
  // }

  addTask = () => {
    let newTask = {
      id: this.state.taskArray.length + 1,
      text: this.state.newTaskText,
      done: false
    };
    this.setState({
      taskArray: [newTask, ...this.state.taskArray],
      newTaskText: ""
    });
    // localStorage.setItem(
    //   "taskArray",
    //   JSON.stringify([newTask, ...this.state.taskArray])
    // );
  };

  handleChange = e => {
    this.setState({
      newTaskText: e.target.value
    });
  };

  deleteTask = id => {
    this.setState({
      taskArray: this.state.taskArray.filter(task => {
        return task.id !== id;
      })
    });
    // localStorage.setItem(
    //   "taskArray",
    //   JSON.stringify(
    //     this.state.taskArray.filter(task => {
    //       return task.id !== id;
    //     })
    //   )
    // );
  };

  onDeleteSubtask = (taskId, subtaskId) => {
    this.setState({
      taskArray: this.state.taskArray.map(task => {
        return taskId === task.id
          ? task.subTask.filter(subtaskItem => {
              return subtaskId !== subtaskItem.id;
            })
          : task;
      })
    });
  };

  editTask = (id, text) => {
    this.setState({
      taskArray: this.state.taskArray.map(task => {
        return task.id === id ? { ...task, text } : task;
      })
    });
    // localStorage.setItem(
    //   "taskArray",
    //   JSON.stringify(
    //     this.state.taskArray.map(task => {
    //       return task.id === id ? { ...task, text } : task;
    //     })
    //   )
    // );
  };

  editSubtask = (taskId, subtaskId, subText) => {
    this.setState({
      taskArray: this.state.taskArray.map(task => {
        return task.id === taskId
          ? {
              ...task,
              subTask: task.subTask.map(item => {
                return item.id === subtaskId ? { ...item, subText } : item;
              })
            }
          : task;
      })
    });

    // this.setState({
    //   taskArray: this.state.taskArray.map(task => {
    //     return task.id === id ? { ...task, subText } : task;
    //   })
    // });
    // localStorage.setItem(
    //   "taskArray",
    //   JSON.stringify(
    //     this.state.taskArray.map(task => {
    //       return task.id === id ? { ...task, text } : task;
    //     })
    //   )
    // );
  };

  updateMainCheckbox = (id, done) => {
    this.setState({
      taskArray: this.state.taskArray.map(task => {
        return task.id === id ? { ...task, done } : task;
      })
    });
    // localStorage.setItem(
    //   "taskArray",
    //   JSON.stringify(
    //     this.state.taskArray.map(task => {
    //       return task.id === id ? { ...task, done } : task;
    //     })
    //   )
    // );
  };

  updateSubtaskCheckbox = (taskId, subtaskId, done) => {
    this.setState({
      taskArray: this.state.taskArray.map(task => {
        return task.id === taskId
          ? {
              ...task,
              subTask: task.subTask.map(item => {
                return item.id === subtaskId ? { ...item, done } : item;
              })
            }
          : task;
      })
    });
    // localStorage.setItem(
    //   "taskArray",
    //   JSON.stringify(
    //     this.state.taskArray.map(task => {
    //       return task.id === taskId
    //         ? task.subTask.map(item => {
    //             return item.id === subtaskId ? { ...item, done } : item;
    //           })
    //         : task;
    //     })
    //   )
    // );
  };

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.addTask();
    }
  };

  handleChangeTab = (e, filter) => {
    this.setState({ filter });
  };

  onSearch = e => {
    this.setState({
      searchText: e.toLowerCase()
    });
  };

  render() {
    const { classes } = this.props;
    const { filter } = this.state;
    return (
      <div>
        <div>
          {/* //appBar */}
          <div className={classes.appBarStyles}>
            <AppBar position="static" color="default">
              <Tabs
                style={{ width: "100%" }}
                value={filter}
                onChange={this.handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab value="all" label="All tasks" icon={<ReceiptIcon />} />
                <Tab
                  value="relevant"
                  label="Relevant"
                  icon={<HourglassEmptyIcon />}
                />
                <Tab value="done" label="Done" icon={<DoneAllIcon />} />
              </Tabs>
            </AppBar>
          </div>
          {/* //search */}
          <div className="searchBar">
            <SearchBar
              className={classes.searchBarStyles}
              onChange={this.onSearch}
              onRequestSearch={() => console.log("onRequestSearch")}
            />
          </div>
        </div>
        <div className="container">
          {/* //addTask */}
          <div className="addInput">
            <div className="addTask">
              <TextField
                className={classes.textFieldStyles}
                autoComplete="off"
                id="standard-with-placeholder"
                label="Add new task"
                margin="normal"
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp}
                value={this.state.newTaskText}
              />
              <div className="buttonX buttonXAdd">
                <Button
                  mini
                  variant="fab"
                  color="primary"
                  aria-label="Add"
                  onClick={this.addTask}
                >
                  <AddIcon />
                </Button>
              </div>
            </div>
          </div>
          {/* //Tasks */}
          {this.state.taskArray
            .filter(
              task =>
                filter === "all"
                  ? task
                  : filter === "relevant"
                    ? task.done === false
                    : task.done === true
            )
            // .filter(
            //   task =>
            //     task.text.toLowerCase().search(this.state.searchText) !== -1
            // )
            .map(item => {
              return (
                <Task
                  key={item.id}
                  task={item}
                  onDelete={this.deleteTask}
                  onDeleteSubtask={this.onDeleteSubtask}
                  onEdit={this.editTask}
                  onEditSubtask={this.editSubtask}
                  isMainChecked={this.updateMainCheckbox}
                  isSubtaskChecked={this.updateSubtaskCheckbox}
                  classes={classes}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  appBarStyles: {
    flexGrow: 1,
    width: "480px",
    backgroundColor: theme.palette.background.paper,
    margin: "auto"
  },
  textFieldStyles: {
    width: "60%",
    margin: "-10px"
  },
  card: {
    width: "550px",
    margin: "auto",
    marginBottom: "20px"
  },
  cardActionsStyles: {
    margin: 0,
    padding: 0
  },
  typographyStyles: {
    textAlign: "center",
    padding: "10px"
  },
  searchBarStyles: {
    width: "510px",
    zoom: 0.85,
    margin: "0 auto",
    maxWidth: 800
  },
  switchStyles: {
    zoom: 0.9
  },
  cardContentStyles: {
    padding: "12px 0 0 0"
  }
});

export default withStyles(styles)(App);

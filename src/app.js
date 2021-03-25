import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import "normalize.css/normalize.css";

const Header = (props) => <h1>TO-DO</h1>;

const Subtitle = (props) => <h1>What needs to be done!</h1>;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      num_remaining: 0,
      tasks: [],
      showAll: true,
      showActive: false,
      showCompleted: false,
    };
  }

  taskDone = (e) => {
    const option = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      var tasks = [...this.state.tasks];
      var index = tasks.findIndex((task) => task.task === option);
      tasks[index].completed = true;
      // data.num_remaining = data.num_remaining + 1;
      this.setState({ tasks, num_remaining: this.state.num_remaining - 1 });
    } else {
      var tasks = [...this.state.tasks];
      var index = tasks.findIndex((task) => task.task === option);
      tasks[index].completed = false;
      // data.num_remaining = data.num_remaining - 1;
      this.setState({ tasks, num_remaining: this.state.num_remaining + 1 });
    }
  };

  handleAddOption = (e) => {
    e.preventDefault();
    const option = e.target.elements.task.value.trim();

    if (!option) {
      return "Enter valid value  to add item";
    }

    // var flag = this.state.tasks.some((task) => task.task === option);
    var flag = this.state.tasks.some((task) => task.task === option);
    if (flag) {
      return "This option already exists";
    }

    this.setState((prevState) => {
      return {
        tasks: prevState.tasks.concat({ task: option, completed: false }),
        num_remaining: prevState.num_remaining + 1,
      };
    });
  };

  setShowAllFlag = () => {
    this.setState((prevState) => {
      return {
        showAll: true,
        showActive: false,
        showCompleted: false,
      };
    });
  };

  setShowActiveFlag = () => {
    this.setState((prevState) => {
      return {
        showAll: false,
        showActive: true,
        showCompleted: false,
      };
    });
  };

  setShowCompletedFlag = () => {
    this.setState((prevState) => {
      return {
        showAll: false,
        showActive: false,
        showCompleted: true,
      };
    });
  };

  deleteOption = (e) => {
    const option = e.target.value;

      var tasks = [...this.state.tasks];
      var index = tasks.findIndex((task) => task.task === option);
      const sub =  tasks[index].completed ? 0: 1;
      tasks.splice(index,1);
      this.setState({ tasks, num_remaining: this.state.num_remaining - sub });
    
  }

  render() {
    return (
      <div>
        <Header />
        <Subtitle />

        <form onSubmit={this.handleAddOption}>
          <input type="text" placeholder="Add a task" name="task"></input>

          <button>Add</button>

          <div>
            <button onClick={this.setShowAllFlag}>Show all Tasks</button>
            <button onClick={this.setShowActiveFlag}>Show active Tasks</button>
            <button onClick={this.setShowCompletedFlag}>
              Show completed Tasks
            </button>
          </div>
        </form>
        <h1>{this.state.num_remaining} tasks remaining</h1>

        {this.state.tasks &&
          this.state.showAll &&
          this.state.tasks.map((task) => (
            <div>
              <input
                type="checkbox"
                name="taskState"
                checked={task.completed}
                value={task.task}
                onChange={this.taskDone}
              ></input>
              <h1>{task.task}<button value={task.task} onClick={this.deleteOption}>Delete</button></h1>
            </div>
          ))}

        {this.state.tasks &&
          this.state.showActive &&
          this.state.tasks.map(
            (task) =>
              !task.completed && (
                <div>
                  <input
                    type="checkbox"
                    name="taskState"
                    checked={task.completed}
                    value={task.task}
                    onChange={this.taskDone}
                  ></input>
                  <h1>{task.task}<button value={task.task} onClick={this.deleteOption}>Delete</button></h1>
                </div>
              )
          )}

        {this.state.tasks &&
          this.state.showCompleted &&
          this.state.tasks.map(
            (task) =>
              task.completed && (
                <div>
                  <input
                    type="checkbox"
                    name="taskState"
                    checked={task.completed}
                    value={task.task}
                    onChange={this.taskDone}
                  ></input>
                  <h1>{task.task}<button value={task.task} onClick={this.deleteOption}>Delete</button></h1>
                </div>
              )
          )}
      </div>
    );
  }
}

ReactDOM.render(<div className="center"><App /></div>, document.getElementById("app"));

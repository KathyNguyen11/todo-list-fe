import React, { Component } from "react";
import "../App.css";
import Todos from "../components/Todos";
import ViewToggle from "../components/ViewToggle";
import authHeader from "../services/auth-header";

export default class TodoList extends Component {
  state = {
    todos: [],
    showDone: false
  };

  handleDone = todo => {
    const todos = [...this.state.todos];
    const index = todos.indexOf(todo);
    const putData = {
      method: "PUT",
      body: JSON.stringify({ done: !todo.done }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader()
      }
    };
    fetch("http://localhost:5000/todolists/" + todo.id, putData)
      .then(response => response.json())
      .then(({ todo }) => {
        todos[index] = { id: todo.id, name: todo.name };
        this.setState({ todos });
      })
      .catch(error => console.log(error));
  };

  handleAddTodo = task => {
    const todos = [...this.state.todos];
    const postData = {
      method: "POST",
      body: JSON.stringify({ name: task }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader()
      }
    };
    fetch("http://localhost:5000/todolists/", postData)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        todos.push({ id: data.id, name: data.name });
        this.setState({ todos, showDone: false });
      })
      .catch(error => console.log(error));
  };

  handleRemoveTodo = todo => {
    const deleteData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader()
      }
    };
    fetch("http://localhost:5000/todolists/" + todo.id, deleteData)
      .then(response => response)
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          const todos = this.state.todos.filter(td => td !== todo);
          this.setState({ todos });
        }
      })
      .catch(error => console.log(error));
  };

  handleViewToggle = bool => this.setState({ showDone: bool });

  todosSelector = () => {
    return this.state.todos;
  };

  componentDidMount() {
    fetch("http://localhost:5000/todolists/", {headers: {
        "Authorization": authHeader()
      }})
      .then(response => response.json())
      .then(data => this.setState({ todos: data }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="card text-center">
              <div className="card-header">
                <ul className="nav card-header-pills justify-content-center">
                  <li className="nav-item">
                    <ViewToggle
                      handleViewToggle={this.handleViewToggle}
                      showDone={this.state.showDone}
                    />
                  </li>
                </ul>
              </div>
              <Todos
                todos={this.todosSelector()}
                handleDone={this.handleDone}
                handleRemoveTodo={this.handleRemoveTodo}
                handleAddTodo={this.handleAddTodo}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

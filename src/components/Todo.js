import React from "react";
import Button from "./Button";

const Todo = ({ todo, handleDone, handleRemoveTodo }) => {
  return (
    <li className="list-group-item d-flex align-items-baseline list-unstyled">
      <input
        type="checkbox"
        id={"done" + todo.id}
        className="mr-4"
        onChange={() => handleDone(todo)}
        defaultChecked={todo.is_completed}
      />
      <label for={"done" + todo.id}>
        {todo.is_completed ? <s>{todo.name}</s> : todo.name}
      </label>
      <Button
        className="btn btn-danger ml-auto"
        onClick={() => handleRemoveTodo(todo)}
      >
        Delete
      </Button>
    </li>
  );
};

export default Todo;

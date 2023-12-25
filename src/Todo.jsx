import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import TodoForm from "./TodoForm";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({ id: null, value: "" });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todoRow complete" : "todoRow"}
      key={index}
    >
      <div
        key={todo.id}
        onClick={() => completeTodo(todo.id)}
        style={{ background: "transparent" }}
      >
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          className="deleteIcon"
          onClick={() => removeTodo(todo.id)}
          tabIndex="1"
        />
        <TiEdit
          className="editIcon"
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          tabIndex="2"
        />
      </div>
    </div>
  ));
};

export default Todo;

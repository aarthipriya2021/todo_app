import React, { useRef, useState, useEffect } from "react";

const TodoForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 1000),
      text: input,
    });

    // clear up the input after submitting
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todoForm">
      {props.edit ? (
        <>
          <input
            value={input}
            name="updateTodo"
            type="text"
            placeholder="Update your Tasks"
            className="updateTodoInput"
            ref={inputRef}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="updateTodoBtn">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            value={input}
            name="addTodo"
            type="text"
            placeholder="Add your Tasks"
            className="addTodoInput"
            autoComplete="off"
            ref={inputRef}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="addTodoBtn" disabled={!input} type="submit">
            Add Todo
          </button>
        </>
      )}
    </form>
  );
};

export default TodoForm;

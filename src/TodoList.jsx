import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import todoImg from "./todo.png";
import noTaskImg from "./no-task.png";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const todosQuantity = todos.length;

  const addTodo = (todo) => {
    const newTodos = [todo, ...todos];

    setTodos(newTodos);

    // console.log("add todo");
    // console.log(...todos);
  };

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const storedTasks = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const updateTodo = (todoId, newValue) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
    // console.log("updateTodo");
  };

  const completeTodo = (id) => {
    let updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);

    // console.log("completeTodo");
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removedArr);
    // console.log("removeTodo");
  };

  return (
    <div>
      <img src={todoImg} alt="todo_img" style={{ width: "130px" }} />
      <div style={{ margin: "50px" }}>
        <TodoForm onSubmit={addTodo} />
        {todosQuantity === 0 ? (
          <div>
            <img src={noTaskImg} alt="no-todo" width={150} />
            <p className="noTodoTxt">No Todos Found</p>
          </div>
        ) : (
          <Todo
            todos={todos}
            updateTodo={updateTodo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        )}
      </div>
    </div>
  );
};

export default TodoList;

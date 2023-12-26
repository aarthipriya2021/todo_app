import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import todoImg from "./todo.png";
import noTaskImg from "./no-task.png";

const TodoList = () => {
  
  const [todos, setTodos] = useState([]);
  // number of todos
  const todosQuantity = todos.length;

  // event handler for adding new todos
  const addTodo = (todo, event) => {

    

    // regex for checking the character in input field
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    // snewTodos having spread operator taking all the previous todos along with new todo
    const newTodos = [todo, ...todos];
    setTodos(newTodos);


  };

  //  updating the existing todo
  const updateTodo = (todoId, newValue) => {

    // regex for checking the character in input field
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    // prev taking the prev state of todo using id and then it updates the new value of todo
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );

  };

  //  if any task was completed we can strike
  const completeTodo = (id) => {
    let updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);

  };

  // remove one item from todo list
  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removedArr);
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

  return (
    <div>
      <img src={todoImg} alt="todo_img" style={{ width: "130px" }} />
      <div style={{ margin: "50px" }}>
        <TodoForm onSubmit={addTodo} />

        {/* if there's no todo it shows one no task image */}
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

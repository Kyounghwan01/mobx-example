import React from "react";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/AddTodo";

const App = () => {
  return (
    <div className="container">
      <h1>Todos</h1>
      <TodoAdd />
      <TodoList />
    </div>
  );
};

export default App;

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const todoApi = axios.create({
  baseURL: "http://localhost:3001/todos",
});

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const addTodo = () => {};

  const toggleTodoStatus = () => {};

  const deleteTodo = () => {};

  return (
    <div className="container mx-auto max-w-xl p-4">
      <h1 className="text-5xl text-center pb-4 font-semibold">Todo APP</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg block w-full px-3 py-2"
          placeholder="Todo"
          onChange={() => {}}
        />
        <button
          className="text-white bg-gray-900 hover:bg-gray-600 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center uppercase"
          onClick={() => {}}
        >
          add
        </button>
      </div>
      <div className="space-y-2 pt-2">{/* render todos here */}</div>
    </div>
  );
}

export default App;

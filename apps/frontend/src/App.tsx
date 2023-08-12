import { useState, useEffect, useCallback, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
import { TodoInterface } from './todo.model';
import { Parser } from '@json2csv/plainjs';
import Todo from "./Todo";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const todoApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    'api-key': 'my-secret-api-key',
    'Access-Control-Allow-Origin': '*' 
  }
});

function App() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [todo, setTodo] = useState<string>('');
  const [todoSearch, setTodoSearch] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [validationError, setValidationError] = useState<string>('');

  const loadTodosData = async () => {
    try {
      const resp: AxiosResponse<TodoInterface[]> = await todoApi.get('/');
      setTodos(resp.data);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  useEffect(() => {
    loadTodosData();
  }, [todos]);

  const addTodo = async () => {
    if (todo.trim()==='') {
      setValidationError('Todo field must not be empty.');
      return;
    }
    const newTodo: TodoInterface = {
      id: todos.length + 1,
      todo: todo,
      completed: false,
    };

    try {
      const resp: AxiosResponse<TodoInterface> = await todoApi.post('/', newTodo);
      setTodos([...todos, resp.data]);
      setTodo('');
      setValidationError('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodoStatus = useCallback(async (id: number) => {
    const updTodos = todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed }: todo);
    try {
      await todoApi.put(`/${id}`, {...updTodos.find((todo) => todo.id === id)});
      setTodos(updTodos);
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  }, [todos]);

  const deleteTodo = useCallback(async (id: number) => {
    const updTodos = todos.filter((todo) => todo.id !== id);
    try {
      await todoApi.delete('/', { data: todos.filter((todo) => todo.id == id) });
      setTodos(updTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }, [todos]);

  const exportCSVFile = () => {
    const fields = ['id', 'todo', 'completed'];
    const opts = { fields };
    try {
      const parser = new Parser(opts);
      const csvData = parser.parse(todos);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'todos.csv');
      link.click();
    } catch (error) {
        console.error('Error generating CSV:', error);
    }
  };

  const filteredTodos = todos.filter(todo =>
    todo.todo.toLowerCase().includes(todoSearch.toLowerCase()) && 
    (filterStatus === 'all' || (filterStatus === 'completed' && todo.completed) || (filterStatus === 'pending' && !todo.completed))
  );

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="container mx-auto max-w-xl p-4">
      <h1 className="text-5xl text-center pb-4 font-semibold">Todo APP</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg block w-full px-3 py-2"
          placeholder="Todo"
          value={todo}
          onChange={(event) => {setTodo(event.target.value); setValidationError('')}}
        />
        <button
          className="text-white bg-gray-900 hover:bg-gray-600 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center uppercase"
          onClick={addTodo}
        >
          add
        </button>
      </div>
      
      <p className="text-red-600 mt-2 block sm:inline" hidden={!validationError}>{validationError}</p>
      <div className="flex space-x-2 mt-2">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg block w-full px-3 py-2"
          placeholder="Search"
          value={todoSearch}
          onChange={(event) => {setTodoSearch(event.target.value);}}
        />
      </div>
      <Menu as="div" className="relative inline-block text-left mt-2 font-medium">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Apply Filter <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left'
                  )}
                  value="Completed"
                  onClick={() => setFilterStatus('completed')}
                >
                  Completed
                </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left'
                  )}
                  value="Pending"
                  onClick={() => setFilterStatus('pending')}
                >
                  Pending
                </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left'
                  )}
                  value="All"
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <div className="space-y-2 pt-2">
        {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          toggleTodoStatus={toggleTodoStatus}
          deleteTodo={deleteTodo}
        />
      ))}</div>
      
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white mt-2 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={exportCSVFile}
        >
          Export CSV file
        </button>
    </div>
  );
}

export default App;

import { TodoProps } from './todo.model';

function Todo({ todo, toggleTodoStatus, deleteTodo }: TodoProps) {
  const { id, completed, todo: todoText } = todo;

  return (
    <div className="bg-gray-200 p-4 flex flex-col space-y-2  rounded-lg">
      <div className="flex space-x-1">
        <span onClick={() => toggleTodoStatus(id)}className="cursor-pointer">
          {completed ? "✅" : "❌"}
        </span>
        <p className="text-lg flex-grow">{todoText}</p>
      </div>
      <div className="flex justify-end space-x-1">
        <button
          className="text-white bg-gray-900 hover:bg-gray-600 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center uppercase"
          onClick={() => deleteTodo(id)}
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default Todo;

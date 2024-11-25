import React from "react";
import { useTodoContext } from "../context/todoContext";

const TodoList = () => {
  const { state, dispatch } = useTodoContext();

  const handleDelete = (id) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  const handleEdit = (todo) => {
    dispatch({
      type: "SET_EDIT_TODO",
      payload: todo,
    });
  };

  const handleToggle = (todo) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: {
        ...todo,
        completed: !todo.completed,
      },
    });
  };

  return (
    <ul className="space-y-2">
      {state.todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between bg-white p-3 rounded shadow"
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
              className="w-4 h-4"
            />
            <span
              className={`${
                todo.completed ? "line-through text-gray-500" : "text-black"
              }`}
            >
              {todo.text}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(todo)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

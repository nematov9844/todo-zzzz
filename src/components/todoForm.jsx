import React, { useState, useEffect } from "react";
import { useTodoContext } from "../context/todoContext";

const TodoForm = () => {
  const { state, dispatch } = useTodoContext();
  const [text, setText] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    if (editTodo) {
      setText(editTodo.text);
    }
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim()) return;

    if (editTodo) {
      dispatch({
        type: "UPDATE_TODO",
        payload: { 
          id: editTodo.id, 
          text: text.trim(),
          completed: editTodo.completed 
        },
      });
      setEditTodo(null);
    } else {
      dispatch({
        type: "ADD_TODO",
        payload: { 
          id: Date.now(), 
          text: text.trim(),
          completed: false 
        },
      });
    }
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Add or update todo..."
        className="border rounded-md p-2 w-full mb-2 placeholder:text-blue-500 font-bold text-black outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className={`${
          editTodo ? "bg-green-500" : "bg-blue-500"
        } text-white px-4 py-2 rounded`}
        disabled={!text.trim()}
      >
        {editTodo ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;

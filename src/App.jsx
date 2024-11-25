import React from "react";
import { TodoProvider } from "./context/todoContext";
import Search from './components/search'
import TodoForm from './components/todoForm.jsx'
import TodoList from './components/todoList.jsx'

const App = () => {
  return (
    <>
    <TodoProvider> 
      <div className="bg-gray-400 flex justify-center items-center w-full h-screen">
      <div className="p-6 max-w-lg  mx-auto bg-blue-500 rounded-md shadow-md shadow-gray-800 text-white">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <Search />
        <TodoForm/>
        <TodoList />
      </div>
      </div>
    </TodoProvider>
    </>
  );
};

export default App;

import React, { useState, useEffect } from 'react'
import TodoForm from '../components/todoForm';
import TodoSearch from '../components/TodoSearch'
import TodoItem from '../components/TodoItem'

export default function ContextTodo() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || []
    setTodos(savedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (input.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Todo List</h1>
        
        <TodoSearch search={search} setSearch={setSearch} />
        <TodoForm input={input} setInput={setInput} addTodo={addTodo} />

        <div className="space-y-3">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
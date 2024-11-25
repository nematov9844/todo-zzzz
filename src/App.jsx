import React, { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoSearch from './components/TodoSearch'
import TodoItem from './components/TodoItem'

export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || []
    const savedTheme = JSON.parse(localStorage.getItem('darkMode')) || false
    setTodos(savedTodos)
    setDarkMode(savedTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [todos, darkMode])

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

  const editTodo = (id, newText) => {
    if (newText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      ))
    }
  }

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={`min-h-screen py-8 transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`max-w-md mx-auto rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Todo List
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-600'}`}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
        
        <TodoSearch search={search} setSearch={setSearch} darkMode={darkMode} />
        <TodoForm input={input} setInput={setInput} addTodo={addTodo} darkMode={darkMode} />

        <div className="space-y-3">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
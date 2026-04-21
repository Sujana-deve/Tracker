import { useState, useEffect } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'

import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import ProgressBar from './components/ProgressBar'
import ThemeToggle from './components/ThemeToggle'
import FocusMode from './components/FocusMode'

const CATEGORIES = ['Work', 'Study', 'Personal', 'Health', 'Other']

function App() {
  const [tasks, setTasks] = useState([])
  const [theme, setTheme] = useState('light')
  const [filters, setFilters] = useState({
    category: 'all',
    priority: 'all',
    status: 'all',
    dueFilter: 'all'
  })
  const [search, setSearch] = useState('')
  const [focusTaskId, setFocusTaskId] = useState(null)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    const savedTasks = localStorage.getItem('smart-todo-tasks')
    if (savedTasks) setTasks(JSON.parse(savedTasks))

    const savedTheme = localStorage.getItem('smart-todo-theme') || 'light'
    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem('smart-todo-tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('smart-todo-theme', theme)
  }, [theme])

  useEffect(() => {
    if (tasks.length === 0) {
      setTasks([
        {
          id: '1',
          title: 'Finish project proposal',
          description: 'Include budget and timeline',
          category: 'Work',
          priority: 'High',
          deadline: '2026-04-25',
          completed: false
        },
        {
          id: '2',
          title: 'Prepare for React exam',
          description: 'Review hooks and context',
          category: 'Study',
          priority: 'Medium',
          deadline: '2026-04-22',
          completed: true
        }
      ])
    }
  }, [])

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filters.status === 'all' ||
      (filters.status === 'active' && !task.completed) ||
      (filters.status === 'completed' && task.completed)

    const categoryMatch = filters.category === 'all' || task.category === filters.category
    const priorityMatch = filters.priority === 'all' || task.priority === filters.priority
    const searchMatch = !search || task.title.toLowerCase().includes(search.toLowerCase())

    let dueMatch = true
    if (filters.dueFilter === 'today') {
      const today = new Date().toISOString().split('T')[0]
      dueMatch = task.deadline === today
    } else if (filters.dueFilter === 'overdue') {
      dueMatch = task.deadline && new Date(task.deadline) < new Date() && !task.completed
    }

    return statusMatch && categoryMatch && priorityMatch && searchMatch && dueMatch
  })

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = tasks.findIndex(t => t.id === active.id)
    const newIndex = tasks.findIndex(t => t.id === over.id)

    const updated = [...tasks]
    const [moved] = updated.splice(oldIndex, 1)
    updated.splice(newIndex, 0, moved)

    setTasks(updated)
  }

  const addOrUpdateTask = (newTask) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...newTask, id: editingTask.id } : t))
      setEditingTask(null)
    } else {
      setTasks([...tasks, { ...newTask, id: Date.now().toString() }])
    }
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
    if (focusTaskId === id) setFocusTaskId(null)
  }

  const focusTask = tasks.find(t => t.id === focusTaskId)

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="min-h-screen pb-12">

      <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Smart To-Do</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      <div className="max-w-5xl mx-auto px-6">

        <ProgressBar total={totalTasks} completed={completedTasks} progress={progress} />

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          search={search}
          setSearch={setSearch}
          categories={CATEGORIES}
        />

        <TaskForm
          onSubmit={addOrUpdateTask}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          categories={CATEGORIES}
        />

        {/* DRAG & DROP WRAPPER */}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
            onEdit={setEditingTask}
            onFocus={setFocusTaskId}
          />
        </DndContext>

        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No tasks found</p>
        )}
      </div>

      <FocusMode
        task={focusTask}
        onExit={() => setFocusTaskId(null)}
        onToggleComplete={toggleComplete}
        onEdit={setEditingTask}
        onDelete={deleteTask}
      />
    </div>
  )
}

export default App
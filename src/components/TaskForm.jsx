import { useState, useEffect } from 'react'

export default function TaskForm({ onSubmit, editingTask, setEditingTask, categories }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Personal',
    priority: 'Medium',
    deadline: ''
  })

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description || '',
        category: editingTask.category,
        priority: editingTask.priority,
        deadline: editingTask.deadline || ''
      })
    }
  }, [editingTask])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onSubmit(form)
    setForm({ title: '', description: '', category: 'Personal', priority: 'Medium', deadline: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-10 bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="md:col-span-5 px-5 py-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-lg"
          required
        />

        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="md:col-span-2 px-5 py-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl focus:outline-none"
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select
          value={form.priority}
          onChange={e => setForm({ ...form, priority: e.target.value })}
          className="md:col-span-2 px-5 py-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl focus:outline-none"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          value={form.deadline}
          onChange={e => setForm({ ...form, deadline: e.target.value })}
          className="md:col-span-3 px-5 py-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl focus:outline-none"
        />

        <textarea
          placeholder="Description (optional)"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="md:col-span-12 mt-2 px-5 py-4 bg-zinc-100 dark:bg-zinc-800 rounded-3xl focus:outline-none h-24 resize-none"
        />

        <div className="md:col-span-12 flex gap-3">
          <button
            type="submit"
            className="flex-1 md:flex-none px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl transition-all"
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={() => setEditingTask(null)}
              className="px-8 py-4 border border-zinc-300 dark:border-zinc-600 font-medium rounded-2xl"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
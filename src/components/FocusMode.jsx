export default function FocusMode({ task, onExit, onToggleComplete, onEdit, onDelete }) {
  if (!task) return null

  const priorityColor = {
    Low: 'text-emerald-600',
    Medium: 'text-amber-600',
    High: 'text-red-600'
  }

  return (
    <div className="fixed inset-0 bg-black/70 dark:bg-black/80 z-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-3xl p-10 shadow-2xl">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-3">
            <span className={`px-4 py-1 rounded-2xl text-sm font-semibold ${priorityColor[task.priority]} bg-opacity-10`}>
              {task.priority} PRIORITY
            </span>
            <span className="px-4 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-sm">{task.category}</span>
          </div>
          <button
            onClick={onExit}
            className="text-4xl leading-none hover:text-zinc-400 transition-colors"
          >
            ×
          </button>
        </div>

        <h2 className="text-4xl font-semibold leading-tight mb-6">{task.title}</h2>
        {task.description && <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-10">{task.description}</p>}

        {task.deadline && (
          <div className="inline-flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 px-6 py-3 rounded-3xl mb-10">
            <span className="text-2xl">📅</span>
            <div>
              <div className="text-sm text-zinc-500">Deadline</div>
              <div className="font-medium">{new Date(task.deadline).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => {
              onToggleComplete(task.id)
              onExit()
            }}
            className="flex-1 py-6 bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-semibold rounded-3xl transition-all"
          >
            {task.completed ? 'Mark as Active' : '✅ Mark Complete'}
          </button>
          <button
            onClick={() => { onEdit(task); onExit() }}
            className="flex-1 py-6 border border-zinc-300 dark:border-zinc-600 text-xl font-medium rounded-3xl"
          >
            Edit Task
          </button>
          <button
            onClick={() => { onDelete(task.id); onExit() }}
            className="px-8 py-6 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-3xl text-2xl"
          >
            🗑
          </button>
        </div>

        <button
          onClick={onExit}
          className="w-full mt-8 text-zinc-400 hover:text-zinc-500 text-sm font-medium"
        >
          ← Back to all tasks
        </button>
      </div>
    </div>
  )
}
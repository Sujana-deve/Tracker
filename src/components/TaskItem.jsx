export default function TaskItem({ task, onToggleComplete, onDelete, onEdit, onFocus }) {

  const priorityColor = {
    Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    High: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  }

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 shadow-sm border flex gap-4">

      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />

      <div className="flex-1">
        <p className={task.completed ? "line-through text-gray-400" : ""}>
          {task.title}
        </p>

        <div className="flex gap-2 mt-2">
          <span className={priorityColor[task.priority]}>
            {task.priority}
          </span>

          {task.deadline && (
            <span className={isOverdue ? "text-red-500" : ""}>
              📅 {task.deadline}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          <button onClick={() => onFocus(task.id)}>🎯</button>
          <button onClick={() => onEdit(task)}>✏️</button>
          <button onClick={() => onDelete(task.id)}>🗑</button>
        </div>
      </div>
    </div>
  )
}
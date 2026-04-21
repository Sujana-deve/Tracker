import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggleComplete, onDelete, onEdit, onFocus }) {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
          onFocus={onFocus}
        />
      ))}
    </div>
  )
}
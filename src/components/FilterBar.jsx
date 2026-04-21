export default function FilterBar({ filters, setFilters, search, setSearch, categories }) {
  return (
    <div className="mb-8 flex flex-wrap gap-3 items-center">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-3xl focus:outline-none flex-1 max-w-sm"
      />

      <select
        value={filters.category}
        onChange={e => setFilters({ ...filters, category: e.target.value })}
        className="px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-3xl"
      >
        <option value="all">All Categories</option>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <select
        value={filters.priority}
        onChange={e => setFilters({ ...filters, priority: e.target.value })}
        className="px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-3xl"
      >
        <option value="all">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        value={filters.status}
        onChange={e => setFilters({ ...filters, status: e.target.value })}
        className="px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-3xl"
      >
        <option value="all">All Tasks</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={filters.dueFilter}
        onChange={e => setFilters({ ...filters, dueFilter: e.target.value })}
        className="px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-3xl"
      >
        <option value="all">All Due</option>
        <option value="today">Due Today</option>
        <option value="overdue">Overdue</option>
      </select>
    </div>
  )
}
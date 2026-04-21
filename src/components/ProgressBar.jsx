export default function ProgressBar({ total, completed, progress }) {
  return (
    <div className="mb-8 bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-700">
      <div className="flex justify-between text-sm mb-3">
        <div className="font-medium">Progress</div>
        <div className="font-medium text-zinc-500">
          {completed} of {total} completed
        </div>
      </div>
      <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-3xl overflow-hidden">
        <div
          className="h-3 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-3xl transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-center mt-2 text-xs font-medium text-violet-600 dark:text-violet-400">
        {progress}% Complete
      </div>
    </div>
  )
}
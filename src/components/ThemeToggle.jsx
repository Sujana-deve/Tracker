export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="w-11 h-11 flex items-center justify-center text-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-2xl transition-colors"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../store/uiSlice'

export default function DarkModeToggle() {
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.ui.darkMode)

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-full bg-surface border border-border-default text-fg-muted hover:bg-surface-raised hover:text-fg transition-colors"
    >
      {darkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      )}
    </button>
  )
}
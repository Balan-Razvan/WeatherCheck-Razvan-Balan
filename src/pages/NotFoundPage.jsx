import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <p className="font-display text-fg/5 leading-none select-none" style={{ fontSize: "var(--size-display-xl)" }}>
        404
      </p>
      <p className="text-fg-muted text-sm -mt-4 mb-6">Page not found</p>
      <Link to="/" className="text-sm text-fg-muted underline underline-offset-2 hover:text-fg transition-colors">
        Go back home
      </Link>
    </div>
  )
}

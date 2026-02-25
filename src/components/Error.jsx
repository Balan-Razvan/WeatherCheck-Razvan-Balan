export default function Error({ message, onRetry }) {
  return (
    <div className="bg-danger-surface border border-danger-border rounded-lg p-4 text-center">
      <p className="text-danger-text text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-sm text-danger-text hover:text-white underline underline-offset-2 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  )
}
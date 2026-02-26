export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex items-center justify-center gap-1 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border border-border-default text-sm text-fg-muted disabled:opacity-30 hover:border-border-muted hover:text-fg transition-colors"
      >
        Prev
      </button>

      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`px-3 py-1 rounded border text-sm transition-colors ${
            currentPage === pageNum
              ? 'bg-cta text-cta-fg border-cta font-medium'
              : 'border-border-default text-fg-muted hover:border-border-muted hover:text-fg'
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border border-border-default text-sm text-fg-muted disabled:opacity-30 hover:border-border-muted hover:text-fg transition-colors"
      >
        Next
      </button>
    </div>
  )
}

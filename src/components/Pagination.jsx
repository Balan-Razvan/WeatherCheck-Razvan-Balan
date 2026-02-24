import { Fragment } from 'react'

export default function Pagination({
  currentPage,
  totalPages,
  startItem,
  endItem,
  totalItems,
  onPageChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-gray-50">
      <p className="text-sm text-gray-600">
        Showing {startItem}–{endItem} of {totalItems}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-100 transition-colors"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => {
            if (totalPages <= 5) return true
            if (p === 1 || p === totalPages) return true
            return Math.abs(p - currentPage) <= 1
          })
          .map((p, i, arr) => (
            <Fragment key={p}>
              {i > 0 && arr[i - 1] !== p - 1 && (
                <span className="px-1 text-gray-400">...</span>
              )}
              <button
                onClick={() => onPageChange(p)}
                className={`px-3 py-1 rounded border text-sm transition-colors ${
                  currentPage === p
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            </Fragment>
          ))}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-100 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}
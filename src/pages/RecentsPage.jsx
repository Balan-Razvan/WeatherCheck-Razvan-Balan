import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '../hooks/useAuth'
import {
  removeRecentSearch,
  updateRecentSearch,
  addRecentSearch,
  addComment,
  removeComment,
} from '../store/recentsSlice'
import RecentSearchCard from '../components/RecentSearchCard'
import Pagination from '../components/Pagination'
import CardModal from '../components/CardModal'

const PER_PAGE_OPTIONS = [5, 10, 20]

function SortButton({ field, label, sortField, sortDir, onSort }) {
  const isActive = sortField === field
  return (
    <button
      onClick={() => onSort(field)}
      className={`text-xs px-2 py-1 rounded border transition-colors ${
        isActive
          ? 'bg-blue-100 border-blue-300 text-blue-700'
          : 'border-gray-200 text-gray-500 hover:bg-gray-100'
      }`}
    >
      {label} {isActive ? (sortDir === 'asc' ? '↑' : '↓') : ''}
    </button>
  )
}

export default function RecentsPage() {
  const { items } = useSelector((state) => state.recents)
  const { isAdmin, isAuthenticated, user } = useAuth()
  const dispatch = useDispatch()

  const [filterText, setFilterText] = useState('')
  const [sortField, setSortField] = useState('searchedAt')
  const [sortDir, setSortDir] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [expandedId, setExpandedId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editingCard, setEditingCard] = useState(null)

  // filter based on search text
  const getFilteredItems = () => {
    if (!filterText.trim()) return items

    const lower = filterText.toLowerCase()
    return items.filter(
      (item) =>
        item.name?.toLowerCase().includes(lower) ||
        item.country?.toLowerCase().includes(lower)
    )
  }

  // sort filtered
  const getSortedItems = (filteredItems) => {
    const copy = [...filteredItems]
    copy.sort((a, b) => {
      let valA = a[sortField]
      let valB = b[sortField]

      if (typeof valA === 'string') {
        valA = valA.toLowerCase()
        valB = (valB || '').toLowerCase()
      }

      if (valA < valB) return sortDir === 'asc' ? -1 : 1
      if (valA > valB) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return copy
  }

  // per page items
  const getPageItems = (sortedItems) => {
    const startIndex = (currentPage - 1) * perPage
    const endIndex = startIndex + perPage
    return sortedItems.slice(startIndex, endIndex)
  }

  const filteredItems = getFilteredItems()
  const sortedItems = getSortedItems(filteredItems)
  const totalPages = Math.max(1, Math.ceil(sortedItems.length / perPage))

  const safePage = Math.min(currentPage, totalPages)
  const pageItems = getPageItems(sortedItems)



  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
    setCurrentPage(1)
  }

  const handleDelete = (id) => {
    dispatch(removeRecentSearch(id))
    if (expandedId === id) setExpandedId(null)
  }

  const handleEdit = (card) => {
    setEditingCard({ ...card })
    setShowModal(true)
  }

  const handleCreate = () => {
    setEditingCard(null)
    setShowModal(true)
  }

  const handleSaveModal = (data) => {
    if (editingCard) {
      dispatch(updateRecentSearch({ id: editingCard.id, ...data }))
    } else {
      dispatch(addRecentSearch(data))
    }
    setShowModal(false)
    setEditingCard(null)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingCard(null)
  }

  const handleAddComment = (cardId, text) => {
    dispatch(
      addComment({
        cardId,
        text,
        author: user?.email || 'Anonymous',
      })
    )
  }

  const handleDeleteComment = (cardId, commentId) => {
    dispatch(removeComment({ cardId, commentId }))
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recent Searches</h1>
          <p className="text-sm text-gray-500 mt-1">
            {sortedItems.length} weather{' '}
            {sortedItems.length === 1 ? 'search' : 'searches'} recorded
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Card
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value)
            setCurrentPage(1)
          }}
          placeholder="Filter by city or country..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value))
            setCurrentPage(1)
          }}
          className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white"
        >
          {PER_PAGE_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n} per page
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-400 self-center mr-1">Sort by:</span>
        <SortButton field="name" label="City" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
        <SortButton field="temperature" label="Temp" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
        <SortButton field="humidity" label="Humidity" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
        <SortButton field="windSpeed" label="Wind" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
        <SortButton field="searchedAt" label="Date" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
      </div>

      {sortedItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-400">
            {filterText
              ? 'No matches found.'
              : 'No recent searches yet. Search for a city to get started.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {pageItems.map((card) => (
            <RecentSearchCard
              key={card.id}
              card={card}
              isExpanded={expandedId === card.id}
              isAdmin={isAdmin}
              isAuthenticated={isAuthenticated}
              userEmail={user?.email}
              onToggleExpand={() => toggleExpand(card.id)}
              onEdit={() => handleEdit(card)}
              onDelete={() => handleDelete(card.id)}
              onAddComment={(text) => handleAddComment(card.id, text)}
              onDeleteComment={(commentId) =>
                handleDeleteComment(card.id, commentId)
              }
            />
          ))}

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {showModal && (
        <CardModal
          card={editingCard}
          onSave={handleSaveModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
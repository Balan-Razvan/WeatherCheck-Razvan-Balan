import { useState } from 'react'
import { getWeatherInfo } from '../utils/weatherCodes'

export default function RecentSearchCard({
  card,
  isExpanded,
  isAdmin,
  isAuthenticated,
  userEmail,
  onToggleExpand,
  onEdit,
  onDelete,
  onAddComment,
  onDeleteComment,
}) {
  const weather = getWeatherInfo(card.weatherCode)
  const [commentText, setCommentText] = useState('')

  const handlePostComment = () => {
    if (!commentText.trim()) return
    onAddComment(commentText.trim())
    setCommentText('')
  }

  const formattedDate = new Date(card.searchedAt).toLocaleDateString(
    undefined,
    { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* --- Main row (always visible) --- */}
      <div
        onClick={onToggleExpand}
        className={`flex flex-wrap items-center gap-4 px-4 py-3 cursor-pointer transition-colors ${
          isExpanded ? 'bg-blue-50' : 'hover:bg-gray-50'
        }`}
      >
        {/* City & Country */}
        <div className="min-w-[120px]">
          <p className="font-medium text-gray-900">{card.name}</p>
          {card.country && (
            <p className="text-xs text-gray-500">{card.country}</p>
          )}
        </div>

        {/* Temperature */}
        <div className="text-lg font-semibold text-gray-900">
          {card.temperature != null ? `${Math.round(card.temperature)}°` : '—'}
        </div>

        {/* Weather condition */}
        <div className="flex items-center gap-1">
          <span>{weather.icon}</span>
          <span className="text-sm text-gray-600">{weather.label}</span>
        </div>

        {/* Humidity & Wind (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
          <span>
            {card.humidity != null ? `${Math.round(card.humidity)}% humidity` : ''}
          </span>
          <span>
            {card.windSpeed != null ? `${Math.round(card.windSpeed)} km/h` : ''}
          </span>
        </div>

        {/* Date (hidden on small screens) */}
        <div className="hidden lg:block text-xs text-gray-400 ml-auto">
          {formattedDate}
        </div>

        {/* Action buttons */}
        <div
          className="flex items-center gap-2 ml-auto lg:ml-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onToggleExpand}
            className="text-xs px-2 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-100"
          >
            {isExpanded ? 'Close' : 'Details'}
          </button>
          {isAdmin && (
            <>
              <button
                onClick={onEdit}
                className="text-xs px-2 py-1 rounded border border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="text-xs px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* --- Expanded details (only shown when expanded) --- */}
      {isExpanded && (
        <div className="px-4 py-4 bg-gray-50 border-t border-gray-200">
          {/* Detail grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <DetailBox
              label="Temperature"
              value={card.temperature != null ? `${Math.round(card.temperature)}°` : '—'}
            />
            <DetailBox
              label="Feels Like"
              value={card.feelsLike != null ? `${Math.round(card.feelsLike)}°` : '—'}
            />
            <DetailBox
              label="Humidity"
              value={card.humidity != null ? `${Math.round(card.humidity)}%` : '—'}
            />
            <DetailBox
              label="Wind Speed"
              value={card.windSpeed != null ? `${Math.round(card.windSpeed)} km/h` : '—'}
            />
            <DetailBox
              label="Condition"
              value={`${weather.icon} ${weather.label}`}
            />
            <DetailBox
              label="Coordinates"
              value={
                card.latitude != null
                  ? `${card.latitude.toFixed(2)}, ${card.longitude.toFixed(2)}`
                  : '—'
              }
            />
            <DetailBox
              label="Searched"
              value={new Date(card.searchedAt).toLocaleString()}
            />
          </div>

          {/* Comments section */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold text-gray-800 mb-3">
              Comments ({card.comments?.length || 0})
            </h4>

            {/* List of existing comments */}
            {card.comments?.length > 0 ? (
              <div className="space-y-3 mb-4">
                {card.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-700">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{comment.text}</p>
                    </div>
                    {(isAdmin || comment.author === userEmail) && (
                      <button
                        onClick={() => onDeleteComment(comment.id)}
                        className="text-xs text-red-400 hover:text-red-600 shrink-0"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 mb-4">No comments yet.</p>
            )}

            {/* Add comment input */}
            {isAuthenticated ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePostComment()
                  }}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handlePostComment}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-400">Log in to add comments.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// A tiny helper component used only inside this file
function DetailBox({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-gray-900 mt-0.5">{value}</p>
    </div>
  )
}

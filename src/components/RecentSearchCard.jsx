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
    <div className={`bg-surface border rounded-lg overflow-hidden transition-colors ${isExpanded ? 'border-border-muted' : 'border-border-subtle'}`}>
      <div
        onClick={onToggleExpand}
        className="flex flex-wrap items-center gap-4 px-4 py-3 cursor-pointer hover:bg-hover transition-colors"
      >
        <div className="min-w-[120px]">
          <p className="text-sm text-fg">{card.name}</p>
          {card.country && <p className="text-xs text-fg-faint">{card.country}</p>}
        </div>

        <div className="text-base text-fg-secondary">
          {card.temperature != null ? `${Math.round(card.temperature)}°` : '—'}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-sm">{weather.icon}</span>
          <span className="text-xs text-fg-muted">{weather.label}</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-xs text-fg-faint">
          {card.humidity != null && <span>{Math.round(card.humidity)}% humidity</span>}
          {card.windSpeed != null && <span>{Math.round(card.windSpeed)} km/h</span>}
        </div>

        <div className="hidden lg:block text-xs text-fg-ghost ml-auto">{formattedDate}</div>

        <div
          className="flex items-center gap-2 ml-auto lg:ml-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onToggleExpand}
            className="text-xs px-2.5 py-1 rounded border border-border-default text-fg-muted hover:border-border-muted hover:text-fg-secondary transition-colors"
          >
            {isExpanded ? 'Close' : 'Details'}
          </button>
          {isAdmin && (
            <>
              <button
                onClick={onEdit}
                className="text-xs px-2.5 py-1 rounded border border-border-default text-fg-muted hover:border-border-muted hover:text-fg-secondary transition-colors"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="text-xs px-2.5 py-1 rounded border border-border-default text-danger-text/50 hover:border-danger-border hover:text-danger-text transition-colors"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 py-4 border-t border-border-subtle">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <DetailBox label="Temperature" value={card.temperature != null ? `${Math.round(card.temperature)}°` : '—'} />
            <DetailBox label="Feels Like" value={card.feelsLike != null ? `${Math.round(card.feelsLike)}°` : '—'} />
            <DetailBox label="Humidity" value={card.humidity != null ? `${Math.round(card.humidity)}%` : '—'} />
            <DetailBox label="Wind Speed" value={card.windSpeed != null ? `${Math.round(card.windSpeed)} km/h` : '—'} />
            <DetailBox label="Condition" value={`${weather.icon} ${weather.label}`} />
            <DetailBox
              label="Coordinates"
              value={card.latitude != null ? `${card.latitude.toFixed(2)}, ${card.longitude.toFixed(2)}` : '—'}
            />
            <DetailBox label="Searched" value={new Date(card.searchedAt).toLocaleString()} />
          </div>

          <div className="border-t border-border-subtle pt-4">
            <h4 className="text-xs uppercase tracking-widest text-fg-faint mb-3">
              Comments ({card.comments?.length || 0})
            </h4>

            {card.comments?.length > 0 ? (
              <div className="space-y-2 mb-4">
                {card.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3 bg-surface-raised rounded-lg p-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-fg-secondary">{comment.author}</span>
                        <span className="text-xs text-fg-ghost">{new Date(comment.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-fg-secondary">{comment.text}</p>
                    </div>
                    {(isAdmin || comment.author === userEmail) && (
                      <button
                        onClick={() => onDeleteComment(comment.id)}
                        className="text-xs text-danger-text/50 hover:text-danger-text transition-colors shrink-0"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-fg-ghost mb-4">No comments yet.</p>
            )}

            {isAuthenticated ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handlePostComment() }}
                  placeholder="Add a comment…"
                  className="flex-1 px-3 py-2 rounded-lg bg-surface-raised border border-border-default text-sm text-fg placeholder-fg-placeholder focus:outline-none focus:border-border-muted transition-colors"
                />
                <button
                  onClick={handlePostComment}
                  className="px-4 py-2 bg-cta text-cta-fg text-sm rounded-lg hover:bg-cta-hover transition-colors"
                >
                  Post
                </button>
              </div>
            ) : (
              <p className="text-xs text-fg-ghost">Sign in to add comments.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function DetailBox({ label, value }) {
  return (
    <div>
      <p className="text-xs text-fg-faint uppercase tracking-wide">{label}</p>
      <p className="text-sm text-fg-secondary mt-0.5">{value}</p>
    </div>
  )
}
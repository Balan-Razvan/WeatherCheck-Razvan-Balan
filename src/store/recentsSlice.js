import { createSlice } from "@reduxjs/toolkit"

const loadRecents = () => {
  try {
    const stored = localStorage.getItem('recentSearches')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const persistRecents = (items) => {
  localStorage.setItem('recentSearches', JSON.stringify(items))
}

const recentsSlice = createSlice({
  name: 'recents',
  initialState: {
    items: loadRecents(),
  },
  reducers: {
    addRecentSearch(state, action) {
      const entry = {
        id: crypto.randomUUID(), 
        ...action.payload,       
        searchedAt: new Date().toISOString(), 
        comments: [],          
      }
      state.items.unshift(entry)  
      if (state.items.length > 50) {
        state.items = state.items.slice(0, 50) 
      }
      persistRecents(state.items)
    },

    updateRecentSearch(state, action) {
      const { id, ...updates } = action.payload
      const index = state.items.findIndex((item) => item.id === id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates }
        persistRecents(state.items)
      }
    },

    removeRecentSearch(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
      persistRecents(state.items)
    },

    addComment(state, action) {
      const { cardId, text, author } = action.payload
      const card = state.items.find((item) => item.id === cardId)
      if (card) {
        card.comments.push({
          id: crypto.randomUUID(),
          text,
          author,
          createdAt: new Date().toISOString(),
        })
        persistRecents(state.items)
      }
    },

    removeComment(state, action) {
      const { cardId, commentId } = action.payload
      const card = state.items.find((item) => item.id === cardId)
      if (card) {
        card.comments = card.comments.filter((c) => c.id !== commentId)
        persistRecents(state.items)
      }
    },
  },
})

export const {
  addRecentSearch,
  updateRecentSearch,
  removeRecentSearch,
  addComment,
  removeComment,
} = recentsSlice.actions

export default recentsSlice.reducer

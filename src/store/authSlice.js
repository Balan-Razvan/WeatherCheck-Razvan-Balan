import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../lib/supabaseClient'

// --- Async thunks ---
// Each thunk calls the Supabase auth API and either returns the user object
// on success or passes the error message to rejectWithValue so the
// rejected case can store it as state.error.

// Creates a new Supabase account with email + password
export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return rejectWithValue(error.message)
    return data.user
  }
)

// Signs an existing user in with email + password
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) return rejectWithValue(error.message)
    return data.user
  }
)

// Signs the current user out of Supabase
export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signOut()
    if (error) return rejectWithValue(error.message)
    // No return value needed — fulfilled case resets state manually
  }
)

// Extracts the user's role from the Supabase user object.
// Supabase stores custom claims in app_metadata (server-set) or user_metadata
// (user-editable). We check app_metadata first as it is more trustworthy,
// then fall back to user_metadata, the top-level role field, and finally 'user'.
function extractRole(user) {
  console.log('[Auth Debug] Full user object:', JSON.stringify(user, null, 2))
  console.log('[Auth Debug] app_metadata:', user?.app_metadata)
  console.log('[Auth Debug] user_metadata:', user?.user_metadata)

  const role =
    user?.app_metadata?.role ||
    user?.user_metadata?.role ||
    user?.role ||
    'user' // default role when none is set

  console.log('[Auth Debug] Extracted role:', role)
  return role
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,        
    role: 'user',       
    isLoading: false,   
    isInitialized: false, 
    error: null,    
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      state.role = extractRole(action.payload)
      state.isInitialized = true
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true
        state.error = null      
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.role = extractRole(action.payload)
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload 
      })

      .addCase(signIn.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.role = extractRole(action.payload)
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(signOut.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false
        state.user = null    
        state.role = 'user'  
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { setUser, clearError } = authSlice.actions
export default authSlice.reducer

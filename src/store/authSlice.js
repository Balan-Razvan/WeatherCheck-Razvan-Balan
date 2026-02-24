import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../lib/supabaseClient'

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return rejectWithValue(error.message)
    return data.user
  }
)

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

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signOut()
    if (error) return rejectWithValue(error.message)
  }
)

function extractRole(user) {
  return user?.user_metadata?.role || 'user'
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
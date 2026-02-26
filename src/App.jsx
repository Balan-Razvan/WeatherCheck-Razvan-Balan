import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { supabase } from './lib/supabaseClient'
import { setUser } from './store/authSlice'

import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import RecentsPage from './pages/RecentsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NotFoundPage from './pages/NotFoundPage'
import AirQualityPage from './pages/AirQualityPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        supabase.auth.getUser().then(({ data: { user } }) => {
          dispatch(setUser(user ?? session.user))
        })
      } else {
        dispatch(setUser(null))
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        supabase.auth.getUser().then(({ data: { user } }) => {
          dispatch(setUser(user ?? session.user))
        })
      } else {
        dispatch(setUser(null))
      }
    })

    return () => subscription.unsubscribe()
  }, [dispatch])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recents" element={<RecentsPage />} />
          <Route path="/air-quality" element={<AirQualityPage />} />
          <Route path='/contact' element={<ContactPage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
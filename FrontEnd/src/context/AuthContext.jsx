import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchProfile(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) fetchProfile(session.user.id)
      else {
        setProfile(null)
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (!error && data) {
      setProfile(data)
      setUser({ ...data, id: userId })
    }
    setLoading(false)
  }

  const login = (email, password) => {
    try {
      // Mock login for demo - in production this would call supabase.auth.signInWithPassword
      if (email === 'admin@example.com' && password === 'password123') {
        const adminUser = {
          id: 'admin-1',
          email: 'admin@example.com',
          role: 'admin',
          name: 'Admin User'
        }
        setUser(adminUser)
        setProfile(adminUser)
        return { success: true, user: adminUser }
      } else if (email.includes('@') && password === 'password123') {
        const empUser = {
          id: 'emp-' + Math.random().toString(36).substr(2, 9),
          email,
          role: 'employee',
          name: email.split('@')[0]
        }
        setUser(empUser)
        setProfile(empUser)
        return { success: true, user: empUser }
      } else {
        return { success: false, error: 'Invalid email or password' }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signup = (employeeId, email, password, role) => {
    try {
      // Mock signup for demo - in production this would call supabase.auth.signUp
      const newUser = {
        id: employeeId,
        email,
        role: role || 'employee',
        name: email.split('@')[0]
      }
      setUser(newUser)
      setProfile(newUser)
      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    setUser(null)
    setProfile(null)
    setSession(null)
  }

  return (
  <AuthContext.Provider value={{ session, profile, loading, user, login, signup, logout }}>
    {children}
  </AuthContext.Provider>
)
}

export function useAuth() {
  return useContext(AuthContext)
}
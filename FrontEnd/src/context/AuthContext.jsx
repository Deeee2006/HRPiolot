<<<<<<< HEAD
import { createContext, useContext, useState } from 'react';
import { authenticateUser, getAllEmployees } from '../services/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('hrpilot_user');
    return stored ? JSON.parse(stored) : null;
  });
  const loading = false;

  const login = (email, password) => {
    const authenticatedUser = authenticateUser(email, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('hrpilot_user', JSON.stringify(authenticatedUser));
      return { success: true, user: authenticatedUser };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (employeeId, email, password, role) => {
    const employees = getAllEmployees();
    const existingEmployee = employees.find(emp => emp.email === email || emp.id === employeeId);
    
    if (existingEmployee) {
      return { success: false, error: 'Employee ID or Email already exists' };
    }

    const newUser = {
      id: employeeId,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      password,
      role,
      department: 'General',
      position: 'New Employee',
      salary: 0,
      joinDate: new Date().toISOString().split('T')[0],
      phone: '',
      address: '',
      avatar: null,
      documents: [],
      attendance: [],
      leaveRequests: []
    };

    setUser(newUser);
    localStorage.setItem('hrpilot_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hrpilot_user');
  };

  const updateUserProfile = (updatedData) => {
    setUser(prev => {
      const updated = { ...prev, ...updatedData };
      localStorage.setItem('hrpilot_user', JSON.stringify(updated));
      return updated;
    });
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUserProfile, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
=======
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // check current session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchProfile(session.user.id)
      else setLoading(false)
    })

    // listen for login/logout changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) fetchProfile(session.user.id)
      else {
        setProfile(null)
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

    if (!error) setProfile(data)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ session, profile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
>>>>>>> f65aa81 (Add authentication and dashboard pages)

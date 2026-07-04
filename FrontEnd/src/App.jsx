import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import EmployeeDashboard from './pages/EmployeeDashboard'
import AdminDashboard from './pages/AdminDashboard'
import { useAuth } from './context/AuthContext'

function Dashboard() {
  const { profile } = useAuth()

  if (!profile) return <Navigate to="/signin" />

  return profile.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />
}

function App() {
  const { session, loading } = useAuth()

  if (loading) return <p className="text-center mt-8">Loading...</p>

  return (
    <Routes>
      <Route path="/signup" element={session ? <Navigate to="/dashboard" /> : <SignUp />} />
      <Route path="/signin" element={session ? <Navigate to="/dashboard" /> : <SignIn />} />
      <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/signin" />} />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  )
}

export default App
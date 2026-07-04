import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

function EmployeeDashboard() {
  const { profile } = useAuth()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {profile.full_name}</h1>
      <p>Employee ID: {profile.employee_id}</p>
      <button onClick={() => supabase.auth.signOut()} className="mt-4 bg-red-600 text-white px-4 py-2">
        Logout
      </button>
    </div>
  )
}

export default EmployeeDashboard
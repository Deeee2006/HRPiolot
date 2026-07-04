import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { checkIn, checkOut, applyLeave } from '../lib/api'

function EmployeeDashboard() {
  const { profile } = useAuth()

  const handleCheckIn = async () => {
    const { data, error } = await checkIn(profile.id)
    console.log('CHECK IN:', { data, error })
  }

  const handleCheckOut = async () => {
    const { data, error } = await checkOut(profile.id)
    console.log('CHECK OUT:', { data, error })
  }

  const handleApplyLeave = async () => {
    const { data, error } = await applyLeave(profile.id, {
      leave_type: 'sick',
      start_date: '2026-07-10',
      end_date: '2026-07-11',
      remarks: 'Test leave request'
    })
    console.log('APPLY LEAVE:', { data, error })
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {profile.full_name}</h1>
      <p>Employee ID: {profile.employee_id}</p>

      <button onClick={handleCheckIn} className="mt-4 mr-2 bg-blue-600 text-white px-4 py-2">
        Check In
      </button>

      <button onClick={handleCheckOut} className="mt-4 mr-2 bg-green-600 text-white px-4 py-2">
        Check Out
      </button>

      <button onClick={handleApplyLeave} className="mt-4 mr-2 bg-purple-600 text-white px-4 py-2">
        Apply Leave
      </button>

      <button onClick={() => supabase.auth.signOut()} className="mt-4 bg-red-600 text-white px-4 py-2">
        Logout
      </button>
    </div>
  )
}

export default EmployeeDashboard

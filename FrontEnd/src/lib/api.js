src-> lib->api.js (pate kor)
import { supabase } from './supabase'

// ---------- ATTENDANCE ----------

// Employee: check in for today
export async function checkIn(employeeId) {
  const today = new Date().toISOString().split('T')[0]

  const { data: existing } = await supabase
    .from('attendance')
    .select('id')
    .eq('employee_id', employeeId)
    .eq('date', today)
    .maybeSingle()

  if (existing) {
    return { data: null, error: { message: 'Already checked in today' } }
  }

  const { data, error } = await supabase
    .from('attendance')
    .insert({ employee_id: employeeId, date: today, check_in: new Date().toISOString(), status: 'present' })
    .select()
    .single()

  return { data, error }
}

// Employee: check out for today
export async function checkOut(employeeId) {
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('attendance')
    .update({ check_out: new Date().toISOString() })
    .eq('employee_id', employeeId)
    .eq('date', today)
    .select()
    .single()
  return { data, error }
}

// Get attendance for one employee (own view)
export async function getMyAttendance(employeeId) {
  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('employee_id', employeeId)
    .order('date', { ascending: false })
  return { data, error }
}

// Admin: get all attendance records
export async function getAllAttendance() {
  const { data, error } = await supabase
    .from('attendance')
    .select('*, profiles(full_name, employee_id)')
    .order('date', { ascending: false })
  return { data, error }
}

// ---------- LEAVE REQUESTS ----------

// Employee: apply for leave
export async function applyLeave(employeeId, { leave_type, start_date, end_date, remarks }) {
  const { data, error } = await supabase
    .from('leave_requests')
    .insert({ employee_id: employeeId, leave_type, start_date, end_date, remarks, status: 'pending' })
    .select()
    .single()
  return { data, error }
}

// Employee: view own leave requests
export async function getMyLeaveRequests(employeeId) {
  const { data, error } = await supabase
    .from('leave_requests')
    .select('*')
    .eq('employee_id', employeeId)
    .order('created_at', { ascending: false })
  return { data, error }
}

// Admin: view all leave requests
export async function getAllLeaveRequests() {
  const { data, error } = await supabase
    .from('leave_requests')
    .select('*, profiles(full_name, employee_id)')
    .order('created_at', { ascending: false })
  return { data, error }
}

// Admin: approve or reject a leave request
export async function reviewLeaveRequest(requestId, status, adminComment, reviewerId) {
  const { data, error } = await supabase
    .from('leave_requests')
    .update({ status, admin_comment: adminComment, reviewed_by: reviewerId })
    .eq('id', requestId)
    .select()
    .single()
  return { data, error }
}

// ---------- PAYROLL ----------

// Employee: view own payroll (read-only — enforced by GRANT, no write function exists for employees)
export async function getMyPayroll(employeeId) {
  const { data, error } = await supabase
    .from('payroll')
    .select('*')
    .eq('employee_id', employeeId)
    .maybeSingle()
  return { data, error }
}

// Admin: view all payroll records
export async function getAllPayroll() {
  const { data, error } = await supabase
    .from('payroll')
    .select('*, profiles(full_name, employee_id)')
    .order('last_updated', { ascending: false })
  return { data, error }
}

// Admin: create or update an employee's payroll
export async function upsertPayroll(employeeId, { base_salary, allowances, deductions }) {
  const { data, error } = await supabase
    .from('payroll')
    .upsert({ employee_id: employeeId, base_salary, allowances, deductions, last_updated: new Date().toISOString() }, { onConflict: 'employee_id' })
    .select()
    .single()
  return { data, error }
}
src->pages->EmployeeDashboard(paste)
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
        Test Apply Leave
      </button>

      <button onClick={() => supabase.auth.signOut()} className="mt-4 bg-red-600 text-white px-4 py-2">
        Logout
      </button>
    </div>
  )
}

export default EmployeeDashboard
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

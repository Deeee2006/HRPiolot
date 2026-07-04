// Employee: check in for today
export async function checkIn(employeeId) {
  const today = new Date().toISOString().split('T')[0]
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
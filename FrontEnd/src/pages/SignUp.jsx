import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const [form, setForm] = useState({
  email: '',
  password: '',
  fullName: '',
  employeeId: ''
})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
  data: {
    full_name: form.fullName,
    employee_id: form.employeeId
  }
}
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    // If email confirmation is ON, user must verify before session exists
    if (data.user && !data.session) {
      alert('Check your email to confirm your account.')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 space-y-4">
      <h2 className="text-xl font-bold">Sign Up</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input name="fullName" placeholder="Full Name" onChange={handleChange} required className="w-full border p-2" />
      <input name="employeeId" placeholder="Employee ID" onChange={handleChange} required className="w-full border p-2" />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full border p-2" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full border p-2" />
      <button type="submit" disabled={loading} className="bg-amber-600 text-white p-2 w-full">
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  )
}

export default SignUp
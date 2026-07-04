import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 space-y-4">
      <h2 className="text-xl font-bold">Sign In</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full border p-2" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full border p-2" />
      <button type="submit" disabled={loading} className="bg-amber-600 text-white p-2 w-full">
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}

export default SignIn
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { login as loginApi } from '../../api/authApi'
import toast from 'react-hot-toast'
import { Leaf, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate   = useNavigate()
  const [form, setForm]   = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await loginApi(form)
      login(res.data)
      toast.success(`Welcome back, ${res.data.name}! 🌿`)
      const role = res.data.role
      if (role === 'ROLE_ADMIN')  navigate('/admin/dashboard')
      else if (role === 'ROLE_SELLER') navigate('/seller/dashboard')
      else navigate('/marketplace')
    } catch (err) {
      toast.error(err.response?.data ?? 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 via-white to-eco-100 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body gap-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-2xl eco-gradient flex items-center justify-center">
                <Leaf size={28} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-base-content">Welcome back</h2>
            <p className="text-base-content/50 text-sm mt-1">Sign in to EcoBazaar</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="form-control">
              <div className="label"><span className="label-text font-medium">Email</span></div>
              <label className="input input-bordered flex items-center gap-2">
                <Mail size={16} className="text-base-content/40" />
                <input
                  name="email" type="email" required
                  className="grow" placeholder="you@example.com"
                  value={form.email} onChange={handleChange}
                />
              </label>
            </label>

            <label className="form-control">
              <div className="label"><span className="label-text font-medium">Password</span></div>
              <label className="input input-bordered flex items-center gap-2">
                <Lock size={16} className="text-base-content/40" />
                <input
                  name="password" type="password" required
                  className="grow" placeholder="••••••••"
                  value={form.password} onChange={handleChange}
                />
              </label>
            </label>

            <button type="submit" className="btn btn-primary text-white mt-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm"/> : 'Sign In'}
            </button>
          </form>

          <div className="divider text-xs text-base-content/40">OR</div>
          <p className="text-center text-sm">
            New here?{' '}
            <Link to="/register" className="link link-primary font-semibold">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
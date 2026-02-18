import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { register as registerApi } from '../../api/authApi'
import toast from 'react-hot-toast'
import { Leaf, User, Mail, Lock } from 'lucide-react'

export default function RegisterPage() {
  const { login }  = useAuth()
  const navigate   = useNavigate()
  const [form, setForm]   = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await registerApi(form)
      login(res.data)
      toast.success('Account created! Welcome to EcoBazaar 🌿')
      navigate('/marketplace')
    } catch (err) {
      toast.error(typeof err.response?.data === 'string' ? err.response.data : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 via-white to-eco-100 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body gap-6">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-2xl eco-gradient flex items-center justify-center">
                <Leaf size={28} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold">Join EcoBazaar</h2>
            <p className="text-base-content/50 text-sm mt-1">Start your eco-friendly journey</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { name:'name',     label:'Full Name', type:'text',     Icon:User,  ph:'Your Name'        },
              { name:'email',    label:'Email',     type:'email',    Icon:Mail,  ph:'you@example.com'  },
              { name:'password', label:'Password',  type:'password', Icon:Lock,  ph:'Min 4 characters' },
            ].map(({ name, label, type, Icon, ph }) => (
              <label key={name} className="form-control">
                <div className="label"><span className="label-text font-medium">{label}</span></div>
                <label className="input input-bordered flex items-center gap-2">
                  <Icon size={16} className="text-base-content/40" />
                  <input name={name} type={type} required className="grow"
                    placeholder={ph} value={form[name]} onChange={handleChange} />
                </label>
              </label>
            ))}

            <button type="submit" className="btn btn-primary text-white mt-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm"/> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="link link-primary font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
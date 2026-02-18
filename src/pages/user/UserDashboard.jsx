import { useFetch } from '../../hooks/useFetch'
import { getUserReport, getWeeklyCarbon } from '../../api/reportApi'
import { requestSellerRole } from '../../api/sellerApi'
import Loader from '../../components/common/Loader'
import ErrorAlert from '../../components/common/ErrorAlert'
import StatCard from '../../components/common/StatCard'
import { fmtCurrency, fmtCarbon } from '../../utils/formatters'
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts'
import toast from 'react-hot-toast'
import { ShoppingBag, Wallet, Leaf, Medal } from 'lucide-react'

export default function UserDashboard() {
  const { data: report,  loading: r1, error: e1, refetch: rf1 } = useFetch(getUserReport)
  const { data: weekly,  loading: r2, error: e2               } = useFetch(getWeeklyCarbon)

  const handleRequestSeller = async () => {
    try {
      const res = await requestSellerRole()
      toast.success(res.data.message)
    } catch (e) {
      toast.error(e.response?.data?.message ?? 'Request failed')
    }
  }

  if (r1 || r2) return <Loader text="Loading dashboard…" />
  if (e1)       return <ErrorAlert message={e1} onRetry={rf1} />

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-base-content/50 mt-1">Track your eco-friendly shopping impact</p>
        </div>
        <div className="badge badge-lg badge-primary p-4 text-sm font-semibold">
          {report?.ecoBadge}
        </div>
      </div>

      {/* Stats */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full border border-base-200 rounded-2xl">
        <StatCard title="Total Purchases"  value={report?.totalPurchases ?? 0}
          icon={<ShoppingBag size={32}/>} color="primary" />
        <StatCard title="Total Spent"      value={fmtCurrency(report?.totalSpent)}
          icon={<Wallet size={32}/>} color="secondary" />
        <StatCard title="Carbon Footprint" value={fmtCarbon(report?.totalCarbonSaved)}
          icon={<Leaf size={32}/>} color="success" desc="Net carbon impact" />
        <StatCard title="Eco Badge"        value={report?.ecoBadge ?? '—'}
          icon={<Medal size={32}/>} color="accent" />
      </div>

      {/* Weekly Carbon Chart */}
      {weekly && (
        <div className="card bg-base-100 shadow border border-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">🌍 Weekly Carbon Report (kg CO₂)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={weekly} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="saved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="used" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="saved" stroke="#22c55e" fill="url(#saved)" name="CO₂ Saved"/>
                <Area type="monotone" dataKey="used"  stroke="#ef4444" fill="url(#used)"  name="CO₂ Used"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Become a seller */}
      <div className="card bg-gradient-to-r from-eco-500 to-eco-700 text-white shadow">
        <div className="card-body flex-row items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold">Want to sell eco products?</h3>
            <p className="text-white/70 text-sm">Request seller access and start listing your products</p>
          </div>
          <button onClick={handleRequestSeller} className="btn btn-white text-eco-700 font-bold gap-2">
            🌿 Become a Seller
          </button>
        </div>
      </div>
    </div>
  )
}
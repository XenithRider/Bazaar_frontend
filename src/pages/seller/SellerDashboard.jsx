import { useFetch } from '../../hooks/useFetch'
import { getSellerReport, getSellerSales } from '../../api/reportApi'
import Loader from '../../components/common/Loader'
import ErrorAlert from '../../components/common/ErrorAlert'
import { fmtCurrency } from '../../utils/formatters'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Link } from 'react-router-dom'
import { Package, TrendingUp, Leaf, Award } from 'lucide-react'

export default function SellerDashboard() {
  const { data: report, loading: r1, error: e1 } = useFetch(getSellerReport)
  const { data: sales,  loading: r2              } = useFetch(() => getSellerSales(7))

  if (r1 || r2) return <Loader text="Loading seller hub…" />
  if (e1)       return <ErrorAlert message={e1} />

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Seller Hub</h1>
          <p className="text-base-content/50">Welcome back, {report?.sellerName}</p>
        </div>
        <span className="badge badge-lg badge-secondary p-4">{report?.ecoSellerBadge}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Total Products',     value: report?.totalProducts,     icon:<Package size={24}/>,    color:'primary'   },
          { label:'Eco Certified',      value: report?.totalEcoCertified, icon:<Leaf size={24}/>,       color:'success'   },
          { label:'Total Orders',       value: report?.totalOrders,       icon:<TrendingUp size={24}/>, color:'info'      },
          { label:'Revenue',            value: fmtCurrency(report?.totalRevenue), icon:<Award size={24}/>, color:'accent' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="card bg-base-100 shadow border border-base-200">
            <div className="card-body p-4 gap-1">
              <div className={`text-${color}`}>{icon}</div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-base-content/50">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      {sales && (
        <div className="card bg-base-100 shadow border border-base-200">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h3 className="card-title">💰 Sales (Last 7 Days)</h3>
              <Link to="/seller/products" className="btn btn-primary btn-sm text-white">Manage Products</Link>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={sales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => fmtCurrency(v)} />
                <Bar dataKey="revenue" fill="#16a34a" radius={[4,4,0,0]} name="Revenue"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
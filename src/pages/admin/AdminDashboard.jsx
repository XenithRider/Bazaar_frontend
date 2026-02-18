import { useFetch } from '../../hooks/useFetch'
import { getAdminReport, getPendingProducts, getPendingSellers,
         approveProduct, rejectProduct, approveSeller, rejectSeller } from '../../api/adminApi'
import { getPendingAdminReqs, approveAdminReq, rejectAdminReq } from '../../api/adminApi'
import Loader from '../../components/common/Loader'
import ErrorAlert from '../../components/common/ErrorAlert'
import { fmtCurrency, fmtCarbon } from '../../utils/formatters'
import toast from 'react-hot-toast'
import { Users, Package, ShoppingBag, TrendingUp, CheckCircle, XCircle } from 'lucide-react'

export default function AdminDashboard() {
  const { data: report,  loading: r1, error: e1, refetch: rf1 } = useFetch(getAdminReport)
  const { data: pendProd,loading: r2, refetch: rf2 }             = useFetch(getPendingProducts)
  const { data: pendSell,loading: r3, refetch: rf3 }             = useFetch(getPendingSellers)
  const { data: adminReqs,loading: r4, refetch: rf4 }            = useFetch(getPendingAdminReqs)

  const action = async (fn, refetch, successMsg) => {
    try { await fn(); refetch(); toast.success(successMsg) }
    catch { toast.error('Action failed') }
  }

  if (r1 || r2 || r3 || r4) return <Loader text="Loading admin panel…"/>
  if (e1) return <ErrorAlert message={e1} onRetry={rf1}/>

  const stats = [
    { label:'Total Orders',   value: report?.totalOrders,                  icon:<ShoppingBag size={24}/>, color:'primary'   },
    { label:'Revenue',        value: fmtCurrency(report?.totalRevenue),     icon:<TrendingUp size={24}/>,  color:'accent'    },
    { label:'Users',          value: report?.totalUsers,                    icon:<Users size={24}/>,       color:'info'      },
    { label:'Products',       value: report?.totalProducts,                 icon:<Package size={24}/>,     color:'secondary' },
    { label:'Carbon Used',    value: fmtCarbon(report?.totalCarbonUsed),    icon:'🌍',                     color:'error'     },
    { label:'Carbon Saved',   value: fmtCarbon(report?.totalCarbonSaved),   icon:'🌿',                     color:'success'   },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Panel</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map(({ label, value, icon, color }) => (
          <div key={label} className="card bg-base-100 shadow border border-base-200">
            <div className="card-body p-4 gap-1">
              <div className={`text-${color} text-xl`}>{icon}</div>
              <p className="text-xl font-bold truncate">{value}</p>
              <p className="text-xs text-base-content/50">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Products */}
      <Section title="🌿 Pending Eco Certifications" count={pendProd?.length}>
        {(pendProd ?? []).length === 0 ? (
          <p className="text-base-content/50 text-sm p-4">No pending product certifications</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead><tr><th>Name</th><th>Price</th><th>Carbon</th><th>Seller</th><th>Actions</th></tr></thead>
              <tbody>
                {pendProd.map(p => (
                  <tr key={p.id}>
                    <td className="font-medium">{p.name}</td>
                    <td>{fmtCurrency(p.price)}</td>
                    <td>{p.carbonImpact} kg</td>
                    <td>{p.sellerName}</td>
                    <td className="flex gap-2">
                      <button onClick={() => action(() => approveProduct(p.id), rf2, 'Product approved 🌿')}
                        className="btn btn-success btn-xs text-white gap-1">
                        <CheckCircle size={12}/> Approve
                      </button>
                      <button onClick={() => action(() => rejectProduct(p.id), rf2, 'Product rejected')}
                        className="btn btn-error btn-xs text-white gap-1">
                        <XCircle size={12}/> Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      {/* Pending Sellers */}
      <Section title="👤 Pending Seller Requests" count={pendSell?.length}>
        {(pendSell ?? []).length === 0 ? (
          <p className="text-base-content/50 text-sm p-4">No pending seller requests</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead><tr><th>Name</th><th>Email</th><th>Products</th><th>Actions</th></tr></thead>
              <tbody>
                {pendSell.map(s => (
                  <tr key={s.id}>
                    <td className="font-medium">{s.name}</td>
                    <td className="text-sm">{s.email}</td>
                    <td>{s.productCount}</td>
                    <td className="flex gap-2">
                      <button onClick={() => action(() => approveSeller(s.id), rf3, 'Seller approved!')}
                        className="btn btn-success btn-xs text-white gap-1">
                        <CheckCircle size={12}/> Approve
                      </button>
                      <button onClick={() => action(() => rejectSeller(s.id), rf3, 'Seller rejected')}
                        className="btn btn-error btn-xs text-white gap-1">
                        <XCircle size={12}/> Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      {/* Pending Admin Requests */}
      <Section title="🔐 Admin Access Requests" count={adminReqs?.length}>
        {(adminReqs ?? []).length === 0 ? (
          <p className="text-base-content/50 text-sm p-4">No pending admin requests</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead><tr><th>Name</th><th>Email</th><th>Requested At</th><th>Actions</th></tr></thead>
              <tbody>
                {adminReqs.map(r => (
                  <tr key={r.id}>
                    <td className="font-medium">{r.userName}</td>
                    <td className="text-sm">{r.userEmail}</td>
                    <td className="text-sm text-base-content/60">
                      {new Date(r.requestedAt).toLocaleDateString()}
                    </td>
                    <td className="flex gap-2">
                      <button onClick={() => action(() => approveAdminReq(r.id), rf4, 'Admin promoted!')}
                        className="btn btn-success btn-xs text-white gap-1">
                        <CheckCircle size={12}/> Approve
                      </button>
                      <button onClick={() => action(() => rejectAdminReq(r.id), rf4, 'Request rejected')}
                        className="btn btn-error btn-xs text-white gap-1">
                        <XCircle size={12}/> Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </div>
  )
}

function Section({ title, count, children }) {
  return (
    <div className="card bg-base-100 shadow border border-base-200">
      <div className="card-body gap-4">
        <div className="flex items-center gap-2">
          <h3 className="card-title">{title}</h3>
          {count > 0 && <span className="badge badge-primary badge-sm">{count}</span>}
        </div>
        {children}
      </div>
    </div>
  )
}
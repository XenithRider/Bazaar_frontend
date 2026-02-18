import { useFetch } from '../hooks/useFetch'
import { getMyOrders } from '../api/orderApi'
import Loader from '../components/common/Loader'
import ErrorAlert from '../components/common/ErrorAlert'
import EmptyState from '../components/common/EmptyState'
import { fmtCurrency, fmtCarbon, fmtDate } from '../utils/formatters'
import { Link } from 'react-router-dom'

export default function OrdersPage() {
  const { data: orders, loading, error, refetch } = useFetch(getMyOrders)

  if (loading) return <Loader text="Loading orders…"/>
  if (error)   return <ErrorAlert message={error} onRetry={refetch}/>

  if (!orders?.length)
    return <EmptyState icon="📦" title="No orders yet"
      subtitle="Start shopping to see your orders here"
      action={<Link to="/marketplace" className="btn btn-primary text-white">Shop Now</Link>}/>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Orders</h1>
      <div className="space-y-4">
        {orders.map(o => (
          <div key={o.id} className="card bg-base-100 shadow border border-base-200">
            <div className="card-body p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg">Order #{o.id}</h3>
                  <p className="text-sm text-base-content/50">{fmtDate(o.orderDate)}</p>
                </div>
                <span className="badge badge-success">Completed</span>
              </div>

              <div className="divider my-2"/>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-base-content/50 text-xs">Total Paid</p>
                  <p className="font-bold text-primary">{fmtCurrency(o.totalPrice)}</p>
                </div>
                <div>
                  <p className="text-base-content/50 text-xs">Carbon Used</p>
                  <p className="font-semibold text-error">{fmtCarbon(o.carbonUsed)}</p>
                </div>
                <div>
                  <p className="text-base-content/50 text-xs">Carbon Saved</p>
                  <p className="font-semibold text-success">{fmtCarbon(o.carbonSaved)}</p>
                </div>
                <div>
                  <p className="text-base-content/50 text-xs">Net Carbon</p>
                  <p className={`font-semibold ${o.totalCarbon > 0 ? 'text-warning' : 'text-success'}`}>
                    {fmtCarbon(o.totalCarbon)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
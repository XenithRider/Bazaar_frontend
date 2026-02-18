import { useFetch } from '../hooks/useFetch'
import { getCartSummary, removeFromCart, swapToEco, } from '../api/cartApi'
import { checkout } from '../api/orderApi'
import Loader from '../components/common/Loader'
import ErrorAlert from '../components/common/ErrorAlert'
import EmptyState from '../components/common/EmptyState'
import { fmtCurrency, fmtCarbon } from '../utils/formatters'
import toast from 'react-hot-toast'
import { Trash2, ArrowRightLeft, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CartPage() {
  const { data, loading, error, refetch } = useFetch(getCartSummary)
  const navigate = useNavigate()

  const handleRemove = async (id) => {
    try { await removeFromCart(id); refetch(); toast.success('Removed') }
    catch { toast.error('Failed to remove') }
  }

  const handleSwap = async (cartItemId, newProductId) => {
    try { await swapToEco({ cartItemId, newProductId }); refetch(); toast.success('Swapped to eco product 🌿') }
    catch { toast.error('Swap failed') }
  }

  const handleCheckout = async () => {
    try {
      await checkout()
      toast.success('Order placed! 🎉')
      navigate('/orders')
    } catch (e) {
      toast.error(e.response?.data ?? 'Checkout failed')
    }
  }

  if (loading) return <Loader text="Loading cart…" />
  if (error)   return <ErrorAlert message={error} onRetry={refetch} />

  const items = data?.items ?? []

  if (items.length === 0)
    return <EmptyState icon="🛒" title="Your cart is empty"
      subtitle="Add some eco-friendly products to get started"
      action={<a href="/marketplace" className="btn btn-primary text-white">Browse Products</a>} />

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Items */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>

        {items.map(item => (
          <div key={item.id} className="card bg-base-100 shadow border border-base-200 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="font-semibold">Product #{item.productId}</p>
                <p className="text-sm text-base-content/60">Qty: {item.quantity}</p>
              </div>
              <button onClick={() => handleRemove(item.id)}
                className="btn btn-ghost btn-sm text-error">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {/* Eco Swap Suggestion */}
        {data?.swapSuggestion && (
          <div className="alert alert-success border border-success/30">
            <ArrowRightLeft size={20} />
            <div>
              <h4 className="font-bold">💚 Eco Swap Available!</h4>
              <p className="text-sm">
                Switch to <strong>{data.swapSuggestion.suggestedProductName}</strong> and save{' '}
                <strong>{fmtCarbon(data.swapSuggestion.carbonSavingsPerUnit * data.swapSuggestion.quantity)}</strong> CO₂
              </p>
            </div>
            <button className="btn btn-sm btn-success text-white"
              onClick={() => handleSwap(data.swapSuggestion.cartItemIdToReplace, data.swapSuggestion.suggestedProductId)}>
              Swap Now
            </button>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="space-y-4">
        <div className="card bg-base-100 shadow border border-base-200">
          <div className="card-body gap-4">
            <h3 className="card-title">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-base-content/60">Total</span>
                <span className="font-bold">{fmtCurrency(data.totalPrice)}</span>
              </div>
              <div className="flex justify-between text-error">
                <span>Carbon Used</span>
                <span>{fmtCarbon(data.totalCarbonUsed)}</span>
              </div>
              <div className="flex justify-between text-success">
                <span>Carbon Saved</span>
                <span>{fmtCarbon(data.totalCarbonSaved)}</span>
              </div>
            </div>

            {data.ecoSuggestion && (
              <div className="bg-eco-50 border border-eco-200 rounded-xl p-3 text-sm text-eco-700">
                💡 {data.ecoSuggestion}
              </div>
            )}

            <button onClick={handleCheckout} className="btn btn-primary text-white w-full gap-2">
              <ShoppingBag size={18} /> Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
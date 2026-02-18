import { Link } from 'react-router-dom'
import EcoBadge from '../common/EcoBadge'
import { fmtCurrency, fmtCarbon } from '../../utils/formatters'
import { useAuth } from '../../context/AuthContext'
import { addToCart } from '../../api/cartApi'
import toast from 'react-hot-toast'
import { ShoppingCart, Leaf } from 'lucide-react'

export default function ProductCard({ product: p }) {
  const { isUser } = useAuth()

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: p.id, quantity: 1 })
      toast.success('Added to cart!')
    } catch {
      toast.error('Failed to add to cart')
    }
  }

  return (
    <div className="card bg-base-100 shadow border border-base-200 card-hover">
      {/* Image */}
      <figure className="relative h-48 bg-base-200 overflow-hidden">
        {p.imageUrl ? (
          <img src={p.imageUrl} alt={p.name}
            className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Leaf size={48} className="text-base-300" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <EcoBadge certified={p.ecoCertified} requested={p.ecoRequested} />
        </div>
      </figure>

      <div className="card-body p-4 gap-2">
        <h3 className="card-title text-base font-semibold line-clamp-1">{p.name}</h3>
        <p className="text-base-content/60 text-xs line-clamp-2">{p.details}</p>

        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-bold text-primary">{fmtCurrency(p.price)}</span>
          <span className="text-xs text-base-content/50">
            🌍 {fmtCarbon(p.carbonImpact)}
          </span>
        </div>

        <div className="card-actions mt-2 gap-2">
          <Link to={`/products/${p.id}`} className="btn btn-ghost btn-sm flex-1">Details</Link>
          {isUser && (
            <button onClick={handleAddToCart} className="btn btn-primary btn-sm text-white flex-1">
              <ShoppingCart size={14} /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
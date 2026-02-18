import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { getAllProducts } from '../api/productApi'
import ProductCard from '../components/products/ProductCard'
import Loader from '../components/common/Loader'
import ErrorAlert from '../components/common/ErrorAlert'
import EmptyState from '../components/common/EmptyState'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function MarketplacePage() {
  const { data: products, loading, error, refetch } = useFetch(getAllProducts)
  const [search,   setSearch]   = useState('')
  const [filter,   setFilter]   = useState('all') // all | eco | pending

  const filtered = (products ?? []).filter(p => {
    const matchName = p.name?.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === 'all'     ? true :
      filter === 'eco'     ? p.ecoCertified :
      filter === 'pending' ? p.ecoRequested  : true
    return matchName && matchFilter
  })

  if (loading) return <Loader text="Loading products…" />
  if (error)   return <ErrorAlert message={error} onRetry={refetch} />

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="hero rounded-3xl eco-gradient text-primary-content py-12 px-8">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">🌿 Eco-Friendly Marketplace</h1>
            <p className="text-primary-content/80 max-w-md">
              Shop sustainably. Every purchase tracks your carbon footprint.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <label className="input input-bordered flex items-center gap-2 flex-1">
          <Search size={16} className="text-base-content/40" />
          <input type="text" className="grow" placeholder="Search products…"
            value={search} onChange={e => setSearch(e.target.value)} />
        </label>

        <div className="flex gap-2">
          {[['all','All'],['eco','🌿 Eco Only'],['pending','⏳ Pending']].map(([val, label]) => (
            <button key={val}
              className={`btn btn-sm ${filter === val ? 'btn-primary text-white' : 'btn-ghost'}`}
              onClick={() => setFilter(val)}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-base-content/50">
        Showing <strong>{filtered.length}</strong> of {products?.length} products
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState icon="🔍" title="No products found" subtitle="Try adjusting your search or filters" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
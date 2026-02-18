import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { getSellerProducts, deleteProduct, createProduct, updateProduct } from '../../api/productApi'
import Loader from '../../components/common/Loader'
import ErrorAlert from '../../components/common/ErrorAlert'
import EcoBadge from '../../components/common/EcoBadge'
import { fmtCurrency } from '../../utils/formatters'
import toast from 'react-hot-toast'
import { Plus, Trash2, Edit2, X } from 'lucide-react'

const EMPTY = { name:'', details:'', price:'', carbonImpact:'', imageUrl:'', ecoRequested: false }

export default function ManageProducts() {
  const { data: products, loading, error, refetch } = useFetch(getSellerProducts)
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState(null) // product or null
  const [form,    setForm]    = useState(EMPTY)

  const openAdd  = ()  => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit = (p) => {
    setEditing(p)
    setForm({ name:p.name, details:p.details, price:p.price, carbonImpact:p.carbonImpact, imageUrl:p.imageUrl??'', ecoRequested:p.ecoRequested })
    setModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      if (editing) await updateProduct(editing.id, form)
      else         await createProduct(form)
      toast.success(editing ? 'Product updated!' : 'Product created!')
      setModal(false)
      refetch()
    } catch { toast.error('Failed to save') }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try { await deleteProduct(id); refetch(); toast.success('Deleted') }
    catch { toast.error('Delete failed') }
  }

  if (loading) return <Loader />
  if (error)   return <ErrorAlert message={error} onRetry={refetch} />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Products</h1>
        <button onClick={openAdd} className="btn btn-primary text-white gap-2">
          <Plus size={18}/> Add Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-base-200 shadow">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-base-200">
              <th>Name</th><th>Price</th><th>Carbon Impact</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map(p => (
              <tr key={p.id}>
                <td className="font-medium">{p.name}</td>
                <td>{fmtCurrency(p.price)}</td>
                <td>{p.carbonImpact} kg</td>
                <td><EcoBadge certified={p.ecoCertified} requested={p.ecoRequested}/></td>
                <td className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="btn btn-ghost btn-xs">
                    <Edit2 size={14}/>
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="btn btn-ghost btn-xs text-error">
                    <Trash2 size={14}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">{editing ? 'Edit' : 'Add'} Product</h3>
              <button onClick={() => setModal(false)} className="btn btn-ghost btn-sm btn-circle">
                <X size={18}/>
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-3">
              {[
                ['name','Product Name','text'],
                ['details','Description','text'],
                ['price','Price (₹)','number'],
                ['carbonImpact','Carbon Impact (kg)','number'],
                ['imageUrl','Image URL','url'],
              ].map(([field, label, type]) => (
                <label key={field} className="form-control">
                  <div className="label"><span className="label-text">{label}</span></div>
                  <input className="input input-bordered input-sm" type={type}
                    value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
                </label>
              ))}

              <label className="cursor-pointer flex items-center gap-3 mt-2">
                <input type="checkbox" className="toggle toggle-success"
                  checked={form.ecoRequested}
                  onChange={e => setForm(f => ({ ...f, ecoRequested: e.target.checked }))} />
                <span className="label-text font-medium">Request Eco Certification</span>
              </label>

              <div className="modal-action mt-4">
                <button type="button" onClick={() => setModal(false)} className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-primary text-white">Save</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setModal(false)}/>
        </dialog>
      )}
    </div>
  )
}
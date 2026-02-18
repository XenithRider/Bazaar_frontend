import { AlertCircle } from 'lucide-react'

export default function ErrorAlert({ message, onRetry }) {
  return (
    <div className="alert alert-error max-w-lg mx-auto my-8">
      <AlertCircle size={20} />
      <div>
        <h3 className="font-bold">Something went wrong</h3>
        <p className="text-sm">{message}</p>
      </div>
      {onRetry && (
        <button className="btn btn-sm btn-ghost" onClick={onRetry}>Retry</button>
      )}
    </div>
  )
}
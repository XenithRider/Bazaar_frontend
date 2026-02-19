export default function EcoBadge({ certified, requested }) {
  if (certified)
    return <span className="badge badge-success gap-1 text-xs font-semibold">🌿 Eco Certified</span>
  if (requested)
    return <span className="badge badge-warning gap-1 text-xs">⏳ Pending Eco</span>
  return <span className="badge badge-ghost text-xs">Standard</span>
}
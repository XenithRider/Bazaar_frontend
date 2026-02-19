export default function StatCard({ title, value, desc, icon, color = 'primary' }) {
  return (
    <div className={`stat bg-base-100 rounded-2xl shadow border border-base-200`}>
      <div className={`stat-figure text-${color}`}>{icon}</div>
      <div className="stat-title text-base-content/60">{title}</div>
      <div className={`stat-value text-${color} text-2xl`}>{value}</div>
      {desc && <div className="stat-desc">{desc}</div>}
    </div>
  )
}
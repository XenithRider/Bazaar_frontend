export default function EmptyState({ icon = '🌿', title, subtitle, action }) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
        <span className="text-6xl">{icon}</span>
        <h3 className="text-xl font-semibold text-base-content">{title}</h3>
        {subtitle && <p className="text-base-content/60 max-w-xs">{subtitle}</p>}
        {action}
      </div>
    )
  }
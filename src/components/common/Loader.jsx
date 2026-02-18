export default function Loader({ text = 'Loading…' }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-base-content/60 text-sm">{text}</p>
      </div>
    )
  }
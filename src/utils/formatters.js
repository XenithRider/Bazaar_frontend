export const fmtCurrency = (n) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n ?? 0)
  
  export const fmtCarbon = (n) => `${(n ?? 0).toFixed(2)} kg CO₂`
  
  export const fmtDate = (d) =>
    d ? new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(d)) : '—'
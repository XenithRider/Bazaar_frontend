import { useState, useEffect } from 'react'

export function useFetch(apiFn, deps = []) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const refetch = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiFn()
      setData(res.data)
    } catch (e) {
      setError(e.response?.data?.message ?? e.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refetch() }, deps)

  return { data, loading, error, refetch }
}
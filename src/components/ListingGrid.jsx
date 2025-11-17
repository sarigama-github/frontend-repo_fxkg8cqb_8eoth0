import { useEffect, useState } from 'react'
import ListingCard from './ListingCard'

function ListingGrid({ filters }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async (payload = {}) => {
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: payload.city || filters.city || undefined,
          min_price: payload.min_price ?? filters.min_price ?? undefined,
          max_price: payload.max_price ?? filters.max_price ?? undefined,
          limit: 30,
        })
      })
      if (res.ok) {
        const data = await res.json()
        setItems(data.items || [])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load({}) }, [])
  useEffect(() => { load(filters) }, [filters.city, filters.min_price, filters.max_price])

  if (loading) return <p className="text-blue-200">Loading listings…</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.length === 0 ? (
        <div className="col-span-full text-center text-blue-200/80">No listings found. Try adjusting filters.</div>
      ) : (
        items.map((it) => <ListingCard key={it.id} listing={it} />)
      )}
    </div>
  )
}

export default ListingGrid

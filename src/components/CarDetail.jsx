import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function CarDetail() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/listings/${id}`)
        if (!res.ok) throw new Error('Failed to load')
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError('Unable to load listing')
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  if (loading) return <div className="min-h-screen bg-slate-950 text-blue-200 flex items-center justify-center">Loading…</div>
  if (error) return <div className="min-h-screen bg-slate-950 text-blue-200 flex items-center justify-center">{error}</div>
  if (!data) return null

  const title = data?.car ? `${data.car.make} ${data.car.model}` : 'Car'
  const images = data?.car?.photos?.length ? data.car.photos : [
    'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl">RAKB</Link>
          <div className="text-blue-200/80 text-sm">{data.city}</div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="aspect-video overflow-hidden rounded-xl border border-white/10">
              <img src={images[0]} alt={title} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {images.slice(1, 4).map((src, i) => (
                  <div key={i} className="aspect-video overflow-hidden rounded-lg border border-white/10">
                    <img src={src} alt={title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-1 bg-white/5 border border-white/10 rounded-xl p-5 h-max">
            <h1 className="text-white text-2xl font-semibold">{title}</h1>
            <p className="text-blue-200/80 mt-1">{data.description || 'Comfortable, clean, and ready for your next trip.'}</p>

            <div className="mt-4 space-y-2 text-sm text-blue-200/90">
              <div className="flex items-center justify-between"><span>City</span><span className="text-white">{data.city}</span></div>
              <div className="flex items-center justify-between"><span>Daily price</span><span className="text-blue-300 font-semibold">{data.daily_price} MAD</span></div>
            </div>

            <div className="mt-6">
              <h3 className="text-white font-medium mb-2">Car specs</h3>
              <ul className="text-blue-200/90 text-sm grid grid-cols-2 gap-2">
                <li>Year: <span className="text-white">{data.car?.year || '—'}</span></li>
                <li>Transmission: <span className="text-white">{data.car?.transmission || '—'}</span></li>
                <li>Fuel: <span className="text-white">{data.car?.fuel || '—'}</span></li>
                <li>Seats: <span className="text-white">{data.car?.seats || '—'}</span></li>
              </ul>

              {data.car?.features?.length ? (
                <div className="mt-3">
                  <h4 className="text-white text-sm font-medium mb-1">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.car.features.map((f) => (
                      <span key={f} className="px-2 py-1 rounded bg-blue-500/10 text-blue-200 text-xs border border-blue-400/20">{f}</span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <button className="mt-6 w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">Request booking</button>
            <p className="text-xs text-blue-300/70 mt-2">Select dates and confirm on the next step.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetail

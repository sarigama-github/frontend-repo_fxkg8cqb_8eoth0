import { useEffect, useState } from 'react'

function Hero({ onSearch }) {
  const [city, setCity] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [cities, setCities] = useState([])

  useEffect(() => {
    const loadCities = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/cities`)
        if (res.ok) {
          const data = await res.json()
          setCities(data.items || [])
        }
      } catch {}
    }
    loadCities()
  }, [])

  const submit = (e) => {
    e.preventDefault()
    onSearch({ city, min_price: minPrice ? Number(minPrice) : undefined, max_price: maxPrice ? Number(maxPrice) : undefined })
  }

  return (
    <div className="relative z-10 max-w-5xl mx-auto text-center py-16">
      <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">RAKB</h1>
      <p className="text-blue-200/90 text-lg md:text-xl mb-8">Rent cars from trusted owners across Morocco</p>

      <form onSubmit={submit} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-3">
        <select value={city} onChange={(e)=>setCity(e.target.value)} className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-800">
          <option value="">All cities</option>
          {cities.map((c)=> (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input type="number" placeholder="Min price (MAD)" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-800" />
        <input type="number" placeholder="Max price (MAD)" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-800" />
        <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">Search</button>
      </form>
    </div>
  )
}

export default Hero

import { useState } from 'react'
import Hero from './components/Hero'
import ListingGrid from './components/ListingGrid'

function App() {
  const [filters, setFilters] = useState({})

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.12),transparent_35%)]" />

      <div className="relative px-6 md:px-10 py-8">
        <nav className="flex items-center justify-between">
          <div className="text-white font-bold text-xl tracking-wide">RAKB</div>
          <div className="text-blue-200/80 text-sm">Morocco car rentals, made simple</div>
        </nav>

        <Hero onSearch={(q)=>setFilters({ city: q.city, min_price: q.min_price, max_price: q.max_price })} />

        <div className="max-w-6xl mx-auto mt-8">
          <ListingGrid filters={filters} />
        </div>

        <footer className="mt-16 text-center text-blue-300/70 text-sm">
          © {new Date().getFullYear()} RAKB • Built for Morocco
        </footer>
      </div>
    </div>
  )
}

export default App

import { Link } from 'react-router-dom'

function ListingCard({ listing }) {
  const { city, daily_price, description, car, id } = listing
  const title = car ? `${car.make} ${car.model}` : 'Car'
  const img = (car && car.photos && car.photos[0]) || 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop'

  return (
    <Link to={`/listing/${id}`} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-blue-400/40 transition block">
      <div className="aspect-video w-full overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-white font-semibold">{title}</h3>
          <span className="text-blue-300 font-bold">{daily_price} MAD/day</span>
        </div>
        <p className="text-blue-200/80 text-sm line-clamp-2">{description || 'Comfortable, clean, and ready for your next trip.'}</p>
        <p className="text-xs text-blue-300/70 mt-2">{city}</p>
      </div>
    </Link>
  )
}

export default ListingCard

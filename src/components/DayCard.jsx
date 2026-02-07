import { Link } from 'react-router-dom'

const fallbackImages = [
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
  'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800',
]

export default function DayCard({ day }) {
  const imgUrl = day.heroImage?.url || fallbackImages[day.day % fallbackImages.length]

  return (
    <Link
      to={`/day/${day.day}`}
      className="block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={imgUrl}
          alt={day.heroImage?.alt || day.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-sunset-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          Day {day.day}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{day.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{day.area}</p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{day.summary}</p>
      </div>
    </Link>
  )
}

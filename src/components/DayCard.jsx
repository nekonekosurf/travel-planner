import { Link } from 'react-router-dom'

export default function DayCard({ day }) {
  return (
    <Link
      to={`/day/${day.day}`}
      className="block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
    >
      {day.heroImage?.url && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={day.heroImage.url}
            alt={day.heroImage.alt || day.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-sunset-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Day {day.day}
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{day.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{day.area}</p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{day.summary}</p>
      </div>
    </Link>
  )
}

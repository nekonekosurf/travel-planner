import { Link } from 'react-router-dom'
import tripData from '../../data/trip.json'
import HeroImage from '../components/HeroImage'
import DayCard from '../components/DayCard'

export default function Home() {
  const { meta, routeOverview, days } = tripData

  return (
    <div>
      <HeroImage
        url={routeOverview.mapImageUrl || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800'}
        alt="インドネシアの風景"
        overlay
      >
        <h1 className="text-2xl sm:text-3xl font-black leading-tight">
          {meta.title}
        </h1>
        <p className="text-sm mt-2 opacity-90">
          {meta.startCity} → {meta.endCity}｜{meta.totalDays}日間
        </p>
      </HeroImage>

      <div className="px-4 py-6">
        {routeOverview.summary && (
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {routeOverview.summary}
          </p>
        )}

        <h2 className="text-lg font-bold text-gray-800 mb-4">旅のスケジュール</h2>

        {days.length > 0 ? (
          <div className="grid gap-4">
            {days.map((day) => (
              <DayCard key={day.day} day={day} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-8">
            準備中...
          </p>
        )}

        <Link
          to="/info"
          className="mt-6 block bg-ocean-600 text-white text-center rounded-xl py-3 text-sm font-medium hover:bg-ocean-700 transition-colors"
        >
          実用情報を見る（ビザ・通貨・持ち物など）
        </Link>
      </div>
    </div>
  )
}

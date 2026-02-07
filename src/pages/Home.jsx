import { Link } from 'react-router-dom'
import tripData from '../../data/trip.json'
import HeroImage from '../components/HeroImage'
import DayCard from '../components/DayCard'

const typeIcons = {
  transit: '🚂',
  nature: '🌿',
  beach: '🏖️',
  culture: '🏛️',
}

export default function Home() {
  const { meta, routeOverview, days } = tripData

  return (
    <div>
      <HeroImage
        url={routeOverview.mapImageUrl || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800'}
        alt="インドネシアの風景"
        overlay
      >
        <p className="text-xs font-medium tracking-widest uppercase opacity-80 mb-1">
          {meta.totalDays}日間の冒険
        </p>
        <h1 className="text-2xl sm:text-3xl font-black leading-tight">
          {meta.title}
        </h1>
        {meta.subtitle && (
          <p className="text-sm mt-2 opacity-90 italic">{meta.subtitle}</p>
        )}
      </HeroImage>

      <div className="px-4 py-6">
        {routeOverview.summary && (
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {routeOverview.summary}
          </p>
        )}

        {routeOverview.highlights?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-sunset-600 uppercase tracking-wide mb-3">
              この旅のハイライト
            </h2>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {routeOverview.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 bg-white border border-sand-200 rounded-xl px-3 py-2 text-xs text-gray-700 shadow-sm max-w-[200px]"
                >
                  {h}
                </div>
              ))}
            </div>
          </div>
        )}

        {routeOverview.route?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3">ルート概要</h2>
            <div className="bg-white rounded-2xl border border-sand-200 shadow-sm overflow-hidden">
              {routeOverview.route.map((r, i) => {
                const hasDetail = days.find((d) => d.day === r.day)
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      i < routeOverview.route.length - 1 ? 'border-b border-sand-100' : ''
                    } ${hasDetail ? '' : 'opacity-50'}`}
                  >
                    <span className="text-lg">{typeIcons[r.type] || '📍'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-sunset-600">Day {r.day}</span>
                        <span className="text-sm text-gray-700 truncate">{r.area}</span>
                      </div>
                    </div>
                    {hasDetail ? (
                      <Link to={`/day/${r.day}`} className="text-xs text-ocean-600 font-medium flex-shrink-0">
                        詳細 →
                      </Link>
                    ) : (
                      <span className="text-xs text-gray-300 flex-shrink-0">準備中</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
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

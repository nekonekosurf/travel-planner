import { useParams, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import tripData from '../../data/trip.json'
import HeroImage from '../components/HeroImage'
import Timeline from '../components/Timeline'
import FoodSection from '../components/FoodSection'
import AccommodationCard from '../components/AccommodationCard'
import TransportInfo from '../components/TransportInfo'

export default function DayDetail() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const dayNum = parseInt(id, 10)
  const day = tripData.days.find((d) => d.day === dayNum)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  if (!day) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="text-gray-400 text-sm">このページはまだ準備中です</p>
        <Link to="/" className="text-ocean-600 text-sm mt-4 inline-block">
          ホームに戻る
        </Link>
      </div>
    )
  }

  const prevDay = tripData.days.find((d) => d.day === dayNum - 1)
  const nextDay = tripData.days.find((d) => d.day === dayNum + 1)

  return (
    <div>
      <HeroImage
        url={day.heroImage?.url || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800'}
        alt={day.heroImage?.alt || day.title}
        overlay
      >
        <span className="text-xs font-bold bg-sunset-600 px-3 py-1 rounded-full inline-block mb-2">
          Day {day.day}
        </span>
        <h1 className="text-2xl font-black">{day.title}</h1>
        <p className="text-sm opacity-90 mt-1">{day.area}</p>
      </HeroImage>

      <div className="px-4 py-6">
        <p className="text-sm text-gray-700 leading-relaxed">{day.summary}</p>

        {day.areaInfo && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {day.areaInfo.walkable !== undefined && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-400 block">徒歩圏内</span>
                <span className="text-sm font-medium">
                  {day.areaInfo.walkable ? 'OK' : '要移動'}
                </span>
                {day.areaInfo.walkableNote && (
                  <span className="text-xs text-gray-500 block">{day.areaInfo.walkableNote}</span>
                )}
              </div>
            )}
            {day.areaInfo.safety && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-400 block">治安</span>
                <span className="text-xs font-medium">{day.areaInfo.safety}</span>
              </div>
            )}
            {day.areaInfo.atm && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-400 block">ATM</span>
                <span className="text-xs font-medium">{day.areaInfo.atm}</span>
              </div>
            )}
            {day.areaInfo.convenience && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-400 block">コンビニ</span>
                <span className="text-xs font-medium">{day.areaInfo.convenience}</span>
              </div>
            )}
            {day.areaInfo.transportNeeded && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-400 block">交通手段</span>
                <span className="text-xs font-medium">{day.areaInfo.transportNeeded}</span>
              </div>
            )}
            {day.areaInfo.wifi && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-400 block">WiFi/通信</span>
                <span className="text-xs font-medium">{day.areaInfo.wifi}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {day.timeline && (
        <div className="px-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">今日の行程</h3>
          <Timeline items={day.timeline} />
        </div>
      )}

      <FoodSection food={day.food} />
      <AccommodationCard accommodation={day.accommodation} />
      <TransportInfo transport={day.transport} />

      <div className="px-4 py-6 flex gap-3">
        {prevDay && (
          <Link
            to={`/day/${prevDay.day}`}
            className="flex-1 text-center bg-sand-100 rounded-xl py-3 text-sm font-medium text-gray-700"
          >
            ← Day {prevDay.day}
          </Link>
        )}
        {nextDay && (
          <Link
            to={`/day/${nextDay.day}`}
            className="flex-1 text-center bg-sunset-600 rounded-xl py-3 text-sm font-medium text-white"
          >
            Day {nextDay.day} →
          </Link>
        )}
      </div>
    </div>
  )
}

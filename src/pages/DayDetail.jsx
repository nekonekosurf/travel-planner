import { useParams, Link, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import tripData from '../../data/trip.json'
import HeroImage from '../components/HeroImage'
import SafetyAlerts from '../components/SafetyAlerts'
import Timeline from '../components/Timeline'
import FoodSection from '../components/FoodSection'
import AccommodationCard from '../components/AccommodationCard'
import TransportInfo from '../components/TransportInfo'
import RouteMap from '../components/RouteMap'

const sections = [
  { id: 'map', label: '地図' },
  { id: 'schedule', label: '行程' },
  { id: 'food', label: '食事' },
  { id: 'stay', label: '宿泊' },
  { id: 'transport', label: '移動' },
]

export default function DayDetail() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const dayNum = parseInt(id, 10)
  const day = tripData.days.find((d) => d.day === dayNum)
  const [activeSection, setActiveSection] = useState('map')
  const sectionRefs = useRef({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    )
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [day])

  const scrollToSection = useCallback((sectionId) => {
    const el = sectionRefs.current[sectionId]
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 52
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [])

  const mapSpots = useMemo(() => {
    if (!day?.timeline) return []
    return day.timeline
      .filter((item) => item.location?.lat && item.location?.lng)
      .map((item) => ({
        name: item.title,
        lat: item.location.lat,
        lng: item.location.lng,
        googleMapsUrl: item.location.googleMapsUrl,
      }))
  }, [day])

  const mapPois = useMemo(() => {
    if (!day) return []
    const pois = []
    day.food?.restaurants?.forEach((r) => {
      const url = r.location?.googleMapsUrl
      if (!url) return
      const match = url.match(/q=([-\d.]+),([-\d.]+)/)
      if (match) {
        pois.push({
          name: r.name,
          type: 'restaurant',
          lat: parseFloat(match[1]),
          lng: parseFloat(match[2]),
          detail: r.type,
          googleMapsUrl: url,
        })
      }
    })
    day.accommodation?.recommendations?.forEach((h) => {
      const url = h.location?.googleMapsUrl
      if (!url) return
      const match = url.match(/q=([-\d.]+),([-\d.]+)/)
      if (match) {
        pois.push({
          name: h.name,
          type: 'hotel',
          lat: parseFloat(match[1]),
          lng: parseFloat(match[2]),
          detail: h.bookingTip,
          googleMapsUrl: url,
        })
      }
    })
    // City POIs (convenience stores, ATMs, cafes, etc.)
    day.cityPois?.forEach((p) => {
      pois.push({
        name: p.name,
        type: p.type,
        lat: p.lat,
        lng: p.lng,
        detail: p.description,
      })
    })
    return pois
  }, [day])

  const dayAlerts = useMemo(() => {
    if (!tripData.routeOverview?.safetyAlerts) return []
    return tripData.routeOverview.safetyAlerts.filter((a) =>
      a.spot?.includes(`Day ${dayNum}`)
    )
  }, [dayNum])

  if (!day) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="text-gray-500 text-sm">このページはまだ準備中です</p>
        <Link to="/" className="text-ocean-600 text-sm mt-4 inline-block">
          ホームに戻る
        </Link>
      </div>
    )
  }

  const prevDay = tripData.days.find((d) => d.day === dayNum - 1)
  const nextDay = tripData.days.find((d) => d.day === dayNum + 1)
  return (
    <div className="pb-14">
      <HeroImage
        url={day.heroImage?.url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Kawah_Putih_from_the_bottom%2C_Bandung_Regency%2C_2014-08-21.jpg/960px-Kawah_Putih_from_the_bottom%2C_Bandung_Regency%2C_2014-08-21.jpg'}
        alt={day.heroImage?.alt || day.title}
        overlay
      >
        <span className="text-xs font-bold bg-sunset-600 px-3 py-1 rounded-full inline-block mb-2">
          Day {day.day}
        </span>
        <h1 className="text-2xl font-black">{day.title}</h1>
        <p className="text-sm opacity-90 mt-1">{day.area}</p>
      </HeroImage>

      {/* Sticky section nav */}
      <nav className="sticky top-0 z-30 bg-white border-b border-sand-200 shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={`flex-shrink-0 px-4 py-3 text-xs font-medium border-b-2 transition-colors ${
                activeSection === s.id
                  ? 'border-sunset-600 text-sunset-600'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {dayAlerts.length > 0 && <SafetyAlerts alerts={dayAlerts} className="px-4 pt-4" />}

      <div className="px-4 py-4">
        <p className="text-sm text-gray-700 leading-relaxed">{day.summary}</p>

        {dayNum === 1 && (
          <Link
            to="/airport"
            className="mt-3 flex items-center gap-3 bg-ocean-50 border border-ocean-200 rounded-xl p-3"
          >
            <span className="w-10 h-10 bg-ocean-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-lg">✈</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-ocean-800">空港→市内 移動ガイド</p>
              <p className="text-xs text-gray-600">電車・バス・タクシーの比較、始発/終電、切符の買い方</p>
            </div>
            <span className="text-ocean-600 text-sm">&rarr;</span>
          </Link>
        )}

        {day.areaInfo && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {day.areaInfo.walkable !== undefined && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-500 block">徒歩圏内</span>
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
                <span className="text-xs text-gray-500 block">治安</span>
                <span className="text-xs font-medium">{day.areaInfo.safety}</span>
              </div>
            )}
            {day.areaInfo.atm && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-500 block">ATM</span>
                <span className="text-xs font-medium">{day.areaInfo.atm}</span>
              </div>
            )}
            {day.areaInfo.convenience && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-500 block">コンビニ</span>
                <span className="text-xs font-medium">{day.areaInfo.convenience}</span>
              </div>
            )}
            {day.areaInfo.transportNeeded && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-500 block">交通手段</span>
                <span className="text-xs font-medium">{day.areaInfo.transportNeeded}</span>
              </div>
            )}
            {day.areaInfo.wifi && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-500 block">WiFi/通信</span>
                <span className="text-xs font-medium">{day.areaInfo.wifi}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map section */}
      <div id="map" ref={(el) => (sectionRefs.current.map = el)} className="px-4 pb-6">
        {mapSpots.length > 0 && (
          <>
            <h3 className="text-lg font-bold text-gray-800 mb-2">今日のルートマップ</h3>
            <RouteMap spots={mapSpots} pois={mapPois} height="350px" />
            <div className="mt-2 flex flex-wrap gap-1">
              {mapSpots.map((s, i) => (
                <span key={i} className="text-xs text-gray-500">
                  <span className="inline-flex items-center justify-center w-4 h-4 bg-sunset-600 text-white rounded-full text-[10px] font-bold mr-0.5">
                    {i + 1}
                  </span>
                  {s.name}
                  {i < mapSpots.length - 1 && <span className="mx-1 text-gray-500">&rarr;</span>}
                </span>
              ))}
            </div>
            {mapPois.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-500">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />食事</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-violet-600 inline-block" />宿泊</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />コンビニ</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-cyan-600 inline-block" />ATM</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-700 inline-block" />カフェ</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Schedule section */}
      {day.timeline && (
        <div id="schedule" ref={(el) => (sectionRefs.current.schedule = el)} className="px-4 pb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">今日の行程</h3>
          <Timeline items={day.timeline} />
        </div>
      )}

      {/* Food section */}
      <div id="food" ref={(el) => (sectionRefs.current.food = el)}>
        <FoodSection food={day.food} />
      </div>

      {/* Stay section */}
      <div id="stay" ref={(el) => (sectionRefs.current.stay = el)}>
        <AccommodationCard accommodation={day.accommodation} />
      </div>

      {/* Transport section */}
      <div id="transport" ref={(el) => (sectionRefs.current.transport = el)}>
        <TransportInfo transport={day.transport} />
      </div>

      {/* Day navigation */}
      <div className="px-4 py-6 flex gap-3">
        {prevDay && (
          <Link
            to={`/day/${prevDay.day}`}
            className="flex-1 text-center bg-sand-100 rounded-xl py-3 text-sm font-medium text-gray-700"
          >
            &larr; Day {prevDay.day}
          </Link>
        )}
        {nextDay && (
          <Link
            to={`/day/${nextDay.day}`}
            className="flex-1 text-center bg-sunset-600 rounded-xl py-3 text-sm font-medium text-white"
          >
            Day {nextDay.day} &rarr;
          </Link>
        )}
      </div>

    </div>
  )
}

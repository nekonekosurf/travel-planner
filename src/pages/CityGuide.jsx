import { useParams, Link, useLocation } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import tripData from '../../data/trip.json'
import RouteMap from '../components/RouteMap'

const poiTypeLabels = {
  restaurant: '食事',
  convenience: 'コンビニ',
  atm: 'ATM',
  cafe: 'カフェ',
  mall: 'モール',
  pharmacy: '薬局',
  landmark: '観光',
  transit: '交通',
}

const poiTypeColors = {
  restaurant: 'bg-emerald-600',
  convenience: 'bg-blue-600',
  atm: 'bg-cyan-600',
  cafe: 'bg-yellow-700',
  mall: 'bg-violet-600',
  pharmacy: 'bg-red-600',
  landmark: 'bg-pink-600',
  transit: 'bg-gray-600',
}

export default function CityGuide() {
  const { name } = useParams()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const cityData = tripData.cities?.[name]

  if (!cityData) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="text-gray-500 text-sm">この街のガイドはまだ準備中です</p>
        <Link to="/" className="text-ocean-600 text-sm mt-4 inline-block">
          ホームに戻る
        </Link>
      </div>
    )
  }

  const mapCenter = useMemo(() => {
    if (!cityData.pois?.length) return null
    return {
      name: cityData.name,
      lat: cityData.center.lat,
      lng: cityData.center.lng,
    }
  }, [cityData])

  const mapSpots = useMemo(() => {
    if (!cityData.landmarks?.length) return []
    return cityData.landmarks.map((l) => ({
      name: l.name,
      lat: l.lat,
      lng: l.lng,
    }))
  }, [cityData])

  const mapPois = useMemo(() => {
    if (!cityData.pois?.length) return []
    return cityData.pois.map((p) => ({
      name: p.name,
      type: p.type,
      lat: p.lat,
      lng: p.lng,
      detail: p.description,
    }))
  }, [cityData])

  // Group POIs by type
  const poiGroups = useMemo(() => {
    const groups = {}
    cityData.pois?.forEach((p) => {
      if (!groups[p.type]) groups[p.type] = []
      groups[p.type].push(p)
    })
    return groups
  }, [cityData])

  return (
    <div>
      <div className="bg-gradient-to-b from-ocean-700 to-ocean-600 px-4 py-8 text-white">
        {cityData.backLink && (
          <Link to={cityData.backLink} className="text-xs opacity-80 mb-2 inline-block">&larr; {cityData.backLinkLabel || '戻る'}</Link>
        )}
        <h1 className="text-2xl font-black">{cityData.name}</h1>
        <p className="text-sm opacity-90 mt-1">{cityData.subtitle}</p>
      </div>

      {/* City description */}
      <div className="px-4 py-4">
        <p className="text-sm text-gray-700 leading-relaxed">{cityData.description}</p>
      </div>

      {/* Area tips */}
      {cityData.areaTips?.length > 0 && (
        <div className="px-4 pb-4">
          <div className="bg-sand-50 rounded-2xl p-4 border border-sand-200">
            <h3 className="text-sm font-bold text-gray-700 mb-2">エリア情報</h3>
            {cityData.areaTips.map((tip, i) => (
              <p key={i} className="text-xs text-gray-600 mt-1 leading-relaxed">
                <span className="text-sunset-500 mr-1">&#9679;</span>{tip}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* City Map */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{cityData.name}マップ</h2>
        <RouteMap
          spots={mapSpots}
          pois={mapPois}
          height="400px"
        />
        {/* Legend */}
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-500">
          {Object.keys(poiGroups).map((type) => (
            <span key={type} className="flex items-center gap-1">
              <span className={`w-3 h-3 rounded-full ${poiTypeColors[type] || 'bg-gray-500'} inline-block`} />
              {poiTypeLabels[type] || type}
            </span>
          ))}
        </div>
      </div>

      {/* POI List by type */}
      <div className="px-4 pb-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-800">周辺スポット</h2>
        {Object.entries(poiGroups).map(([type, pois]) => (
          <div key={type}>
            <h3 className="text-sm font-bold text-gray-600 mb-2 flex items-center gap-1">
              <span className={`w-3 h-3 rounded-full ${poiTypeColors[type] || 'bg-gray-500'} inline-block`} />
              {poiTypeLabels[type] || type}
            </h3>
            <div className="space-y-2">
              {pois.map((p, i) => (
                <div key={i} className="bg-white rounded-xl p-3 border border-sand-200 shadow-sm">
                  <p className="text-sm font-bold text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{p.description}</p>
                  {p.googleMapsUrl && (
                    <a
                      href={p.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-ocean-600 mt-1 inline-block"
                    >
                      Google Mapsで見る
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Related days */}
      {cityData.relatedDays?.length > 0 && (
        <div className="px-4 pb-6">
          <h3 className="text-sm font-bold text-gray-600 mb-2">関連する日程</h3>
          <div className="flex gap-2">
            {cityData.relatedDays.map((d) => (
              <Link
                key={d}
                to={`/day/${d}`}
                className="bg-sunset-600 text-white rounded-xl px-4 py-2 text-sm font-medium"
              >
                Day {d}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 pb-8">
        <Link
          to="/"
          className="block bg-sand-100 text-gray-700 text-center rounded-xl py-3 text-sm font-medium"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  )
}

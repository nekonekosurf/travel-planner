import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default marker icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const numberIcon = (num) =>
  L.divIcon({
    className: '',
    html: `<div style="background:#ea580c;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)">${num}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })

const poiIcon = (type) => {
  const colors = { restaurant: '#059669', hotel: '#7c3aed', convenience: '#2563eb', atm: '#0891b2', cafe: '#a16207', mall: '#6d28d9', pharmacy: '#dc2626' }
  const labels = { restaurant: '🍽', hotel: '🏨', convenience: '🏪', atm: '💳', cafe: '☕', mall: '🛍', pharmacy: '💊' }
  return L.divIcon({
    className: '',
    html: `<div style="background:${colors[type] || '#6b7280'};width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,.3)">${labels[type] || '📍'}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

function FitBounds({ spots, pois }) {
  const map = useMap()
  useEffect(() => {
    const allPoints = [
      ...spots.map((s) => [s.lat, s.lng]),
      ...(pois || []).filter((p) => p.lat && p.lng).map((p) => [p.lat, p.lng]),
    ]
    if (allPoints.length > 1) {
      map.fitBounds(allPoints, { padding: [30, 30] })
    } else if (allPoints.length === 1) {
      map.setView(allPoints[0], 13)
    }
  }, [map, spots, pois])
  return null
}

export default function RouteMap({ spots, pois, height = '350px' }) {
  if (!spots || spots.length === 0) return null

  const validSpots = spots.filter((s) => s.lat && s.lng)
  if (validSpots.length === 0) return null

  const center = [
    validSpots.reduce((sum, s) => sum + s.lat, 0) / validSpots.length,
    validSpots.reduce((sum, s) => sum + s.lng, 0) / validSpots.length,
  ]

  const positions = validSpots.map((s) => [s.lat, s.lng])
  const validPois = (pois || []).filter((p) => p.lat && p.lng)

  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-sand-200" style={{ height }}>
      <MapContainer
        center={center}
        zoom={validSpots.length === 1 ? 13 : 10}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds spots={validSpots} pois={validPois} />
        {validSpots.map((spot, i) => (
          <Marker key={`spot-${i}`} position={[spot.lat, spot.lng]} icon={numberIcon(i + 1)}>
            <Popup>
              <strong className="text-sm">{spot.name}</strong>
              {spot.googleMapsUrl && (
                <a
                  href={spot.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-blue-600 mt-1"
                >
                  Google Mapsで開く
                </a>
              )}
            </Popup>
          </Marker>
        ))}
        {validPois.map((poi, i) => (
          <Marker key={`poi-${i}`} position={[poi.lat, poi.lng]} icon={poiIcon(poi.type)}>
            <Popup>
              <strong className="text-xs">{poi.name}</strong>
              {poi.detail && <span className="block text-xs text-gray-500">{poi.detail}</span>}
              {poi.googleMapsUrl && (
                <a
                  href={poi.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-blue-600 mt-1"
                >
                  Google Mapsで開く
                </a>
              )}
            </Popup>
          </Marker>
        ))}
        {positions.length > 1 && (
          <Polyline
            positions={positions}
            pathOptions={{ color: '#ea580c', weight: 3, dashArray: '8, 8', opacity: 0.7 }}
          />
        )}
      </MapContainer>
    </div>
  )
}

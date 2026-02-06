export default function AccommodationCard({ accommodation }) {
  if (!accommodation) return null

  const budgetLabel = { cheap: 'バックパッカー向け', mid: 'スタンダード', expensive: '快適ホテル' }

  return (
    <section className="px-4 py-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">泊まるところ</h3>

      <div className="space-y-3">
        {accommodation.recommendations?.map((hotel, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sand-200">
            {hotel.image?.url && (
              <img
                src={hotel.image.url}
                alt={hotel.image.alt || hotel.name}
                loading="lazy"
                className="w-full h-36 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-sm">{hotel.name}</h4>
                <span className="text-xs bg-sand-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {budgetLabel[hotel.budget] || hotel.budget}
                </span>
              </div>
              {hotel.pricePerNight && (
                <p className="text-sm text-sunset-600 font-medium">
                  1泊 {hotel.pricePerNight.idr?.toLocaleString()} Rp（¥{hotel.pricePerNight.jpy?.toLocaleString()}）
                </p>
              )}
              {hotel.bookingTip && (
                <p className="text-xs text-gray-500 mt-1">{hotel.bookingTip}</p>
              )}
              {hotel.location?.googleMapsUrl && (
                <a
                  href={hotel.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-ocean-600 mt-2 inline-block"
                >
                  地図を見る
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

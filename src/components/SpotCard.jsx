export default function SpotCard({ item, onClose }) {
  return (
    <div className="mt-3 bg-white rounded-2xl shadow-lg overflow-hidden border border-sand-200">
      {item.images?.map((img, i) => (
        <img
          key={i}
          src={img.url}
          alt={img.alt}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
      ))}

      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>

        {item.access && (
          <div className="bg-ocean-50 rounded-xl p-3">
            <h5 className="text-xs font-bold text-ocean-700 mb-2">アクセス</h5>
            <p className="text-sm text-gray-700">
              {item.access.from}から {item.access.method}（{item.access.duration}）
            </p>
            {item.access.cost && (item.access.cost.idr > 0 || item.access.cost.jpy > 0) && (
              <p className="text-sm font-medium text-gray-800 mt-1">
                {item.access.cost.idr?.toLocaleString()} Rp（約{item.access.cost.jpy?.toLocaleString()}円）
              </p>
            )}
            {item.access.steps && (
              <ol className="mt-2 space-y-1">
                {item.access.steps.map((step, i) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-2">
                    <span className="text-ocean-500 font-bold">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}

        {item.details && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            {item.details.fee && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-400 block">料金</span>
                <span className="font-medium">
                  {typeof item.details.fee === 'object'
                    ? `${item.details.fee.idr?.toLocaleString()} Rp（¥${item.details.fee.jpy?.toLocaleString()}）`
                    : item.details.fee}
                </span>
              </div>
            )}
            {item.details.hours && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-400 block">営業時間</span>
                <span className="font-medium">{item.details.hours}</span>
              </div>
            )}
            {item.details.bestTime && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-400 block">ベスト時間</span>
                <span className="font-medium">{item.details.bestTime}</span>
              </div>
            )}
            {item.details.duration && (
              <div className="bg-sand-100 rounded-lg p-2">
                <span className="text-xs text-gray-400 block">所要時間</span>
                <span className="font-medium">{item.details.duration}</span>
              </div>
            )}
          </div>
        )}

        {item.details?.tips && (
          <div className="bg-yellow-50 rounded-xl p-3">
            <h5 className="text-xs font-bold text-yellow-700 mb-2">Tips</h5>
            <ul className="space-y-1">
              {item.details.tips.map((tip, i) => (
                <li key={i} className="text-xs text-gray-700 flex gap-2">
                  <span className="text-yellow-500">&#9679;</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.location?.googleMapsUrl && (
          <a
            href={item.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-ocean-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-ocean-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Google Mapsで開く
          </a>
        )}

        <button
          onClick={onClose}
          className="w-full text-center text-sm text-gray-400 py-2"
        >
          閉じる
        </button>
      </div>
    </div>
  )
}

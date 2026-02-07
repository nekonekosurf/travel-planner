export default function TransportInfo({ transport }) {
  if (!transport) return null

  return (
    <section className="px-4 py-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">次の目的地への移動</h3>

      <div className="bg-ocean-50 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-ocean-600 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-800">{transport.to}へ</p>
            <p className="text-sm text-gray-600">{transport.method}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {transport.duration && (
            <div className="bg-white rounded-lg p-2">
              <span className="text-xs text-gray-400 block">所要時間</span>
              <span className="font-medium text-sm">{transport.duration}</span>
            </div>
          )}
          {transport.cost && (transport.cost.idr > 0 || transport.cost.jpy > 0) && (
            <div className="bg-white rounded-lg p-2">
              <span className="text-xs text-gray-400 block">費用</span>
              <span className="font-medium text-sm">
                {transport.cost.idr?.toLocaleString()} Rp（¥{transport.cost.jpy?.toLocaleString()}）
              </span>
            </div>
          )}
        </div>

        {transport.bookingInfo && (
          <p className="text-xs text-gray-600 bg-white rounded-lg p-2">
            <span className="font-bold text-ocean-700">予約: </span>{transport.bookingInfo}
          </p>
        )}

        {transport.steps?.length > 0 && (
          <div className="bg-white rounded-lg p-3">
            <h5 className="text-xs font-bold text-ocean-700 mb-2">手順</h5>
            <ol className="space-y-1">
              {transport.steps.map((step, i) => (
                <li key={i} className="text-xs text-gray-700 flex gap-2">
                  <span className="text-ocean-500 font-bold flex-shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {transport.tips?.length > 0 && (
          <div className="bg-yellow-50 rounded-lg p-3">
            <ul className="space-y-1">
              {transport.tips.map((tip, i) => (
                <li key={i} className="text-xs text-gray-700">&#9679; {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default function FoodSection({ food }) {
  if (!food) return null

  const budgetLabel = { cheap: '安い', mid: '中', expensive: '高い' }

  return (
    <section className="px-4 py-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">この街で食べたいもの</h3>

      {food.mustTry && (
        <div className="bg-sunset-50 rounded-2xl overflow-hidden mb-4">
          {food.mustTry.image?.url && (
            <img
              src={food.mustTry.image.url}
              alt={food.mustTry.image.alt || food.mustTry.dish}
              loading="lazy"
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-4">
            <span className="text-xs font-bold text-sunset-600 uppercase tracking-wide">必食の一品</span>
            <h4 className="font-bold text-lg mt-1">{food.mustTry.dish}</h4>
            <p className="text-sm text-gray-600 mt-1">{food.mustTry.description}</p>
          </div>
        </div>
      )}

      {food.localSpecialties?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {food.localSpecialties.map((item, i) => (
            <span
              key={i}
              className="bg-sand-100 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {food.restaurants?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-bold text-gray-700 text-sm">おすすめ店</h4>
          {food.restaurants.map((r, i) => (
            <div key={i} className="flex gap-3 bg-white rounded-xl p-3 shadow-sm border border-sand-200">
              {r.image?.url && (
                <img
                  src={r.image.url}
                  alt={r.image.alt || r.name}
                  loading="lazy"
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-sm truncate">{r.name}</h5>
                  <span className="text-xs bg-ocean-100 text-ocean-700 px-2 py-0.5 rounded-full flex-shrink-0">
                    {budgetLabel[r.budget] || r.budget}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{r.type}</p>
                {r.priceRange && (
                  <p className="text-xs text-gray-600 mt-1">
                    {r.priceRange.idr}（¥{r.priceRange.jpy}）
                  </p>
                )}
                {r.popular?.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    人気: {r.popular.join('、')}
                  </p>
                )}
                {r.location?.googleMapsUrl && (
                  <a
                    href={r.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-ocean-600 mt-1 inline-block"
                  >
                    地図を見る
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {food.safetyTips?.length > 0 && (
        <div className="mt-4 bg-yellow-50 rounded-xl p-3">
          <h4 className="text-xs font-bold text-yellow-700 mb-2">食の安全メモ</h4>
          <ul className="space-y-1">
            {food.safetyTips.map((tip, i) => (
              <li key={i} className="text-xs text-gray-700">&#9679; {tip}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

import { Link } from 'react-router-dom'
import tripData from '../../data/trip.json'

export default function Info() {
  const info = tripData.practicalInfo

  return (
    <div>
      <div className="bg-ocean-600 px-4 py-8 text-white">
        <h1 className="text-2xl font-black">実用情報</h1>
        <p className="text-sm opacity-90 mt-1">旅に必要な基本情報まとめ</p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {info.visa?.description && (
          <Section title="ビザ・入国" icon="passport">
            <p className="text-sm text-gray-700">{info.visa.description}</p>
            {info.visa.details?.map((d, i) => (
              <p key={i} className="text-xs text-gray-600 mt-1">&#9679; {d}</p>
            ))}
          </Section>
        )}

        {info.currency?.description && (
          <Section title="通貨・両替" icon="money">
            <p className="text-sm text-gray-700">{info.currency.description}</p>
            {info.currency.tips?.map((t, i) => (
              <p key={i} className="text-xs text-gray-600 mt-1">&#9679; {t}</p>
            ))}
          </Section>
        )}

        {info.sim?.description && (
          <Section title="SIMカード" icon="phone">
            <p className="text-sm text-gray-700">{info.sim.description}</p>
            {info.sim.carriers?.map((c, i) => (
              <div key={i} className="mt-2 bg-sand-100 rounded-lg p-2">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-gray-600">{c.plan} — {c.cost}</p>
              </div>
            ))}
          </Section>
        )}

        {info.electricity?.voltage && (
          <Section title="電圧・プラグ" icon="plug">
            <p className="text-sm text-gray-700">
              電圧: {info.electricity.voltage}　プラグ: {info.electricity.plugType}
            </p>
          </Section>
        )}

        {info.emergency?.embassy && (
          <Section title="緊急連絡先" icon="emergency">
            <div className="space-y-1 text-sm text-gray-700">
              <p>大使館: {info.emergency.embassy}</p>
              <p>警察: {info.emergency.police}</p>
              <p>救急車: {info.emergency.ambulance}</p>
            </div>
          </Section>
        )}

        {info.packing?.length > 0 && (
          <Section title="持ち物チェックリスト" icon="checklist">
            <div className="grid grid-cols-2 gap-1">
              {info.packing.map((item, i) => (
                <label key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" className="rounded" />
                  {item}
                </label>
              ))}
            </div>
          </Section>
        )}

        {info.phrases?.length > 0 && (
          <Section title="インドネシア語フレーズ" icon="language">
            <div className="space-y-2">
              {info.phrases.map((p, i) => (
                <div key={i} className="flex justify-between bg-sand-100 rounded-lg p-2">
                  <span className="text-sm text-gray-700">{p.ja}</span>
                  <span className="text-sm font-medium text-ocean-700">{p.id}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Link
          to="/"
          className="block bg-sunset-600 text-white text-center rounded-xl py-3 text-sm font-medium"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-sand-200">
      <h2 className="font-bold text-gray-800 mb-3">{title}</h2>
      {children}
    </div>
  )
}

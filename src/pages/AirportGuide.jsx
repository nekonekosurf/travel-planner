import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import RouteMap from '../components/RouteMap'

const transferOptions = [
  {
    id: 'train',
    name: 'KA Bandara（空港鉄道）',
    recommended: true,
    cost: 'Rp 30,000〜70,000（約280〜660円）',
    time: '約50分（BNI City駅まで）',
    schedule: '始発 05:57 / 終電 22:57 / 約30分間隔',
    trafficFree: true,
    summary: '渋滞ゼロで最も確実。Premium車両Rp30,000で快適。BNI City駅からGrabでガンビル駅へ4分。',
    steps: [
      '到着ロビーを出て「Skytrain」の案内標識に従う',
      'Skytrain（無料の自動運転モノレール）に乗車 → 約5分で鉄道駅に到着',
      '鉄道駅の下階へ降りる',
      '券売機でチケット購入（QRIS/カード払い。現金不可）',
      'Premium車両（Rp30,000）またはExecutive（Rp70,000）を選択',
      'BNI City駅で下車（約50分）',
      'BNI City駅を出てGrabアプリでガンビル駅へ（約4分、Rp15,000〜25,000）',
    ],
    tips: [
      '【重要】現金では切符を買えない。クレジットカードかQRIS決済が必要',
      'Access by KAIアプリで事前購入も可能（出発1時間前まで）',
      'Premium車両でも座席は広くて快適。Executive との差は軽食サービスの有無',
      'スカイトレインは全ターミナル共通。乗り間違えても問題なし',
    ],
  },
  {
    id: 'damri',
    name: 'DAMRIバス（ガンビル駅直行）',
    recommended: false,
    cost: 'Rp 80,000（約750円）',
    time: '45分〜2.5時間（渋滞次第）',
    schedule: '06:00〜23:00 / 約30分間隔',
    trafficFree: false,
    summary: 'ガンビル駅まで乗り換えなしの直行バス。ただしジャカルタの渋滞に完全に左右される。',
    steps: [
      'ターミナル3の到着ロビーを出て地上階へ',
      '「DAMRI」の案内標識に従いバス乗り場へ',
      'DAMRIカウンターでチケット購入（名前とパスポート番号が必要）',
      '「Gambir」行きのバスに乗車',
      'ガンビル駅前で下車',
    ],
    tips: [
      '2025年8月〜乗車時に名前・パスポート番号の提示が必要',
      'ラッシュアワー（7-10時、16-19時）は2時間以上かかることも',
      '深夜・早朝なら45分程度で到着',
      '現金・カード両方OK',
    ],
  },
  {
    id: 'grab',
    name: 'Grab（配車アプリ）',
    recommended: false,
    cost: 'Rp 245,000〜350,000（約2,300〜3,300円）',
    time: '40分〜2.5時間（渋滞次第）',
    schedule: '24時間',
    trafficFree: false,
    summary: 'ドアtoドアで最も楽。ただし高額で渋滞にもハマる。空港WiFiでアプリ利用可能。',
    steps: [
      '【出発前に必ず】日本でGrabアプリをダウンロードし、日本の電話番号でSMS認証を済ませておく',
      '到着ロビーを出て「Exit 2」方面へ進む',
      'Terminal 3 駐車場方面へ歩く',
      '「Shelter Kalayang Terminal 3」の看板を過ぎ、横断歩道を渡る',
      '左に曲がるとGrabのピックアップポイント（看板あり）',
      'アプリでGrabCarを配車（空港WiFiで利用可能）',
    ],
    tips: [
      '【最重要】Grabアプリは日本でSMS認証を完了しておくこと。現地SIMなしでも空港WiFiで配車できる',
      'ピックアップポイントまでドライバーが来るのに30分以上かかることがある',
      '深夜・早朝はサージ（割増）料金になることが多い',
      '空港WiFi「CGK Free WiFi」は遅いが、Grab配車には十分',
    ],
  },
  {
    id: 'taxi',
    name: 'Bluebird タクシー（メーター制）',
    recommended: false,
    cost: 'Rp 200,000〜265,000（約1,880〜2,490円）',
    time: '40分〜2.5時間（渋滞次第）',
    schedule: '24時間',
    trafficFree: false,
    summary: 'アプリ不要でSIMカードなしでもOK。公式タクシースタンドから乗れば安全。',
    steps: [
      'ターミナル3の到着ロビーにあるBluebirdカウンターを見つける',
      'Gate 2付近の券売機で整理券を取得',
      '指定のピックアップポイントで待機',
      '青いBluebird車両に乗車',
      'メーターが作動していることを確認',
      '「Stasiun Gambir」と伝える',
    ],
    tips: [
      '必ず青いBluebird（またはプレミアムの黒いGolden Bird）を利用',
      '到着ロビーで声をかけてくる「タクシー」は無許可業者。絶対に乗らない',
      'メーター料金 + 空港サーチャージRp8,000〜10,000 + 高速道路料金Rp15,000〜30,000',
      'SIMカードもアプリも不要で乗れるので、すべてが不安な時の最終手段として安心',
    ],
  },
]

const arrivalFlow = [
  { step: 1, title: '【出発前】e-VOA申請', desc: 'evisa.imigrasi.go.id で到着ビザ（Rp500,000）をオンライン申請。空港の長い列を回避できる', important: true },
  { step: 2, title: '【出発前】All Indonesia到着カード', desc: 'allindonesia.imigrasi.go.id で到着72時間以内に入力必須（2025年10月〜義務化）。QRコードがメールで届く', important: true },
  { step: 3, title: '【出発前】Grabアプリ登録', desc: '日本の電話番号でSMS認証を完了。現地SIMなしでもWiFiで配車できるようになる', important: true },
  { step: 4, title: '飛行機を降りる', desc: 'ターミナル3に到着。案内標識に従い入国審査へ進む' },
  { step: 5, title: 'VOA / 入国審査', desc: 'e-VOA取得済みなら直接入国審査へ。未取得ならVOAカウンター（BRI銀行）で支払い後に入国審査へ', important: false },
  { step: 6, title: '荷物受取', desc: 'バゲージクレーム（荷物受取所）でスーツケースをピックアップ' },
  { step: 7, title: 'SIMカード購入', desc: '到着ロビーのTelkomselカウンターで購入（Rp150,000〜200,000、パスポート提示）。24時間営業', important: false },
  { step: 8, title: 'ATMで現金引出し', desc: '到着ロビー地上階のATMコーナーへ。BCA銀行ATMがおすすめ（1回Rp2,500,000まで）' },
  { step: 9, title: '市内へ移動', desc: '下記の交通手段比較を見て移動開始！' },
]

const mapSpots = [
  { name: 'ターミナル3（到着）', lat: -6.1256, lng: 106.6559 },
  { name: 'Skytrain駅', lat: -6.1268, lng: 106.6530 },
  { name: 'KA Bandara駅', lat: -6.1280, lng: 106.6500 },
  { name: 'BNI City駅', lat: -6.2155, lng: 106.8230 },
  { name: 'ガンビル駅', lat: -6.1766, lng: 106.8303 },
]

export default function AirportGuide() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <div className="bg-gradient-to-b from-ocean-700 to-ocean-600 px-4 py-8 text-white">
        <Link to="/day/1" className="text-xs opacity-80 mb-2 inline-block">&larr; Day 1に戻る</Link>
        <h1 className="text-2xl font-black">空港→市内 移動ガイド</h1>
        <p className="text-sm opacity-90 mt-1">スカルノハッタ空港（CGK）→ ガンビル駅</p>
        <p className="text-xs opacity-70 mt-2">SIMカードなしでも使えるように、このページを出発前にスクリーンショットで保存しておくと安心です</p>
      </div>

      {/* Arrival Flow */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">到着フロー（順番に進む）</h2>
        <div className="space-y-3">
          {arrivalFlow.map((item) => (
            <div
              key={item.step}
              className={`flex gap-3 ${item.important ? 'bg-sunset-50 border border-sunset-200' : 'bg-white border border-sand-200'} rounded-xl p-3`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                item.important ? 'bg-sunset-600 text-white' : 'bg-sand-200 text-gray-600'
              }`}>
                {item.step}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Route Map */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">ルートマップ</h2>
        <RouteMap spots={mapSpots} height="300px" />
        <p className="text-xs text-gray-500 mt-2 text-center">空港 → BNI City駅（鉄道50分）→ ガンビル駅（Grab 4分）</p>
      </div>

      {/* Comparison Table */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">交通手段の比較</h2>
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-xs border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-sand-100">
                <th className="text-left p-2 font-bold text-gray-700">手段</th>
                <th className="text-left p-2 font-bold text-gray-700">費用</th>
                <th className="text-left p-2 font-bold text-gray-700">所要時間</th>
                <th className="text-left p-2 font-bold text-gray-700">渋滞</th>
              </tr>
            </thead>
            <tbody>
              {transferOptions.map((opt) => (
                <tr key={opt.id} className={`border-t border-sand-200 ${opt.recommended ? 'bg-green-50' : ''}`}>
                  <td className="p-2">
                    {opt.recommended && <span className="text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded-full mr-1">推奨</span>}
                    {opt.name}
                  </td>
                  <td className="p-2">{opt.cost}</td>
                  <td className="p-2">{opt.time}</td>
                  <td className="p-2">{opt.trafficFree ? '影響なし' : '大きく影響'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Transfer Options */}
      <div className="px-4 pb-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-800">各交通手段の詳細</h2>
        {transferOptions.map((opt) => (
          <div
            key={opt.id}
            className={`rounded-2xl overflow-hidden border ${opt.recommended ? 'border-green-300 bg-green-50' : 'border-sand-200 bg-white'} shadow-sm`}
          >
            <div className={`px-4 py-3 ${opt.recommended ? 'bg-green-600 text-white' : 'bg-sand-100'}`}>
              <div className="flex items-center gap-2">
                {opt.recommended && <span className="text-xs bg-white text-green-700 px-2 py-0.5 rounded-full font-bold">おすすめ</span>}
                <h3 className={`font-bold text-sm ${opt.recommended ? 'text-white' : 'text-gray-800'}`}>{opt.name}</h3>
              </div>
              <p className={`text-xs mt-1 ${opt.recommended ? 'text-green-100' : 'text-gray-600'}`}>{opt.summary}</p>
            </div>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-sand-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500">費用</p>
                  <p className="text-xs font-bold">{opt.cost}</p>
                </div>
                <div className="bg-sand-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500">所要時間</p>
                  <p className="text-xs font-bold">{opt.time}</p>
                </div>
                <div className="bg-sand-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500">運行時間</p>
                  <p className="text-xs font-bold">{opt.schedule}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-700 mb-2">手順</p>
                <ol className="space-y-2">
                  {opt.steps.map((step, i) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-2">
                      <span className="text-ocean-600 font-bold flex-shrink-0">{i + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {opt.tips.length > 0 && (
                <div className="bg-yellow-50 rounded-xl p-3">
                  <p className="text-xs font-bold text-yellow-700 mb-1">注意点</p>
                  {opt.tips.map((tip, i) => (
                    <p key={i} className="text-xs text-gray-700 mt-1 leading-relaxed">
                      <span className="text-yellow-500 mr-1">&#9679;</span>{tip}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reference */}
      <div className="px-4 pb-6">
        <div className="bg-ocean-50 rounded-2xl p-4 border border-ocean-200">
          <h3 className="font-bold text-sm text-ocean-800 mb-2">空港で必要なURL（スクショ推奨）</h3>
          <div className="space-y-2 text-xs">
            <div>
              <p className="font-bold text-gray-700">e-VOA申請</p>
              <p className="text-ocean-600 break-all">evisa.imigrasi.go.id</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">All Indonesia到着カード（義務）</p>
              <p className="text-ocean-600 break-all">allindonesia.imigrasi.go.id</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">列車チケット予約</p>
              <p className="text-ocean-600 break-all">Access by KAI アプリ / tiket.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8">
        <Link
          to="/day/1"
          className="block bg-sunset-600 text-white text-center rounded-xl py-3 text-sm font-medium"
        >
          Day 1の行程に戻る
        </Link>
      </div>
    </div>
  )
}

# 旅行データ JSON構造定義

## ファイル: `data/trip.json`

---

## トップレベル構造

| フィールド | 型 | 説明 |
|---|---|---|
| `meta` | object | 旅行の基本情報 |
| `routeOverview` | object | ルート全体の概要 |
| `days` | array\<Day\> | 各日のデータ |
| `practicalInfo` | object | 実用情報（ビザ、通貨等） |

---

## meta（旅行メタ情報）

```json
{
  "title": "旅行プランのタイトル",
  "country": "国名",
  "startCity": "出発都市",
  "endCity": "到着都市",
  "totalDays": 10,
  "currency": {
    "code": "IDR",
    "symbol": "Rp",
    "rateToJPY": 0.0094
  },
  "travelerProfile": {
    "origin": "東京",
    "firstVisit": true,
    "preferences": ["自然", "海"]
  },
  "lastUpdated": "2026-02-06"
}
```

---

## Day（日別データ）

```json
{
  "day": 1,
  "date": "2026-03-01",
  "title": "その日のタイトル",
  "area": "滞在エリア名",
  "heroImage": {
    "url": "画像URL",
    "alt": "説明テキスト",
    "credit": "クレジット"
  },
  "summary": "その日の概要テキスト",
  "areaInfo": { ... },
  "timeline": [ ... ],
  "food": { ... },
  "accommodation": { ... },
  "shopping": { ... },
  "transport": { ... }
}
```

---

## areaInfo（エリア情報）

```json
{
  "walkable": true,
  "walkableNote": "中心部は徒歩圏内",
  "transportNeeded": "郊外はGrab必須",
  "atm": "コンビニ内にBCA/BNI ATMあり",
  "wifi": "カフェ・ホテルでWiFi利用可",
  "sim": "Telkomselショップで購入可",
  "safety": "日中は安全。夜間は大通りを歩くこと",
  "convenience": "Indomaret、Alfamartが点在"
}
```

---

## timeline（タイムライン）

配列。各エントリは1つのアクティビティ/スポット。

```json
{
  "time": "08:00",
  "period": "morning",
  "type": "spot | transport | meal | activity",
  "title": "スポット名",
  "description": "詳細説明",
  "images": [
    { "url": "...", "alt": "...", "credit": "..." }
  ],
  "location": {
    "name": "場所名",
    "googleMapsUrl": "https://maps.google.com/...",
    "lat": -6.123,
    "lng": 106.456
  },
  "access": {
    "from": "前のスポット名",
    "method": "Grab（配車アプリ）",
    "duration": "30分",
    "cost": { "idr": 50000, "jpy": 470 },
    "steps": ["Grabアプリを開く", "目的地を入力", "GrabCarを選択"]
  },
  "details": {
    "fee": { "idr": 30000, "jpy": 282 },
    "hours": "08:00-17:00",
    "bestTime": "早朝がおすすめ",
    "duration": "1-2時間",
    "tips": ["靴は滑りにくいものを", "日焼け止め必須"]
  }
}
```

---

## food（食事情報）

```json
{
  "localSpecialties": ["ナシゴレン", "サテ"],
  "mustTry": {
    "dish": "一品推薦",
    "description": "説明",
    "image": { "url": "...", "alt": "..." }
  },
  "restaurants": [
    {
      "name": "店名",
      "type": "ワルン",
      "budget": "cheap | mid | expensive",
      "priceRange": { "idr": "15000-30000", "jpy": "141-282" },
      "popular": ["メニュー1", "メニュー2"],
      "location": { "googleMapsUrl": "..." },
      "image": { "url": "...", "alt": "..." }
    }
  ],
  "drinks": ["コピ・ルアク", "エス・ジェルク"],
  "safetyTips": ["氷入り飲料は店を選んで", "屋台は火が通ったものを"]
}
```

---

## accommodation（宿泊情報）

```json
{
  "area": "エリア名",
  "recommendations": [
    {
      "name": "宿名",
      "budget": "cheap | mid | expensive",
      "pricePerNight": { "idr": 200000, "jpy": 1880 },
      "bookingTip": "Booking.comで予約がおすすめ",
      "location": { "googleMapsUrl": "..." },
      "image": { "url": "...", "alt": "..." }
    }
  ]
}
```

---

## shopping（買い物・お土産）

```json
{
  "famous": ["バティック", "コーヒー豆"],
  "priceGuide": "バティック布は50,000-200,000 Rp程度",
  "shops": [
    {
      "name": "店名・市場名",
      "description": "説明",
      "location": { "googleMapsUrl": "..." }
    }
  ]
}
```

---

## transport（次の目的地への移動）

```json
{
  "to": "次のエリア名",
  "method": "電車（Argo Wilis）",
  "duration": "3時間",
  "cost": { "idr": 150000, "jpy": 1410 },
  "bookingInfo": "tiket.comで事前予約可",
  "steps": ["ガンビル駅へ移動", "電車に乗車", "バンドン駅で下車"],
  "tips": ["エコノミーは混むのでビジネスクラス推奨"]
}
```

---

## practicalInfo（実用情報）

```json
{
  "visa": {
    "description": "VOA（到着ビザ）で30日滞在可",
    "details": ["パスポート残存6ヶ月以上", "費用: 500,000 IDR"]
  },
  "currency": {
    "description": "インドネシア・ルピア (IDR)",
    "tips": ["空港の両替は割高", "市内の公認両替所がベスト"]
  },
  "sim": {
    "description": "空港で購入可能",
    "carriers": [
      { "name": "Telkomsel", "plan": "Tourist SIM 15GB", "cost": "100,000 IDR" }
    ]
  },
  "electricity": { "voltage": "220V", "plugType": "Cタイプ" },
  "emergency": {
    "embassy": "在インドネシア日本大使館: +62-21-3192-4308",
    "police": "110",
    "ambulance": "118",
    "hospital": "各エリアの主要病院情報"
  },
  "packing": ["パスポート", "海外旅行保険証", "常備薬", "日焼け止め", "虫よけ"],
  "phrases": [
    { "ja": "ありがとう", "id": "Terima kasih" },
    { "ja": "いくらですか？", "id": "Berapa harganya?" }
  ]
}
```

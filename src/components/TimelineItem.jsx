import { useState } from 'react'
import SpotCard from './SpotCard'

const periodColors = {
  morning: 'bg-yellow-400',
  afternoon: 'bg-sunset-500',
  evening: 'bg-indigo-500',
}

const periodLabels = {
  morning: '朝',
  afternoon: '昼',
  evening: '夜',
}

export default function TimelineItem({ item, isLast }) {
  const [expanded, setExpanded] = useState(false)
  const dotColor = periodColors[item.period] || 'bg-gray-400'

  return (
    <div className={`relative ${isLast ? '' : 'pb-6'}`}>
      <div className={`absolute -left-5 top-1 w-3 h-3 rounded-full ${dotColor} ring-4 ring-sand-50`} />

      <div className="ml-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-gray-400">{item.time}</span>
          <span className="text-xs text-gray-400">{periodLabels[item.period]}</span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left"
        >
          <h4 className="font-bold text-gray-800">{item.title}</h4>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
        </button>

        {item.images?.[0] && !expanded && (
          <img
            src={item.images[0].url}
            alt={item.images[0].alt}
            loading="lazy"
            className="mt-3 rounded-xl w-full h-40 object-cover cursor-pointer"
            onClick={() => setExpanded(true)}
          />
        )}

        {expanded && <SpotCard item={item} onClose={() => setExpanded(false)} />}
      </div>
    </div>
  )
}

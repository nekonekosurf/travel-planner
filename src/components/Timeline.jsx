import TimelineItem from './TimelineItem'

export default function Timeline({ items }) {
  if (!items || items.length === 0) return null

  return (
    <div className="relative pl-8 py-4">
      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-sunset-200" />
      {items.map((item, index) => (
        <TimelineItem key={index} item={item} isLast={index === items.length - 1} />
      ))}
    </div>
  )
}

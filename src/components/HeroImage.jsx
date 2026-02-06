export default function HeroImage({ url, alt, overlay, children }) {
  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
      <img
        src={url}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      )}
      {children && (
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          {children}
        </div>
      )}
    </div>
  )
}

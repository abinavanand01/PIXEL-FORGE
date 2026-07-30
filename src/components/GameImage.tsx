import { getGameImageUrl } from "@/data/gameImages"

export default function GameImage({ gameId, title, className = "" }: { gameId: string; title: string; className?: string }) {
  const imageUrl = getGameImageUrl(gameId)

  return (
    <div className={`relative overflow-hidden bg-gray-900 ${className}`}>
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget
          target.style.display = "none"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  )
}

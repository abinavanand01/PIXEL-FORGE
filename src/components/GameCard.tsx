import { useNavigate } from "react-router-dom"
import type { Game } from "@/data/games"
import { getGameImageUrl } from "@/data/gameImages"

const platformIcons: Record<string, string> = {
  PC: "🖥", PS5: "🎮", PS4: "🎮", "Xbox Series X": "🎮", "Xbox One": "🎮", "Nintendo Switch": "🕹", Mobile: "📱",
}

export default function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  const navigate = useNavigate()
  const discount = game.salePrice ? Math.round(((game.price - game.salePrice) / game.price) * 100) : 0

  return (
    <div
      onClick={() => navigate(`/game/${game.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") navigate(`/game/${game.id}`) }}
      className="group cursor-pointer"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#0a0a0a] border border-white/[0.06] card-hover">
        <img
          src={getGameImageUrl(game.id)}
          alt={game.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-sm shadow-lg">
            -{discount}%
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/10">
          {game.rating}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-1.5 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            <span className="text-[10px] font-medium text-white/70">{game.genre}</span>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-1">
              {game.platforms.slice(0, 3).map((p) => (
                <span key={p} className="text-[10px]" title={p}>{platformIcons[p] || "💻"}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2.5 space-y-0.5">
        <h3 className="font-semibold text-sm text-white/90 truncate leading-tight group-hover:text-white transition-colors">
          {game.title}
        </h3>
        <div className="flex items-center gap-2">
          {game.salePrice ? (
            <>
              <span className="text-sm font-bold text-white">{game.salePrice.toFixed(2)} USD</span>
              <span className="text-[11px] text-white/40 line-through">{game.price.toFixed(2)} USD</span>
            </>
          ) : (
            <span className="text-sm font-bold text-white">{game.price.toFixed(2)} USD</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/40">
          <span>{game.releaseYear}</span>
          <span>•</span>
          <span className="capitalize">{game.difficulty.toLowerCase()}</span>
        </div>
      </div>
    </div>
  )
}

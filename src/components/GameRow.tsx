import { useRef, useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import type { Game } from "@/data/games"
import { getGameImageUrl } from "@/data/gameImages"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function GameRow({ title, games, linkUrl }: { title: string; games: Game[]; linkUrl?: string }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const navigate = useNavigate()

  const checkScroll = useCallback(() => {
    const el = rowRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    checkScroll()
    el.addEventListener("scroll", checkScroll)
    return () => el.removeEventListener("scroll", checkScroll)
  }, [checkScroll, games])

  const scroll = (dir: "left" | "right") => {
    const el = rowRef.current
    if (!el) return
    const amount = el.clientWidth * 0.7
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  if (games.length === 0) return null

  return (
    <section className="mb-8 md:mb-10">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-base md:text-lg font-bold text-white">{title}</h2>
          <span className="text-[11px] text-white/20">{games.length} games</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              canScrollLeft ? "bg-white/10 text-white/70 hover:bg-white/20" : "bg-white/[0.04] text-white/20 cursor-default"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              canScrollRight ? "bg-white/10 text-white/70 hover:bg-white/20" : "bg-white/[0.04] text-white/20 cursor-default"
            }`}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div
        ref={rowRef}
        className="flex gap-2.5 md:gap-3 overflow-x-auto scroll-smooth pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {games.map((game, i) => {
          const discount = game.salePrice ? Math.round(((game.price - game.salePrice) / game.price) * 100) : 0
          return (
            <div
              key={game.id}
              onClick={() => navigate(`/game/${game.id}`)}
              className="group flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/[0.06] transition-all duration-300 group-hover:border-red-500/30 group-hover:shadow-lg group-hover:shadow-red-500/10 group-hover:-translate-y-0.5">
                <img
                  src={getGameImageUrl(game.id)}
                  alt={game.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-lg z-10">
                    -{discount}%
                  </div>
                )}
                {game.price === 0 && (
                  <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-lg z-10">
                    FREE
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-medium px-2 py-0.5 rounded-full border border-white/10 z-10">
                  {game.rating}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="bg-yellow-500/20 text-yellow-400 text-[9px] font-semibold px-1.5 py-0.5 rounded">
                        {game.score}
                      </span>
                      <span className="text-[10px] text-white/60">{game.genre}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-white/40">
                      {game.platforms.slice(0, 2).map(p => (
                        <span key={p}>{p === "PC" ? "💻" : p.includes("PS") ? "🎮" : p.includes("Xbox") ? "🎮" : p === "Nintendo Switch" ? "🕹" : p}</span>
                      ))}
                      {game.platforms.length > 2 && <span>+{game.platforms.length - 2}</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 space-y-0.5 px-0.5">
                <h3 className="text-sm font-semibold text-white/90 truncate group-hover:text-white transition-colors">{game.title}</h3>
                <div className="flex items-center gap-1.5">
                  {game.salePrice ? (
                    <>
                      <span className="text-sm font-bold text-white">${game.salePrice.toFixed(2)}</span>
                      <span className="text-[10px] text-white/30 line-through">${game.price.toFixed(2)}</span>
                    </>
                  ) : game.price === 0 ? (
                    <span className="text-sm font-bold text-green-400">Free</span>
                  ) : (
                    <span className="text-sm font-bold text-white">${game.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

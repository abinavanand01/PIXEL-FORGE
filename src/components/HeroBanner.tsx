import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { games } from "@/data/games"
import { getGameImageUrl } from "@/data/gameImages"

const featured = games.filter(g => g.salePrice !== undefined || g.installed).slice(0, 6)

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  const next = useCallback(() => setCurrent((c) => (c + 1) % featured.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + featured.length) % featured.length), [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const game = featured[current]

  return (
    <div className="relative w-full h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden bg-black rounded-b-2xl">
      {featured.map((g, i) => (
        <div
          key={g.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <img
            src={getGameImageUrl(g.id)}
            alt={g.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-16 max-w-3xl">
        <div className="animate-fade-in" key={game.id}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              Featured
            </span>
            <span className="text-xs text-white/40">{game.genre}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-3 text-balance">
            {game.title}
          </h1>
          <p className="text-sm md:text-base text-white/60 leading-relaxed mb-5 max-w-xl line-clamp-2 md:line-clamp-3">
            {game.description}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/game/${game.id}`)}
              className="btn-primary text-sm md:text-base px-8 py-3 rounded-lg"
            >
              {game.salePrice ? `BUY NOW - ${game.salePrice.toFixed(2)} USD` : `LEARN MORE - ${game.price.toFixed(2)} USD`}
            </button>
            <button
              onClick={() => navigate(`/game/${game.id}`)}
              className="btn-secondary rounded-lg"
            >
              VIEW DETAILS
            </button>
          </div>
          {game.salePrice && (
            <div className="mt-3 flex items-center gap-2 text-xs text-white/40">
              <span className="line-through">{game.price.toFixed(2)} USD</span>
              <span className="text-red-400 font-semibold">
                -{Math.round(((game.price - game.salePrice) / game.price) * 100)}% OFF
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex items-center gap-2">
        <button onClick={prev} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white transition-all text-sm">
          ‹
        </button>
        <div className="flex items-center gap-1.5">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-red-500 w-4" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
        <button onClick={next} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white transition-all text-sm">
          ›
        </button>
      </div>
    </div>
  )
}

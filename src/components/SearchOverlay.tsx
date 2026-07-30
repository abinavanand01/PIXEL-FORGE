import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { games } from "@/data/games"
import { getGameImageUrl } from "@/data/gameImages"
import { Search, X } from "lucide-react"

const allGenres = Array.from(new Set(games.map(g => g.genre))).sort()

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [showFilters, setShowFilters] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const filtered = games.filter((g) => {
    const q = query.toLowerCase()
    if (q && !g.title.toLowerCase().includes(q) && !g.developer.toLowerCase().includes(q) && !g.genre.toLowerCase().includes(q)) return false
    if (selectedGenre && g.genre !== selectedGenre) return false
    const p = g.salePrice ?? g.price
    if (p < priceRange[0] || p > priceRange[1]) return false
    return true
  }).slice(0, 8)

  const recentSearches: string[] = (() => {
    try { return JSON.parse(localStorage.getItem("pf_recent_searches") || "[]") } catch { return [] }
  })()

  const saveSearch = (q: string) => {
    if (!q.trim()) return
    const recent = [q, ...recentSearches.filter(s => s !== q)].slice(0, 5)
    localStorage.setItem("pf_recent_searches", JSON.stringify(recent))
  }

  const handleSelect = (id: string, q?: string) => {
    if (q) saveSearch(q)
    onClose()
    navigate(`/game/${id}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      saveSearch(query.trim())
      onClose()
      navigate(`/?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-16 md:pt-20">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 bg-[#0c0c0c] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-scale-in">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
          <Search className="w-4 h-4 text-white/30 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search games by title, genre, or developer..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
          />
          <button type="button" onClick={() => setShowFilters(!showFilters)} className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition-all ${showFilters ? "bg-red-500/10 text-red-500" : "text-white/30 hover:text-white/60 bg-white/[0.04]"}`}>
            Filters
          </button>
          {query && (
            <button type="button" onClick={() => setQuery("")} className="text-white/20 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {showFilters && (
          <div className="px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[140px]">
                <label className="text-[9px] font-semibold uppercase tracking-wider text-white/30 mb-1 block">Genre</label>
                <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="w-full h-7 text-xs bg-white/[0.04] border border-white/[0.06] rounded-md text-white/70 px-2 outline-none">
                  <option value="">All Genres</option>
                  {allGenres.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="text-[9px] font-semibold uppercase tracking-wider text-white/30 mb-1 block">Max Price</label>
                <input type="range" min={0} max={100} step={5} value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full accent-red-500" />
                <span className="text-[10px] text-white/40">${priceRange[1]}</span>
              </div>
            </div>
          </div>
        )}

        <div className="max-h-[50vh] overflow-y-auto">
          {!query && recentSearches.length > 0 && (
            <div className="px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-2">Recent</p>
              <div className="flex flex-wrap gap-1.5">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs text-white/50 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 rounded-md transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="px-4 pb-3">
            {filtered.length === 0 && query && (
              <p className="text-sm text-white/30 text-center py-6">No games found for "{query}"</p>
            )}
            {filtered.map((game) => (
              <button
                key={game.id}
                onClick={() => handleSelect(game.id)}
                className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-white/[0.04] transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-md overflow-hidden bg-white/5 shrink-0">
                  <img src={getGameImageUrl(game.id)} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-red-500 transition-colors">{game.title}</p>
                  <p className="text-[11px] text-white/40 truncate">{game.developer} &mdash; {game.genre}</p>
                </div>
                <div className="text-right shrink-0">
                  {game.salePrice ? (
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-red-500">${game.salePrice.toFixed(2)}</span>
                      <span className="text-[10px] text-white/20 line-through">${game.price.toFixed(2)}</span>
                    </div>
                  ) : game.price === 0 ? (
                    <span className="text-xs font-bold text-green-400">Free</span>
                  ) : (
                    <span className="text-xs font-bold text-white">${game.price.toFixed(2)}</span>
                  )}
                  <p className="text-[10px] text-white/30">{game.score}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {query && filtered.length > 0 && (
          <div className="px-4 py-2.5 border-t border-white/[0.06] text-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              See all {games.filter(g => g.title.toLowerCase().includes(query.toLowerCase())).length} results
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

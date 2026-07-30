import { useSearchParams, useNavigate } from "react-router-dom"
import { games } from "@/data/games"
import GameRow from "@/components/GameRow"
import HeroBanner from "@/components/HeroBanner"
import { Search } from "lucide-react"

export default function Index() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search") || ""
  const navigate = useNavigate()

  const byGenre = (genre: string) => games.filter(g => g.genre === genre)
  const freeGames = games.filter(g => g.price === 0)
  const topSellers = [...games].sort((a, b) => b.score - a.score)
  const newReleases = [...games].sort((a, b) => b.releaseYear - a.releaseYear || b.score - a.score)
  const trending = [...games].filter(g => g.installed || g.salePrice).sort((a, b) => b.score - a.score)
  const featured = trending.slice(0, 8)
  const saleGames = games.filter(g => g.salePrice).sort((a, b) => ((a.salePrice! / a.price) - (b.salePrice! / b.price)))

  if (search) {
    const filtered = games.filter((g) => {
      const q = search.toLowerCase()
      return g.title.toLowerCase().includes(q) || g.developer.toLowerCase().includes(q) || g.genre.toLowerCase().includes(q) || g.tags.some(t => t.toLowerCase().includes(q))
    })

    return (
      <main className="min-h-screen">
        <div className="pt-14 md:pt-16">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-4 h-4 text-white/30" />
              <h1 className="text-lg md:text-xl font-bold text-white">Results for "{search}"</h1>
            </div>
            <p className="text-sm text-white/30 mb-6">{filtered.length} game{filtered.length !== 1 ? "s" : ""} found</p>
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-base text-white/30">No games found</p>
                <button onClick={() => navigate("/")} className="text-sm text-red-500 hover:text-red-400 mt-2 transition-colors">Clear search</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {filtered.map((game, i) => (
                  <div key={game.id} onClick={() => navigate(`/game/${game.id}`)} className="group cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 30}ms`, animationFillMode: "both" }}>
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/[0.06] card-hover">
                      <img src={game.image} alt={game.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110" loading="lazy" />
                      {game.salePrice && <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-lg z-10">-{Math.round(((game.price - game.salePrice) / game.price) * 100)}%</div>}
                      {game.price === 0 && <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-lg z-10">FREE</div>}
                    </div>
                    <div className="mt-2 space-y-0.5 px-0.5">
                      <h3 className="text-sm font-semibold text-white/90 truncate group-hover:text-white transition-colors">{game.title}</h3>
                      <div className="flex items-center gap-1.5">
                        {game.salePrice ? <><span className="text-sm font-bold text-white">${game.salePrice.toFixed(2)}</span><span className="text-[10px] text-white/30 line-through">${game.price.toFixed(2)}</span></>
                          : game.price === 0 ? <span className="text-sm font-bold text-green-400">Free</span>
                          : <span className="text-sm font-bold text-white">${game.price.toFixed(2)}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <div className="pt-14 md:pt-16">
        <HeroBanner />
      </div>
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <GameRow title="🔥 Featured & Trending" games={featured} />
        <GameRow title="💰 On Sale" games={saleGames} />
        <GameRow title="🆕 New Releases" games={newReleases.slice(0, 15)} />
        <GameRow title="🏆 Top Sellers" games={topSellers.slice(0, 15)} />
        <GameRow title="🎮 Free to Play" games={freeGames} />
        <GameRow title="⚔️ Action" games={byGenre("Action Adventure").concat(byGenre("Action")).concat(byGenre("Action RPG"))} />
        <GameRow title="🗡️ RPG" games={byGenre("RPG").concat(byGenre("Action RPG"))} />
        <GameRow title="🔫 FPS & Shooters" games={byGenre("FPS").concat(byGenre("MMO FPS"))} />
        <GameRow title="🏹 Adventure" games={byGenre("Adventure").concat(byGenre("Puzzle Platformer"))} />
        <GameRow title="🧟 Horror" games={byGenre("Survival Horror").concat(byGenre("Horror"))} />
        <GameRow title="🧠 Strategy" games={byGenre("Strategy").concat(byGenre("Deck-Building")).concat(byGenre("Card Game"))} />
        <GameRow title="⚡ Roguelike" games={byGenre("Roguelike")} />
        <GameRow title="🏗️ Simulation" games={byGenre("Simulation").concat(byGenre("Sandbox"))} />
        <GameRow title="🌴 Survival & Open World" games={byGenre("Survival")} />
        <GameRow title="🎲 Party & Multiplayer" games={byGenre("Party").concat(byGenre("MMO"))} />
        <GameRow title="🎭 Indie Gems" games={byGenre("Metroidvania").concat(byGenre("Platformer")).concat(byGenre("Puzzle")).concat(byGenre("Puzzle Platformer"))} />
        <GameRow title="🥊 Fighting & Sports" games={byGenre("Fighting").concat(byGenre("Sports")).concat(byGenre("Racing"))} />
      </div>
    </main>
  )
}

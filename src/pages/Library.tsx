import { useState } from "react"
import { Link } from "react-router-dom"
import { games } from "@/data/games"
import { getGameImageUrl } from "@/data/gameImages"

export default function Library() {
  const ownedGames = games.filter((g) => g.installed)
  const [selected, setSelected] = useState<(typeof ownedGames)[number] | null>(ownedGames[0] || null)

  return (
    <main className="pt-14 md:pt-16 min-h-screen">
      <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)]">
        <div className={`${selected ? "w-full md:w-80 lg:w-96" : "w-full"} border-b md:border-b-0 md:border-r border-white/[0.06] overflow-y-auto`}>
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Library</h1>
              <span className="text-xs text-white/20">{ownedGames.length}</span>
            </div>
            {ownedGames.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-white/40 mb-4">No games in your library yet.</p>
                <Link to="/" className="btn-primary text-xs rounded-lg inline-flex">
                  BROWSE STORE
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                {ownedGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => setSelected(game)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      selected?.id === game.id ? "bg-white/10" : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-white/5 shrink-0">
                      {selected?.id === game.id && (
                        <img src={getGameImageUrl(game.id)} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium truncate ${selected?.id === game.id ? "text-white" : "text-white/60"}`}>
                        {game.title}
                      </p>
                      <p className="text-[11px] text-white/30 truncate">{game.developer}</p>
                    </div>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${game.installed ? "bg-green-500" : "bg-white/20"}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {selected && (
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={getGameImageUrl(selected.id)}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 lg:p-14 max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-2">
                {selected.developer} &mdash; {selected.genre}
              </p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                {selected.title}
              </h2>
              <p className="text-sm md:text-base text-white/50 leading-relaxed mb-5 line-clamp-3">
                {selected.description}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to={`/game/${selected.id}`}
                  className="btn-primary rounded-lg"
                >
                  VIEW DETAILS
                </Link>
                {selected.installed && (
                  <button className="btn-secondary rounded-lg">
                    LAUNCH
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

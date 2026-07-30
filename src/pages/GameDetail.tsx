import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { toast } from "sonner"
import { games } from "@/data/games"
import { useCartStore } from "@/store/cartStore"
import { getGameImageUrl, getGameScreenshotUrls } from "@/data/gameImages"
import { systemRequirements, dlcData, relatedGames } from "@/data/gameDetails"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog"
import { ArrowLeft, ShoppingCart, Heart, Clock, Star, Monitor, Calendar, Gamepad2, Tag, MonitorDown, HardDrive, Cpu, ChevronLeft, ChevronRight } from "lucide-react"

const difficultyColors: Record<string, string> = {
  "Beginner Friendly": "text-green-400", Moderate: "text-yellow-400",
  Challenging: "text-orange-400", Hardcore: "text-red-400",
}

export default function GameDetail() {
  const { id } = useParams<{ id: string }>()
  const game = games.find((g) => g.id === id)
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useCartStore()
  const [ageDialogOpen, setAgeDialogOpen] = useState(false)
  const [day, setDay] = useState(""); const [month, setMonth] = useState(""); const [year, setYear] = useState("")
  const [error, setError] = useState(""); const [ageVerified, setAgeVerified] = useState(false)
  const [selectedScreenshot, setSelectedScreenshot] = useState<number | null>(null)

  if (!game) {
    return (
      <main className="pt-14 md:pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center px-8">
          <h1 className="text-2xl font-bold text-white mb-3">Game Not Found</h1>
          <Link to="/" className="text-sm text-red-500 hover:text-red-400 font-medium transition-colors">Back to Store</Link>
        </div>
      </main>
    )
  }

  const isAgeRestricted = game.rating === "18+" && sessionStorage.getItem(`verified_${game.id}`) !== "true" && !ageVerified
  const discount = game.salePrice ? Math.round(((game.price - game.salePrice) / game.price) * 100) : 0
  const inCart = isInCart(game.id); const inWishlist = isInWishlist(game.id)
  const screenshots = getGameScreenshotUrls(game.id)
  const sysReqs = systemRequirements[game.id]
  const dlcs = dlcData[game.id]
  const relatedIds = relatedGames[game.id] || []
  const related = relatedIds.map(rid => games.find(g => g.id === rid)).filter(Boolean)

  const verifyAge = () => {
    const d = parseInt(day); const m = parseInt(month); const y = parseInt(year)
    if (!d || !m || !y || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > new Date().getFullYear()) { setError("Invalid date."); return }
    const today = new Date(); const birth = new Date(y, m - 1, d)
    let age = today.getFullYear() - birth.getFullYear()
    const md = today.getMonth() - birth.getMonth()
    if (md < 0 || (md === 0 && today.getDate() < birth.getDate())) age--
    if (age >= 18) { sessionStorage.setItem(`verified_${game.id}`, "true"); setAgeVerified(true); setAgeDialogOpen(false) }
    else setError("You must be 18 or older.")
  }

  const handleAddToCart = () => {
    const added = addToCart(game)
    toast(added ? "Added to Cart" : "Already in Cart", { description: added ? `${game.title} added to cart.` : `${game.title} is already in your cart.` })
  }
  const handlePurchase = () => toast("Purchase Initiated", { description: `Processing purchase for ${game.title}...` })
  const handleAddToWishlist = () => {
    const added = addToWishlist(game)
    toast(added ? "Added to Wishlist" : "Already in Wishlist", { description: added ? `${game.title} added to wishlist.` : `${game.title} is already in your wishlist.` })
  }

  if (isAgeRestricted && !ageDialogOpen) {
    return (
      <main className="pt-14 md:pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center px-8 max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-500/10 mx-auto mb-4 flex items-center justify-center"><Clock className="w-7 h-7 text-red-500" /></div>
          <h1 className="text-xl font-bold text-white mb-2">Age Restricted</h1>
          <p className="text-sm text-white/50 mb-6">This game is rated {game.rating} and requires age verification.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => setAgeDialogOpen(true)} className="rounded-lg text-xs font-semibold">VERIFY AGE</Button>
            <Link to="/" className="text-xs text-white/40 hover:text-white underline underline-offset-4 self-center">Back to Store</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-14 md:pt-16 min-h-screen">
      <div className="relative h-[35vh] md:h-[45vh] lg:h-[55vh] overflow-hidden">
        <img src={getGameImageUrl(game.id)} alt={game.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12 max-w-5xl">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white mb-3 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Back</Link>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">{game.title}</h1>
          <p className="text-sm text-white/40 mt-1.5">{game.developer} &mdash; {game.genre}</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 min-w-0 space-y-8">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-3">About</h2>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">{game.description}</p>
            </div>

            {screenshots.length > 0 && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  {screenshots.map((url, i) => (
                    <button key={i} onClick={() => setSelectedScreenshot(i)}
                      className="aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/[0.06] hover:border-red-500/30 transition-all">
                      <img src={url} alt={`${game.title} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sysReqs && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-3">System Requirements</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  {[
                    { icon: Monitor, label: "OS", value: sysReqs.os },
                    { icon: Cpu, label: "CPU", value: sysReqs.cpu },
                    { icon: Cpu, label: "RAM", value: sysReqs.ram },
                    { icon: MonitorDown, label: "GPU", value: sysReqs.gpu },
                    { icon: HardDrive, label: "Storage", value: sysReqs.storage },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="col-span-2 md:col-span-1 flex items-start gap-2.5">
                      <Icon className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-white/30">{label}</p>
                        <p className="text-xs text-white/70">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              {[
                { icon: Gamepad2, label: "Developer", value: game.developer },
                { icon: Star, label: "Metacritic", value: game.score.toString() },
                { icon: Monitor, label: "Platforms", value: game.platforms.join(", ") },
                { icon: Calendar, label: "Released", value: game.releaseYear.toString() },
                { icon: Tag, label: "Genre", value: game.genre },
                { icon: Clock, label: "Difficulty", value: game.difficulty, color: difficultyColors[game.difficulty] },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <Icon className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30">{label}</p>
                    <p className={`text-sm font-medium ${color || "text-white/80"}`}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {game.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-medium text-white/50 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-md">{tag}</span>
                ))}
              </div>
            </div>

            {dlcs && dlcs.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-3">DLC & Add-ons ({dlcs.length})</h3>
                <div className="space-y-2">
                  {dlcs.map((dlc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">{dlc.name}</p>
                        <p className="text-xs text-white/40 mt-0.5">{dlc.description}</p>
                      </div>
                      <span className="text-sm font-bold text-white shrink-0 ml-3">${dlc.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {game.pressQuotes.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-3">Press</h3>
                <div className="space-y-3">
                  {game.pressQuotes.map((quote, i) => (
                    <blockquote key={i} className="border-l-2 border-red-500/50 pl-4">
                      <p className="text-sm text-white/60 italic leading-relaxed">"{quote.text}"</p>
                      <cite className="text-xs text-white/30 not-italic mt-1 block">&mdash; {quote.source}</cite>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            {related.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-3">Related Games</h3>
                <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                  {related.map((g) => g && (
                    <Link key={g.id} to={`/game/${g.id}`} className="group flex-shrink-0 w-[140px]">
                      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white/5 border border-white/[0.06] group-hover:border-red-500/30 transition-all">
                        <img src={getGameImageUrl(g.id)} alt={g.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                      </div>
                      <p className="text-xs font-medium text-white/70 truncate mt-1.5 group-hover:text-white transition-colors">{g.title}</p>
                      <p className="text-[10px] text-white/30">${g.salePrice?.toFixed(2) ?? g.price.toFixed(2)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:w-80 shrink-0">
            <div className="sticky top-20 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 md:p-6 space-y-5">
              <div className="aspect-video rounded-lg overflow-hidden bg-white/5">
                <img src={getGameImageUrl(game.id)} alt={game.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-bold text-white">{game.title}</h2>
                <p className="text-xs text-white/40">{game.developer}</p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-bold text-white">{game.score}</span>
                <span className="text-xs text-white/30">Metacritic</span>
              </div>
              <div className="flex items-baseline gap-2.5">
                {game.salePrice ? (
                  <><span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">-{discount}%</span>
                    <span className="text-xs text-white/40 line-through">${game.price.toFixed(2)}</span>
                    <span className="text-2xl font-bold text-white">${game.salePrice.toFixed(2)}</span></>
                ) : game.price === 0 ? (
                  <span className="text-2xl font-bold text-green-400">FREE</span>
                ) : (<span className="text-2xl font-bold text-white">${game.price.toFixed(2)}</span>)}
              </div>
              <div className="flex items-center gap-2 text-xs text-white/30"><Monitor className="w-3 h-3" /> {game.platforms.join(", ")}</div>
              <button onClick={handlePurchase} className="w-full btn-primary rounded-lg justify-center">
                {game.price === 0 ? "GET NOW" : game.salePrice ? `BUY NOW - $${game.salePrice.toFixed(2)}` : `BUY NOW - $${game.price.toFixed(2)}`}
              </button>
              <button onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-lg transition-all border ${inCart ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-white/[0.04] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08]"}`}>
                <ShoppingCart className="w-4 h-4" />{inCart ? "IN CART" : "ADD TO CART"}
              </button>
              <button onClick={handleAddToWishlist}
                className={`w-full flex items-center justify-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-lg transition-all border ${inWishlist ? "bg-red-500/10 border-red-500/30 text-red-500" : "border-white/[0.06] text-white/40 hover:text-white hover:border-white/20"}`}>
                <Heart className={`w-4 h-4 ${inWishlist ? "fill-red-500" : ""}`} />{inWishlist ? "WISHLISTED" : "ADD TO WISHLIST"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={ageDialogOpen} onOpenChange={setAgeDialogOpen}>
        <DialogContent className="sm:max-w-sm bg-[#0a0a0a] border border-white/[0.08] text-white">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Age Verification</DialogTitle>
            <DialogDescription className="text-sm text-white/50">This game is rated {game.rating}. Please enter your date of birth.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3 py-4">
            {["Day","Month","Year"].map((label) => (
              <div key={label}>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-1 block">{label}</label>
                <input type="number" placeholder={label === "Day" ? "DD" : label === "Month" ? "MM" : "YYYY"}
                  value={label === "Day" ? day : label === "Month" ? month : year}
                  onChange={(e) => label === "Day" ? setDay(e.target.value) : label === "Month" ? setMonth(e.target.value) : setYear(e.target.value)}
                  min={label === "Year" ? 1900 : 1} max={label === "Year" ? new Date().getFullYear() : label === "Day" ? 31 : 12}
                  className="w-full h-10 text-center text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 transition-all" />
              </div>
            ))}
          </div>
          {error && <p className="text-xs text-red-500 text-center -mt-2 mb-2">{error}</p>}
          <DialogFooter className="gap-2">
            <button onClick={() => setAgeDialogOpen(false)} className="px-5 py-2 text-xs font-semibold text-white/50 hover:text-white border border-white/[0.08] rounded-lg transition-all">CANCEL</button>
            <button onClick={verifyAge} className="px-5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-all">VERIFY</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

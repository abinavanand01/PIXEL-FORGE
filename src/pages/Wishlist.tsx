import { Link } from "react-router-dom"
import { toast } from "sonner"
import { useCartStore } from "@/store/cartStore"
import { getGameImageUrl } from "@/data/gameImages"
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart, isInCart } = useCartStore()

  const handleRemove = (id: string, title: string) => {
    removeFromWishlist(id);
    toast("Removed", { description: `${title} removed from wishlist.` })
  }

  const handleAddToCart = (game: (typeof wishlist)[number]) => {
    const added = addToCart(game)
    toast(added ? "Added to Cart" : "Already in Cart", {
      description: added ? `${game.title} added to cart.` : `${game.title} is already in your cart.`,
    })
  }

  if (wishlist.length === 0) {
    return (
      <main className="pt-14 md:pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center px-8 max-w-sm">
          <div className="w-16 h-16 rounded-full bg-white/[0.04] mx-auto mb-5 flex items-center justify-center">
            <Heart className="w-7 h-7 text-white/20" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Your Wishlist is Empty</h1>
          <p className="text-sm text-white/40 mb-6">Save games you're interested in for later.</p>
          <Link to="/" className="btn-primary rounded-lg inline-flex">
            BROWSE STORE
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-14 md:pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/" className="text-white/30 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-lg font-bold text-white">Wishlist</h1>
          <span className="text-sm text-white/30">({wishlist.length})</span>
        </div>

        <div className="space-y-2">
          {wishlist.map((item) => (
            <div key={item.id} className="flex items-center gap-3 md:gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 md:p-4">
              <Link to={`/game/${item.id}`} className="shrink-0">
                <div className="w-16 md:w-24 aspect-video rounded-lg overflow-hidden bg-white/5">
                  <img src={getGameImageUrl(item.id)} alt={item.title} className="w-full h-full object-cover" />
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/game/${item.id}`}>
                  <h3 className="text-sm font-semibold text-white truncate hover:text-red-500 transition-colors">{item.title}</h3>
                </Link>
                <p className="text-xs text-white/40">{item.developer}</p>
                <div className="flex items-center gap-2 mt-1">
                  {item.salePrice ? (
                    <>
                      <span className="text-xs font-bold text-white">{item.salePrice.toFixed(2)} USD</span>
                      <span className="text-[10px] text-white/30 line-through">{item.price.toFixed(2)} USD</span>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-white">{item.price.toFixed(2)} USD</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`p-2 rounded-lg transition-all ${
                    isInCart(item.id) ? "text-red-500 bg-red-500/10" : "text-white/30 hover:text-white hover:bg-white/5"
                  }`}
                  title={isInCart(item.id) ? "In cart" : "Add to cart"}
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleRemove(item.id, item.title)}
                  className="p-2 rounded-lg text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

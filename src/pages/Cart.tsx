import { Link } from "react-router-dom"
import { toast } from "sonner"
import { useCartStore } from "@/store/cartStore"
import { getGameImageUrl } from "@/data/gameImages"
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react"

export default function Cart() {
  const { cart, removeFromCart, cartTotal } = useCartStore()

  const handleRemove = (id: string, title: string) => {
    removeFromCart(id);
    toast("Removed", { description: `${title} removed from cart.` })
  }

  const handleCheckout = () => {
    toast("Checkout", { description: "Checkout requires an account. Please sign in first." })
  }

  if (cart.length === 0) {
    return (
      <main className="pt-14 md:pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center px-8 max-w-sm">
          <div className="w-16 h-16 rounded-full bg-white/[0.04] mx-auto mb-5 flex items-center justify-center">
            <ShoppingCart className="w-7 h-7 text-white/20" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Your Cart is Empty</h1>
          <p className="text-sm text-white/40 mb-6">Browse the store and add some games!</p>
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
          <h1 className="text-lg font-bold text-white">Shopping Cart</h1>
          <span className="text-sm text-white/30">({cart.length} {cart.length === 1 ? "item" : "items"})</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 md:gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 md:p-4">
                <Link to={`/game/${item.id}`} className="shrink-0">
                  <div className="w-16 md:w-24 aspect-video rounded-lg overflow-hidden bg-white/5">
                    <img src={getGameImageUrl(item.id)} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/game/${item.id}`}>
                    <h3 className="text-sm font-semibold text-white truncate hover:text-red-500 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-white/40 mt-0.5">{item.developer}</p>
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
                <button
                  onClick={() => handleRemove(item.id, item.title)}
                  className="text-white/20 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="lg:w-72 shrink-0">
            <div className="sticky top-20 bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">Order Summary</h2>
              <div className="flex justify-between items-baseline pt-3 border-t border-white/[0.06]">
                <span className="text-sm text-white/50">{cart.length} {cart.length === 1 ? "item" : "items"}</span>
                <span className="text-xl font-bold text-white">{cartTotal.toFixed(2)} USD</span>
              </div>
              <button onClick={handleCheckout} className="w-full btn-primary rounded-lg justify-center">
                CHECKOUT
              </button>
              <Link to="/" className="block text-center text-xs text-white/30 hover:text-white transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

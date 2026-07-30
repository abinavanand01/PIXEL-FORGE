import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, Heart, User, Search, Menu, X } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { useAuth } from "@/store/authStore"
import SearchOverlay from "@/components/SearchOverlay"

const navLinks = [
  { label: "Store", path: "/" },
  { label: "Library", path: "/library" },
]

export default function Navbar() {
  const location = useLocation()
  const { cart, wishlist } = useCartStore()
  const { user } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            <div className="flex items-center gap-6">
              <Link to="/" className="font-bold text-lg text-white tracking-tight shrink-0">
                <span className="text-red-500">PIXEL</span><span>FORGE</span>
              </Link>
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${location.pathname === link.path ? "text-white bg-white/10" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <button onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 flex-1 max-w-xs mx-4 h-9 px-3 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white/25 text-sm hover:text-white/50 hover:border-white/20 transition-all">
              <Search className="w-3.5 h-3.5" />
              <span>Search games...</span>
              <span className="ml-auto text-[10px] text-white/10 border border-white/[0.06] px-1.5 py-0.5 rounded">Ctrl+K</span>
            </button>

            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <Search className="w-4 h-4" />
              </button>
              <Link to="/wishlist"
                className={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-all ${location.pathname === "/wishlist" ? "bg-red-500/10 text-red-500" : "text-white/40 hover:text-white hover:bg-white/10"}`}>
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{wishlist.length}</span>}
              </Link>
              <Link to="/cart"
                className={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-all ${location.pathname === "/cart" ? "bg-red-500/10 text-red-500" : "text-white/40 hover:text-white hover:bg-white/10"}`}>
                <ShoppingCart className="w-4 h-4" />
                {cart.length > 0 && <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{cart.length}</span>}
              </Link>
              <Link to="/profile"
                className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all ${location.pathname === "/profile" ? "bg-red-500/10 text-red-500" : "text-white/40 hover:text-white hover:bg-white/10"}`}>
                {user ? <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[9px] font-bold text-white">{user.displayName.charAt(0).toUpperCase()}</span> : <User className="w-4 h-4" />}
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/40 hover:text-white hover:bg-white/10">
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-black/95 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-2">
              <button onClick={() => { setSearchOpen(true); setMobileOpen(false) }}
                className="w-full flex items-center gap-3 h-9 px-3 bg-white/[0.06] border border-white/[0.08] rounded-lg text-white/30 text-sm transition-all">
                <Search className="w-3.5 h-3.5" /> Search games...
              </button>
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-all ${location.pathname === link.path ? "text-white bg-white/10" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  )
}

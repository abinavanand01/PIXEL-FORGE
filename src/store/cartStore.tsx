import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Game } from "@/data/games"

interface CartContextType {
  cart: Game[]
  wishlist: Game[]
  addToCart: (game: Game) => boolean
  removeFromCart: (id: string) => void
  addToWishlist: (game: Game) => boolean
  removeFromWishlist: (id: string) => void
  isInCart: (id: string) => boolean
  isInWishlist: (id: string) => boolean
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Game[]>([])
  const [wishlist, setWishlist] = useState<Game[]>([])

  const addToCart = useCallback((game: Game) => {
    if (cart.find((g) => g.id === game.id)) return false
    setCart((prev) => [...prev, game])
    return true
  }, [cart])

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((g) => g.id !== id))
  }, [])

  const addToWishlist = useCallback((game: Game) => {
    if (wishlist.find((g) => g.id === game.id)) return false
    setWishlist((prev) => [...prev, game])
    return true
  }, [wishlist])

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((g) => g.id !== id))
  }, [])

  const isInCart = useCallback((id: string) => cart.some((g) => g.id === id), [cart])
  const isInWishlist = useCallback((id: string) => wishlist.some((g) => g.id === id), [wishlist])
  const cartTotal = cart.reduce((sum, g) => sum + (g.salePrice ?? g.price), 0)

  return (
    <CartContext.Provider
      value={{ cart, wishlist, addToCart, removeFromCart, addToWishlist, removeFromWishlist, isInCart, isInWishlist, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartStore() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCartStore must be used within CartProvider")
  return context
}

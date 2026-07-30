import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import { CartProvider } from "@/store/cartStore"
import { AuthProvider } from "@/store/authStore"
import Navbar from "@/components/Navbar"
import Index from "@/pages/Index"
import Library from "@/pages/Library"
import Profile from "@/pages/Profile"
import GameDetail from "@/pages/GameDetail"
import Cart from "@/pages/Cart"
import Wishlist from "@/pages/Wishlist"
import NotFound from "@/pages/NotFound"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="relative min-h-screen">
              <div className="fixed inset-0 -z-10 bg-background">
                <div className="absolute top-[-300px] left-[-300px] w-[800px] h-[800px] rounded-full bg-red-500/3 blur-[150px]" />
                <div className="absolute bottom-[-300px] right-[-300px] w-[700px] h-[700px] rounded-full bg-red-500/3 blur-[120px]" />
              </div>
              <Navbar />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "#0a0a0a",
                    color: "#ededed",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "14px",
                  },
                }}
              />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/library" element={<Library />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/game/:id" element={<GameDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

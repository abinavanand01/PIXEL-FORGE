import { useEffect } from "react"
import { useLocation, Link } from "react-router-dom"

export default function NotFound() {
  const location = useLocation()

  useEffect(() => {
    console.error("404:", location.pathname)
  }, [location.pathname])

  return (
    <main className="pt-14 md:pt-16 min-h-screen flex items-center justify-center">
      <div className="text-center px-8">
        <h1 className="text-6xl font-bold text-white mb-3">404</h1>
        <p className="text-base text-white/50 mb-6">This page doesn't exist.</p>
        <Link to="/" className="btn-primary rounded-lg inline-flex">
          BACK TO STORE
        </Link>
      </div>
    </main>
  )
}

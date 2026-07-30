import { useState } from "react"
import { toast } from "sonner"
import { games } from "@/data/games"
import { useAuth } from "@/store/authStore"
import { User, Mail, Calendar, Gamepad2 } from "lucide-react"

export default function Profile() {
  const { user, login, signup, logout, error: authError } = useAuth()
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")

  const installedCount = games.filter((g) => g.installed).length

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignup) {
      if (signup(email, password, displayName)) {
        toast("Account Created", { description: "Welcome to Pixel Forge!" })
      }
    } else {
      if (login(email, password)) {
        toast("Signed In", { description: "Welcome back!" })
      }
    }
  }

  const handleLogout = () => {
    logout()
    toast("Signed Out", { description: "You have been signed out." })
  }

  if (user) {
    return (
      <main className="pt-14 md:pt-16 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 mx-auto mb-5 flex items-center justify-center border-2 border-red-500/20">
            <span className="text-2xl font-bold text-red-500">{user.displayName.charAt(0).toUpperCase()}</span>
          </div>
          <h1 className="text-xl font-bold text-white mb-1">{user.displayName}</h1>
          <p className="text-sm text-white/40 mb-1">{user.email}</p>
          <p className="text-xs text-white/30 mb-8">Member since {user.memberSince}</p>
          <div className="flex justify-center gap-10 mb-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{games.length}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mt-1">Games</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{installedCount}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mt-1">Installed</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-xs font-medium text-white/30 hover:text-red-500 underline underline-offset-4 transition-colors">
            SIGN OUT
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-14 md:pt-16 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-4">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-white/[0.04] mx-auto mb-4 flex items-center justify-center">
            <User className="w-6 h-6 text-white/30" />
          </div>
          <h1 className="text-xl font-bold text-white">{isSignup ? "Create Account" : "Sign In"}</h1>
          <p className="text-sm text-white/40 mt-1">{isSignup ? "Join Pixel Forge today" : "Welcome back"}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-1.5 block">Display Name</label>
              <input type="text" required value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="w-full h-10 px-4 text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 transition-all"
              />
            </div>
          )}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-1.5 block">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-10 px-4 text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-1.5 block">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-10 px-4 text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 transition-all"
            />
          </div>
          {authError && <p className="text-xs text-red-500 text-center">{authError}</p>}
          <button type="submit" className="w-full btn-primary rounded-lg justify-center">
            {isSignup ? "CREATE ACCOUNT" : "SIGN IN"}
          </button>
        </form>
        <p className="text-xs text-white/30 text-center mt-5">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => { setIsSignup(!isSignup); setEmail(""); setPassword(""); setDisplayName(""); }}
            className="text-red-500 hover:text-red-400 font-medium transition-colors">
            {isSignup ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>
    </main>
  )
}

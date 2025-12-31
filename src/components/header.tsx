import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="mt-4 flex items-center justify-between rounded-full
          bg-white/10 backdrop-blur-md border border-white/20
          px-6 py-3"
        >
          {/* Logo */}
          <div className="flex items-center gap-2 text-white font-semibold">
            <div className="h-6 w-6 bg-white rounded-md" />
            TechTonic
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8 text-sm text-white/80">
            <a href="#" className="hover:text-white transition">Home</a>
            <a href="#" className="hover:text-white transition">Projects</a>
            <a href="#" className="hover:text-white transition">Services</a>
            <a href="#" className="hover:text-white transition">Pricing</a>
            <a href="#" className="hover:text-white transition">Get in Touch</a>
          </nav>

          {/* Button */}
          <div className="flex items-center gap-3">
            <button className="hidden md:block bg-white text-black text-sm px-5 py-2 rounded-full font-medium hover:opacity-90 transition">
              Start Project
            </button>

            {/* Mobile menu icon */}
            <button className="md:hidden text-white">
              <Menu />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

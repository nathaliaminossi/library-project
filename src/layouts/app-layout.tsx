import Logo from "../images/logo1.png";
import { Home, BookOpen, Sparkles } from "lucide-react";
import { UserMenu } from "../components/userMenu";
import { useBooks } from "../hooks/useBooks";
import { Outlet } from "react-router";
import { Link } from "react-router";

export default function AppLayout() {
  const { books } = useBooks();
  return (
    <main className="  relative min-h-screen  overflow-hidden
        bg-linear-to-b from-indigo-950 via-indigo-950 to-slate-950">
      <header
        className="
          sticky top-0 z-50
          border-b border-white/10
          bg-indigo-950/65 backdrop-blur-xl
        "
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          {/* Brand */}
          <div className="flex items-center gap-2 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10">
              <img
                src={Logo}
                alt="MyLibrary"
                className="h-6 w-6 object-contain"
              />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">MyLibrary</p>
              <p className="text-[11px] text-white/55">Biblioteca pessoal</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {[
              { label: "Home", icon: Home, path: "/library" },
              { label: "Etiquetas", icon: BookOpen, path: "/lidos" },
              
            ].map(({ label, icon: Icon, path }) => (
                <Link to={path ?? "/library"}>
              <button
                key={label}
                className="
                  inline-flex items-center gap-2
                  rounded-full px-3 py-2
                  text-xs font-medium
                  text-white/70 hover:text-white
                  hover:bg-white/10
                  border border-transparent hover:border-white/10
                  transition
                "
              >
                <Icon size={15} />
                {label}
              </button>
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 border border-white/10">
              <Sparkles size={14} className="text-white/70" />
              <span className="text-xs text-white/70">
                {books.length} livro{books.length === 1 ? "" : "s"}
              </span>
            </div>
            <UserMenu />
          </div>
        </div>
      </header>

      <section>
           <div className="pointer-events-none absolute inset-0 bg-radial-[ellipse_at_top] from-indigo-500/18 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-2xl -translate-x-1/2 rounded-full bg-indigo-500/18 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-104 w-104 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div
        className="
          pointer-events-none absolute inset-0 opacity-[0.10]
          bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
          bg-size-[48px_48px]
        "
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t      from-black/45 via-black/10 to-transparent" />
        <Outlet/>
      </section>
    </main>
  );
}

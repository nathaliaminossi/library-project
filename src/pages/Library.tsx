import { BookCard } from "../components/book/BookCard";
import type { Book } from "../types/book";
import { BookForm } from "../components/book/BookForm";
import { Input } from "../components/ui/input";
import { BookX, Search, Home, BookOpen, Clock, Heart, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { UserMenu } from "../components/userMenu";
import { FilterSelect } from "../components/filterSelect";

import Logo from "../images/logo1.png";
import { useBooks } from "../hooks/useBooks";

export default function Library() {
  const [filter, setFilter] = useState("");
  const { books /*, setBooks, getBooks*/,  getBooks, addBook, updateBook } = useBooks(); // ajuste no hook (ver nota abaixo)
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [author, setAuthor] = useState<string[]>([]);
  const [title, setTitle] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);

  const filteredBooks = useMemo(() => {
    const byText =
      filter.trim() !== ""
        ? books.filter((b) => b.title.toUpperCase().includes(filter.toUpperCase()))
        : books;

    // Se quiser aplicar filtros dos FilterSelect (autor/título/gênero), descomente:
    // return byText.filter((b) => {
    //   const okAuthor = author.length ? author.includes(b.author) : true;
    //   const okTitle = title.length ? title.includes(b.title) : true;
    //   const okGenre = genre.length ? genre.includes(b.genre ?? "") : true;
    //   return okAuthor && okTitle && okGenre;
    // });

    return byText;
  }, [books, filter /*, author, title, genre*/]);

  function handleAddBook() {
    getBooks()
  }

  function handleDeleteBook(id: string) {
    // precisa do setBooks no hook ou métodos deleteBook()
    // setBooks((prev) => prev.filter((book) => String(book.idBook) !== id));
    console.log("deleteBook", id);
  }

  function handleEdit(book: Book) {
    setEditingBook(book);
    setIsEditOpen(true);
    updateBook(book)
    getBooks()
    

  }

  return (
    <div
      className="
        relative min-h-screen overflow-hidden
        bg-linear-to-b from-indigo-950 via-indigo-950 to-slate-950
      "
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-radial-[ellipse_at_top] from-indigo-500/18 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-500/18 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div
        className="
          pointer-events-none absolute inset-0 opacity-[0.10]
          [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:48px_48px]
        "
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />

      {/* Header */}
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
              <img src={Logo} alt="MyLibrary" className="h-6 w-6 object-contain" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">MyLibrary</p>
              <p className="text-[11px] text-white/55">Biblioteca pessoal</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {[
              { label: "Home", icon: Home },
              { label: "Lidos", icon: BookOpen },
              { label: "Pendentes", icon: Clock },
              { label: "Favoritos", icon: Heart },
            ].map(({ label, icon: Icon }) => (
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

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-14 pb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-xs text-white/70">
              <Sparkles size={14} />
              Organize, acompanhe e mantenha histórico de leitura
            </div>

            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-white">
              Sua biblioteca, <br />
              do seu jeito.
            </h1>

            <p className="mt-4 text-white/70 max-w-xl">
              Cadastre livros, filtre rapidamente e mantenha tudo visualmente organizado com foco em produtividade e clareza.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:max-w-sm">
                <Input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Buscar por título..."
                  className="
                    h-11 rounded-full
                    bg-white/10 text-white placeholder:text-white/45
                    border-white/10
                    pr-11
                    focus-visible:ring-white/20
                  "
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />
              </div>

              <div className="shrink-0">
                <BookForm  onAddBook={handleAddBook} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters panel */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="
              rounded-2xl border border-white/10
              bg-white/6 backdrop-blur-xl
              shadow-[0_20px_70px_-35px_rgba(0,0,0,0.8)]
              p-5
            "
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-white/80">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10">
                  <Search size={16} />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-white">Filtros</p>
                  <p className="text-[11px] text-white/55">Refine por autor, título e gênero</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <FilterSelect
                  label="Autor"
                  options={["Machado de Assis", "Clarice Lispector"]}
                  value={author}
                  onChange={setAuthor}
                />
                <FilterSelect
                  label="Título"
                  options={["blabla", "blble"]}
                  value={title}
                  onChange={setTitle}
                />
                <FilterSelect
                  label="Gênero"
                  options={["Romance", "Terror"]}
                  value={genre}
                  onChange={setGenre}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="mt-10 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Seus livros</h2>
              <p className="text-xs text-white/55">
                {filteredBooks.length} resultado{filteredBooks.length === 1 ? "" : "s"} encontrado{filteredBooks.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={String((book as Book).idBook ?? book.idBook)}
                  book={book}
                  onDelete={handleDeleteBook}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <div
              className="
                mt-10 rounded-2xl border border-white/10
                bg-white/6 backdrop-blur-xl
                p-10 text-center
              "
            >
              <BookX size={44} className="mx-auto text-white/60" />
              <p className="mt-4 text-base font-semibold text-white">Nenhum livro encontrado</p>
              <p className="mt-1 text-sm text-white/60">
                Tente ajustar a busca ou adicione seu primeiro livro.
              </p>
              <div className="mt-6 flex justify-center">
                <BookForm onAddBook={handleAddBook} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-indigo-950/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-white/55 flex items-center justify-between">
          <span>MyLibrary © {new Date().getFullYear()}</span>
          <span className="hidden sm:inline">Organização e produtividade para sua leitura</span>
        </div>
      </footer>
    </div>
  );
}

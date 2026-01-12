import { BookCard } from "../components/book/BookCard";
import type { Book } from "../types/book";
import { BookForm } from "../components/book/BookForm";
import { Input } from "../components/ui/input";
import { BookX, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { FilterSelect } from "../components/filterSelect";

import { useBooks } from "../hooks/useBooks";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useLabels } from "../hooks/useLabs";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function BooksPagination({
  page,
  totalPages,
  onPrev,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      {/* Info */}
      <div className="flex items-center gap-2 text-white/80">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10">
          <BookOpen size={16} />
        </span>

        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">
            Navegação de livros
          </p>
          <p className="text-[11px] text-white/55">
            Página {page} de {totalPages}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={onPrev}
          disabled={page <= 1}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          Anterior
        </button>

        <span className="text-sm text-white/60">
          {page} / {totalPages}
        </span>

        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Próximo
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function Library() {
  const [filter, setFilter] = useState("");
  const {
    books /*, setBooks, getBooks*/,
    totalPages,
    getBooks,
    updateBook,
    alterPage,
    page,
  } = useBooks();
  const { labels } = useLabels();
  const [author, setAuthor] = useState<string[]>([]);
  const [title, setTitle] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([])

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const okText =
        filter.trim() === "" ||
        b.title.toUpperCase().includes(filter.toUpperCase());

      const okAuthor = author.length === 0 || author.includes(b.author);

      const okTitle = title.length === 0 || title.includes(b.title);

      const okGenre = genre.length === 0 || genre.includes(b.gender ?? "");

      const okStatus = status.length === 0 || status.includes(b.status ?? "") 
      

      return okText && okAuthor && okTitle && okGenre && okStatus;
    });
  }, [books, filter, author, title, genre, status]).sort((a, b) => a.idBook! - b.idBook!);


  

  function handleAddBook() {
    getBooks();
  }

  function handleDeleteBook() {
    getBooks();
  }

  function handleEdit(book: Book) {
    updateBook(book);
    getBooks();
  }

  return (
    <div>
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
              Cadastre livros, filtre rapidamente e mantenha tudo visualmente
              organizado com foco em produtividade e clareza.
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
                <Search
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
                  size={18}
                />
              </div>

              <div className="shrink-0">
                <BookForm onAddBook={handleAddBook} />
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
        bg-white/5 backdrop-blur-xl
        shadow-[0_20px_70px_-35px_rgba(0,0,0,0.8)]
        p-5
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Left info */}
        <div className="flex items-center gap-3 text-white/80 min-w-[220px]">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10">
            <Search size={16} />
          </span>

          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Filtros</p>
            <p className="text-[11px] text-white/55">
              Refine sua biblioteca
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect
            label="Autor"
            options={[...new Set(books.map(b => b.author))]}
            value={author}
            onChange={setAuthor}
          />

          <FilterSelect
            label="Título"
            options={[...new Set(books.map(b => b.title))]}
            value={title}
            onChange={setTitle}
          />

          <FilterSelect
            label="Gênero"
            options={[...new Set(books.map(b => b.gender ?? ""))].filter(Boolean)}
            value={genre}
            onChange={setGenre}
          />

          <FilterSelect
            label="Status"
            options={[
              ...new Set(
                books
                  .map(b => b.status ?? "")
                  .filter(Boolean)
              ),
            ]}
            value={genre}
            onChange={setStatus}
          />
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-10 w-px bg-white/10" />

        {/* Pagination */}
        <BooksPagination
          page={page + 1}
          totalPages={totalPages}
          onPrev={() => alterPage(-1)}
          onNext={() => alterPage(+1)}
        />
      </div>
    </div>
  </div>
</section>


      {/* List */}
      <section className="mt-10 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Seus livros
              </h2>
              <p className="text-xs text-white/55">
                {filteredBooks.length} resultado
                {filteredBooks.length === 1 ? "" : "s"} encontrado
                {filteredBooks.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols- sm:grid-cols-3 md:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  userLabels={labels}
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
              <p className="mt-4 text-base font-semibold text-white">
                Nenhum livro encontrado
              </p>
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
          <span className="hidden sm:inline">
            Organização e produtividade para sua leitura
          </span>
        </div>
      </footer>
    </div>
  );
}

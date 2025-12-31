import { Pencil, Trash2, Image as ImageIcon, BookOpen, User } from "lucide-react"
import type { Book } from "../../types/book"
import { EditBookForm } from "./BookForm"

interface BookCardProps {
  book: Book
  onDelete: (id: string) => void
  onEdit: (book: Book) => void
}

export function BookCard({ book, onDelete, onEdit }: BookCardProps) {
  return (
    <div className="group  relative">
      {/* Card container */}
      <div
        className="
          relative overflow-hidden rounded-2xl
          border border-border/60 bg-background
          shadow-sm transition
          hover:-translate-y-0.5 hover:shadow-xl
          h-[440px]
        "
      >
        {/* subtle shine */}
        <div
          className="
            pointer-events-none absolute inset-0 opacity-0 transition
            group-hover:opacity-100
            bg-radial-[ellipse_at_top] from-indigo-500/10 via-transparent to-transparent
          "
        />

        {/* Ações */}
        <div
          className="
            absolute top-2 right-2 z-10 flex gap-1
            opacity-0 translate-y-1 transition
            group-hover:opacity-100 group-hover:translate-y-0
          "
        >   
          <EditBookForm onEdit={onEdit} book={book}>
          <button
            onClick={() => onEdit(book)}
            className="
              inline-flex items-center justify-center
              h-8 w-8 rounded-xl
              bg-background/80 backdrop-blur
              border border-border/60
              shadow-sm
              hover:bg-indigo-50 hover:border-indigo-200
              transition
            "
            aria-label="Editar livro"
            title="Editar"
          >
            <Pencil size={15} className="text-indigo-950/80" />
          </button>
          </EditBookForm  >

          <button
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={() => onDelete(String((book as any).idBook))}
            className="
              inline-flex items-center justify-center
              h-8 w-8 rounded-xl
              bg-background/80 backdrop-blur
              border border-border/60
              shadow-sm
              hover:bg-red-50 hover:border-red-200
              transition
            "
            aria-label="Excluir livro"
            title="Excluir"
          >
            <Trash2 size={15} className="text-red-600" />
          </button>
        </div>

        {/* CAPA */}
        <div className="relative aspect-2/3 w-full overflow-hidden bg-muted">
          {/* Placeholder elegante */}
          <div
            className="
              absolute inset-0
              flex flex-col items-center justify-center gap-2
              text-muted-foreground
              bg-linear-to-b from-muted to-muted/40
            "
          >
            <div className="rounded-xl border border-border/60 bg-background/70 backdrop-blur px-3 py-2 shadow-sm">
            {book.image ? (
                <img src={book.image} alt="" />
            ) : (
                <div className="flex items-center gap-2">
                <ImageIcon size={16} />
                <span className="text-xs">Sem capa</span>
              </div>
            )}
              
            </div>
          </div>

          {/* Vinheta para leitura */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-50px_60px_-40px_rgba(0,0,0,0.45)]" />

          {/* Badge de edição */}
          {book.edition ? (
            <div className="absolute left-2 top-2">
              <span
                className="
                  inline-flex items-center gap-1
                  rounded-full px-2 py-1
                  text-[11px] font-medium
                  bg-background/80 backdrop-blur
                  border border-border/60
                "
              >
                <BookOpen  size={12} />
                {book.edition}
              </span>
            </div>
          ) : null}
        </div>

        {/* INFO */}
        <div className="p-3">
          <p className="text-sm font-semibold leading-snug line-clamp-2">
            {book.title}
          </p>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <User size={12} />
            <span className="line-clamp-1">{book.author}</span>
          </div>

          {/* Linha auxiliar (ex.: volume/categoria) */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground/80">
              {book.volume ? `Vol. ${book.volume}` : "—"}
            </span>

            {book.publisher ? (
              <span className="text-[11px] text-muted-foreground/80 line-clamp-1">
                {book.publisher}
              </span>
            ) : (
              <span className="text-[11px] text-muted-foreground/60"> </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

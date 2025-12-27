
import { Pencil, Trash2 } from "lucide-react"
import type { Book } from "../../types/book"

interface BookCardProps {
  book: Book
    onDelete: (id: string) => void
  onEdit: (book: Book) => void
}
const statusStyles = {
  lido: "bg-green-100 text-green-700",
  lendo: "bg-blue-100 text-blue-700",
  "quero-ler": "bg-yellow-100 text-yellow-700",
}


export function BookCard({  book, onDelete, onEdit }: BookCardProps) {
   
    

  return (
      <div className="group relative">
      {/* AÇÕES */}
      <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => onEdit(book)}
          className="p-1 rounded bg-white shadow hover:bg-slate-100"
        >
          <Pencil size={14} />
        </button>

        <button
          onClick={() => onDelete(book.id)}
          className="p-1 rounded bg-white shadow hover:bg-red-100 text-red-600"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* CAPA */}
      <div className="aspect-[2/3] w-full overflow-hidden rounded-md bg-muted shadow-sm group-hover:shadow-lg transition">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
            Sem capa
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="mt-2 space-y-0.5">
        <p className="text-sm font-medium line-clamp-2">{book.title}</p>
        <p className="text-xs text-muted-foreground">{book.author}</p>
      </div>
    </div>
  )
}

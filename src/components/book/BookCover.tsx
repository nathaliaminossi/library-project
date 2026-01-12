import { useState } from "react"
import { ImageIcon, Loader2 } from "lucide-react"
import type { Book } from "../../types/book"

export function BookCover({ book }: { book: Book }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  if (!book.image) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <ImageIcon size={16} />
        <span className="text-xs">Sem capa</span>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {loading && !error && (
        <Loader2 className="animate-spin text-muted-foreground" size={20} />
      )}

      {error && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <ImageIcon size={16} />
          <span className="text-xs">Erro ao carregar</span>
        </div>
      )}

      <img
        src={book.image}
        alt="Capa do livro"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false)
          setError(true)
        }}
        className={`absolute inset-0 w-full h-full object-cover rounded transition-opacity ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  )
}

import {
  Pencil,
  Trash2,
  User,
  LucideTag,
  Tags,
  BookOpen,
  Tag,
} from "lucide-react";
import type { Book } from "../../types/book";
import { EditBookForm } from "./BookForm";
import { bookService } from "../../api/services/book-service";
import { toast } from "sonner";
import { LabelFormAdd } from "../label/LabelForm";
import type { Label } from "../../types/label";
import { getColors } from "../../utils/labelColors";
import { labelService } from "../../api/services/label-services";
import { BookCover } from "./BookCover";

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
  onEdit: (book: Book) => void;
  userLabels: Label[];
}

export function BookCard({
  book,
  onDelete,
  onEdit,
  userLabels,
}: BookCardProps) {
  async function handleDelete(idBook: number) {
    try {
      await bookService.delete(idBook);
      toast.success("Successo ao deletar o livro");
    } catch {
      toast.error("Erro ao deletar o livro");
    }
  }

  return (
    <div className="group  relative">
      {/* Card container */}
      <div
        className="
          relative overflow-hidden rounded-2xl
          border border-border/60 bg-zinc-200
          shadow-sm transition
          hover:-translate-y-0.5 hover:shadow-xl
          min-h-[600px]
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
          </EditBookForm>

          <LabelFormAdd
            onAdd={() => {
              onEdit(book);
            }}
            idBook={book.idBook!}
            labels={userLabels}
          >
            <button
              className="
              inline-flex items-center justify-center
              h-8 w-8 rounded-xl
              bg-background/80 backdrop-blur
              border border-border/60
              shadow-sm
              hover:bg-purple-50 hover:border-purple-200
              transition
            "
              aria-label="Excluir livro"
              title="Excluir"
            >
              <LucideTag size={15} className="text-purple-500" />
            </button>
          </LabelFormAdd>

          <button
            onClick={async () => {
              await handleDelete(book.idBook as number);
              onDelete(String((book as Book).idBook));
            }}
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
           <BookCover book={book}/>
          </div>

       
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-50px_60px_-40px_rgba(0,0,0,0.45)]" />
          {book.labels!.length > 0 ? (
            <div className="absolute left-2 top-2">
              <span
                className="
                  inline-flex items-center gap-1
                  rounded-full px-2 py-1
                  text-[11px] font-medium
                  bg-violet-600/40 text-white backdrop-blur
                  border border-border/60
                "
              >
                <Tags size={12} />
                {book.labels!.length}
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

          <div className="mt-1">
            <div
              className="
              inline-flex items-center gap-1.5
              rounded-md px-2 py-0.5
              bg-yellow-500/15 text-yellow-700
              border border-yellow-500/30
              text-[11px] font-medium
              "
            >
              <BookOpen size={13} />
              <span>{book.category}</span>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              {book.labels!.length > 0 &&
                book.labels!.map((l) => (
                  <div
                    key={l.idLabel}
                    className={`
                    ${getColors(l.idLabel as number)}
                    relative
                    inline-flex items-center justify-center
                    rounded-md px-3 py-1
                    text-[9px] font-medium uppercase
                    text-white
                    cursor-pointer
                    transition-all duration-200
                    hover:scale-[1.04] hover:brightness-110
                    active:scale-100
                    gap-1
                  `}
                  >
                    <div className="absolute w-full h-full opacity-0 hover:opacity-100 -top-2 left-0">
                      <button
                        onClick={async () => {
                          await labelService.removeLabel(l.idLabel!, book.idBook!)
                          onEdit(book)
                        }}
                        className="
                        cursor-pointer

                          inline-flex items-center justify-center
                          h-4 w-4 rounded-xl
                          bg-background/80 backdrop-blur
                          border border-border/60
                          shadow-sm
                          hover:bg-red-50 hover:border-red-200
                          transition
                        "
                        aria-label="Excluir livro"
                        title="Excluir"
                      >
                        <Trash2 size={12} className="text-red-600/50" />
                      </button>
                    </div>
                    <Tag size={14} /> <span className="truncate">{l.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from  '../ui/dialog'
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import type { Book } from "../../types/book"

interface BookFormProps {
  onAddBook: (book: Book) => void
}

export function BookForm({ onAddBook }: BookFormProps) {

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [genre, setGenre] = useState("")
  const [status, setStatus] = useState("")
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    setCoverPreview(previewUrl)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newBook = {
      id: crypto.randomUUID(),
      title,
      author,
      genre,
      status,
      coverUrl: coverPreview ?? undefined,
    }

  onAddBook(newBook)
 
    setOpen(false)
    setTitle("")
    setAuthor("")
    setGenre("")
    setStatus("")
    setCoverPreview(null)
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar livro</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo livro</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Capa */}
          <div className="space-y-2">
            <Label>Capa</Label>
            <div className="flex items-center gap-4">
              <div className="h-32 w-24 bg-muted rounded flex items-center justify-center overflow-hidden">
                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Sem capa
                  </span>
                )}
              </div>

              <Input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
              />
            </div>
          </div>

          {/* Título */}
          <div className="space-y-1">
            <Label>Título</Label>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Dom Casmurro"
              required
            />
          </div>

          {/* Autor */}
          <div className="space-y-1">
            <Label>Autor</Label>
            <Input
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Machado de Assis"
              required
            />
          </div>

          {/* Gênero */}
          <div className="space-y-1">
            <Label>Gênero</Label>
            <Input
              value={genre}
              onChange={e => setGenre(e.target.value)}
              placeholder="Clássico"
              required
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lendo">Lendo</SelectItem>
                <SelectItem value="lido">Lido</SelectItem>
                <SelectItem value="quero-ler">Pretendo ler</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

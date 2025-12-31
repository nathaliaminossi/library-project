import { useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
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
import { Plus } from "lucide-react"

interface BookFormProps {
  onAddBook: (book: Book) => void
}

export function BookForm({ onAddBook }: BookFormProps) {

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [genre, setGenre] = useState("")
  const [status, setStatus] = useState("")
  const [edition, setEdition] = useState("")
  const [volume, setVolume] = useState("")
  const [publisher, setPublisher] = useState("")
  const [category, setCategory] = useState("")
  const [publicationDate, setPublicationDate] = useState("")
  const [image, setImage] = useState("")

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
      edition,
      volume,
      publisher,
      category,
      publicationDate,
      image,
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
    setEdition("")
    setVolume("")
    setPublisher("")
    setCategory("")
    setPublicationDate("")
    setImage("")
    setCoverPreview(null)
  }


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild >
        <Button className=" bg-indigo-950/80  transition-color " >   <Plus size={16} />Adicionar livro</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md
    bg-white/95
    backdrop-blur-md
    rounded-2xl
    shadow-2xl
    border border-indigo-100
     ">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-semibold text-indigo-950 flex items-center gap-2">
            <Plus size={18} />
            Novo livro
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Preencha as informações do livro
          </p>
        </DialogHeader>


        <form onSubmit={handleSubmit} className="space-y-4 ">
          {/* Capa */}
          <div className="space-y-2">
            <Label>Capa</Label>
            <div className="flex items-center gap-4 ">
              <div className="h-32 w-24 bg-muted rounded flex items-center justify-center overflow-hidden">
                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="Preview"
                    className="h-full w-full object-cover "
                  />
                ) : (
                  <span className="text-xs text-muted-foreground ">
                    Sem capa
                  </span>
                )}
              </div>

              <Input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="rounded-xl bg-muted/50 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Título */}
          <div className="space-y-1">
            <Label>Título</Label>
            <Input
              className="rounded-xl bg-muted/50 focus:bg-white transition"

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
              className="rounded-xl bg-muted/50 focus:bg-white transition"

              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Machado de Assis"
              required
            />
          </div>
          <div className="space-y-1">
            <Label>Autor</Label>
            <Input
              className="rounded-xl bg-muted/50 focus:bg-white transition"

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
              className="rounded-xl bg-muted/50 focus:bg-white transition"

            />
          </div>

          {/* Status */}
          <div className="space-y-1 rounded-xl bg-muted/50 focus:bg-white transition">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="rounded-xl bg-muted/50 focus:bg-white">
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
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              className="text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>

            <Button className="bg-indigo-950 hover:bg-indigo-900">
              Salvar
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  )
}

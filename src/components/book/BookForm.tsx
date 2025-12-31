import { useMemo, useState, type ReactNode } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
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
import {
  Plus,
  BookOpen,
  User,
  Tag,
  BadgeCheck,
  Building2,
  Calendar,
  Hash,
  Image as ImageIcon,
  UploadCloud,
  Library,
  Layers,
} from "lucide-react"
import { bookService } from "../../api/services/book-service"
import { toast } from "sonner"

interface BookFormProps {
  onAddBook: (book: Book) => void
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[12px] text-indigo-950/80">{label}</Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-indigo-950/45">
          <Icon size={16} />
        </span>
        {children}
      </div>
    </div>
  )
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
  const [isbn, setIsbn] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  const coverHint = useMemo(() => {
    if (coverPreview) return "Pré-visualização"
    return "Sem capa"
  }, [coverPreview])

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFile(file)

    const previewUrl = URL.createObjectURL(file)
    setCoverPreview(previewUrl)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newBook: Book = {
      title,
      author,
      edition,
      volume,
      publisher,
      category,
      publicationDate,
      image,
    }


    try {
      await bookService.create(newBook)
      toast.success("Livro adicionado com sucesso")
      onAddBook(newBook)
    }
    
    catch {
      toast.error("merda");
    }

    

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
    setIsbn("")
    setCoverPreview(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-950/85 hover:bg-indigo-950 text-white shadow-sm hover:shadow transition">
          <Plus size={16} />
          Adicionar livro
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          sm:max-w-2xl
          bg-white/95 backdrop-blur-md
          rounded-2xl
          shadow-2xl
          border border-indigo-100
        "
      >
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-semibold text-indigo-950 flex items-center gap-2">
            <BookOpen size={18} />
            Novo livro
          </DialogTitle>
          <p className="text-sm text-indigo-950/60">
            Cadastre o livro com informações completas e uma capa (opcional).
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Capa */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-indigo-950">
                <ImageIcon size={16} />
                <p className="text-sm font-medium">Capa do livro</p>
              </div>
              <span className="text-xs text-indigo-950/60">{coverHint}</span>
            </div>

            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div
                className="
                  h-36 w-28
                  rounded-xl
                  bg-white
                  border border-indigo-100
                  shadow-sm
                  overflow-hidden
                  flex items-center justify-center
                "
              >
                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-indigo-950/45">
                    <UploadCloud size={18} />
                    <span className="text-[11px]">Sem capa</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <Label className="text-[12px] text-indigo-950/80">Upload</Label>
                <div className="mt-1.5">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="
                      rounded-xl
                      bg-white
                      border-indigo-100
                      file:mr-3 file:rounded-lg file:border-0
                      file:bg-indigo-950 file:text-white
                      file:px-3 file:py-1.5
                      file:shadow-sm
                    "
                  />
                  <p className="mt-1 text-[11px] text-indigo-950/55">
                    Dica: use capa em JPG/PNG com boa resolução.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Título" icon={BookOpen}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Dom Casmurro"
                required
              />
            </Field>

            <Field label="Autor" icon={User}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Machado de Assis"
                required
              />
            </Field>

            <Field label="Gênero" icon={Tag}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Clássico"
                required
              />
            </Field>

            <div className="space-y-1.5">
              <Label className="text-[12px] text-indigo-950/80">Status</Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-indigo-950/45">
                  <BadgeCheck size={16} />
                </span>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="pl-10 rounded-xl bg-white border-indigo-100 focus:ring-indigo-200">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lendo">Lendo</SelectItem>
                    <SelectItem value="lido">Lido</SelectItem>
                    <SelectItem value="quero-ler">Pretendo ler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Field label="Editora" icon={Building2}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Companhia das Letras"
              />
            </Field>

            <Field label="Categoria" icon={Library}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Literatura Brasileira"
              />
            </Field>

            <Field label="Edição" icon={Layers}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                placeholder="1ª"
              />
            </Field>

            <Field label="Volume" icon={Layers}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="Único"
              />
            </Field>

            <Field label="Data de publicação" icon={Calendar}>
              <Input
                type="date"
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
              />
            </Field>

            <Field label="ISBN (opcional)" icon={Hash}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="9788532530783"
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="URL/Imagem (opcional)" icon={ImageIcon}>
                <Input
                  className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://... (se você quiser salvar uma url externa)"
                />
              </Field>
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] text-indigo-950/55">
              Você pode cadastrar sem ISBN e sem capa.
            </p>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                className="text-indigo-950/70 hover:text-indigo-950 hover:bg-indigo-50"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>

              <Button className="bg-indigo-950 hover:bg-indigo-900 shadow-sm">
                Salvar
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface EditBookFormProps {
  book:  Book
  children: ReactNode
  onEdit: (book: Book) => void
}

export function EditBookForm({book, children, onEdit}: EditBookFormProps ) {
  const [open, setOpen] = useState(false)

  const [title, setTitle] = useState( book.title)
  const [author, setAuthor] = useState(book.author)
  const [genre, setGenre] = useState(book.gender)
  const [status, setStatus] = useState<string>(book.gender ?? "")
  const [edition, setEdition] = useState(book.edition )
  const [volume, setVolume] = useState(book.volume )
  const [publisher, setPublisher] = useState(book.publisher )
  const [category, setCategory] = useState(book.category )
  const [publicationDate, setPublicationDate] = useState(book.publicationDate )
  const [image, setImage] = useState("")
  const [isbn, setIsbn] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  const coverHint = useMemo(() => {
    if (coverPreview) return "Pré-visualização"
    return "Sem capa"
  }, [coverPreview])

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFile(file)

    const previewUrl = URL.createObjectURL(file)
    setCoverPreview(previewUrl)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newBook: Book = {
      title,
      author,
      edition,
      volume,
      publisher,
      category,
      publicationDate,
      image,
      gender: genre,
      status
    }


    try {
      await bookService.edit(newBook, book.idBook!)
      toast.success("Lirvo editado com sucesso")
      onEdit(book)
    }
    
    catch {
      toast.error("merda");
    }

    

    setOpen(false)

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent
        className="
          sm:max-w-2xl
          bg-white/95 backdrop-blur-md
          rounded-2xl
          shadow-2xl
          border border-indigo-100
        "
      >
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-semibold text-indigo-950 flex items-center gap-2">
            <BookOpen size={18} />
            Novo livro
          </DialogTitle>
          <p className="text-sm text-indigo-950/60">
            Cadastre o livro com informações completas e uma capa (opcional).
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Capa */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-indigo-950">
                <ImageIcon size={16} />
                <p className="text-sm font-medium">Capa do livro</p>
              </div>
              <span className="text-xs text-indigo-950/60">{coverHint}</span>
            </div>

            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div
                className="
                  h-36 w-28
                  rounded-xl
                  bg-white
                  border border-indigo-100
                  shadow-sm
                  overflow-hidden
                  flex items-center justify-center
                "
              >
                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-indigo-950/45">
                    <UploadCloud size={18} />
                    <span className="text-[11px]">Sem capa</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <Label className="text-[12px] text-indigo-950/80">Upload</Label>
                <div className="mt-1.5">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="
                      rounded-xl
                      bg-white
                      border-indigo-100
                      file:mr-3 file:rounded-lg file:border-0
                      file:bg-indigo-950 file:text-white
                      file:px-3 file:py-1.5
                      file:shadow-sm
                    "
                  />
                  <p className="mt-1 text-[11px] text-indigo-950/55">
                    Dica: use capa em JPG/PNG com boa resolução.
                  </p>
                </div>
              </div>
              
            </div>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Título" icon={BookOpen}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Dom Casmurro"
                required
              />
            </Field>

            <Field label="Autor" icon={User}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Machado de Assis"
                required
              />
            </Field>

            <Field label="Gênero" icon={Tag}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Clássico"
                required
              />
            </Field>

            <div className="space-y-1.5">
              <Label className="text-[12px] text-indigo-950/80">Status</Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-indigo-950/45">
                  <BadgeCheck size={16} />
                </span>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="pl-10 rounded-xl bg-white border-indigo-100 focus:ring-indigo-200">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lendo">Lendo</SelectItem>
                    <SelectItem value="lido">Lido</SelectItem>
                    <SelectItem value="quero-ler">Pretendo ler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Field label="Editora" icon={Building2}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Companhia das Letras"
              />
            </Field>

            <Field label="Categoria" icon={Library}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Literatura Brasileira"
              />
            </Field>

            <Field label="Edição" icon={Layers}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                placeholder="1ª"
              />
            </Field>

            <Field label="Volume" icon={Layers}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="Único"
              />
            </Field>

            <Field label="Data de publicação" icon={Calendar}>
              <Input
                type="date"
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
              />
            </Field>

            <Field label="ISBN (opcional)" icon={Hash}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="9788532530783"
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="URL/Imagem (opcional)" icon={ImageIcon}>
                <Input
                  className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://... (se você quiser salvar uma url externa)"
                />
              </Field>
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] text-indigo-950/55">
              Você pode cadastrar sem ISBN e sem capa.
            </p>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                className="text-indigo-950/70 hover:text-indigo-950 hover:bg-indigo-50"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>

              <Button className="bg-indigo-950 hover:bg-indigo-900 shadow-sm">
                Salvar
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

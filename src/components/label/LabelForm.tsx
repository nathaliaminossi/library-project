import {useState, type ReactNode} from "react"
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
  Plus,
  BookOpen,
} from "lucide-react"
import { toast } from "sonner"
import * as lb from "../../types/label"
import { labelService } from "../../api/services/label-services"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


interface BookFormProps {
  onAddLabel: (label: lb.Label) => void
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

export function LabelForm({ onAddLabel }: BookFormProps) {
  const [open, setOpen] = useState(false)

  const [name, setname] = useState("")



  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newLabel: lb.Label= {
      name,
    }

    try {
      await labelService.create(newLabel)
      toast.success("Livro adicionado com sucesso")
      onAddLabel(newLabel)
    }
    
    catch {
      toast.error("merda");
    }

    

    setOpen(false)
    setname("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"} className="bg-indigo-950/85  hover:bg-indigo-950 text-white shadow-sm hover:shadow transition">
          <Plus size={16} />
          Adicionar Label
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
            Novo Label
          </DialogTitle>

        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Capa */}
          
          {/* Campos */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nome" icon={BookOpen}>
              <Input
                className="pl-10 rounded-xl bg-white border-indigo-100 focus-visible:ring-indigo-200"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="MUDOU MINHA VIDA"
                required
              />
            </Field>

            
         
          </div>

          {/* Ações */}
          <div className="flex items-center justify-between pt-2">
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

export function LabelFormAdd({idBook, labels, children, onAdd}: {idBook: number, labels: lb.Label[], children: ReactNode, onAdd: () => void}) {
  const [open, setOpen] = useState(false)
  const [idLabel , setIdLabel] = useState<string | null>(null)
  


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

 
    if(!idLabel) return
    try {
      
      await labelService.addLabel(Number(idLabel), idBook)
      toast.success("Label adicionado com sucesso")
      onAdd()

     
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
            Anexar Label
          </DialogTitle>

        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Capa */}
          
          {/* Campos */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nome" icon={BookOpen}>
              <Select  value={idLabel || ""} onValueChange={(e) => {setIdLabel(e)}}>
                  <SelectTrigger className="pl-10 rounded-xl bg-white border-indigo-100 focus:ring-indigo-200">
                    <SelectValue placeholder="Selecione o label" />
                  </SelectTrigger>
                  <SelectContent>
                    {labels.map((l) => (
                         <SelectItem value={String(l.idLabel)}>{l.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </Field>

            
         
          </div>

          {/* Ações */}
          <div className="flex items-center justify-between pt-2">
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
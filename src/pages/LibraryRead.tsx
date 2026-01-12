import { Sparkles, TagIcon, TagsIcon } from "lucide-react";
import { useState } from "react";
import { useLabels } from "../hooks/useLabs";
import { LabelForm } from "../components/label/LabelForm";
import type { Label } from "../types/label";
import { toast } from "sonner";
import { labelService } from "../api/services/label-services";
import { getColors } from "../utils/labelColors";

export default function LibraryRead() {
  const { labels, getLabels } = useLabels();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  function handleDoubleClick(label: Label) {
    setEditingId(label.idLabel as number);
    setEditingValue(label.name);
  }

  async function saveEdit(id: number) {
    // 👉 aqui você chama sua API
    try {
      await labelService.edit({ name: editingValue }, id);
      toast.success("Sucesso ao atualizar label");
      getLabels();
    } catch {
      toast.error("error");
    }

    setEditingId(null);
  }

  return (
    <div className="">
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-14 pb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-xs text-white/70">
              <Sparkles size={14} />
               
            </div>

            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-white">
              Avalie seus livros.
              <br />
              Saiba quais merecem uma nova leitura.
            </h1>

           
          </div>
        </div>
      </section>

      {/* Filters panel */}

      <section className="relative min-h-100 z-10 mb-10">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="
        w-full rounded-2xl border border-white/10
        bg-white/5 backdrop-blur-xl
        shadow-[0_20px_70px_-35px_rgba(0,0,0,0.8)]
        p-6
      "
          >
            {/* Título */}
            <div className="mb-4  items-center justify-between">
              <h2 className="text-3xl flex items-center -mb-1  gap-2  pb-2 font-semibold text-white/70">
                <TagIcon size={24} /> Etiquetas
              </h2>

              <p className="text-white/40 max-w-100 text-xs">
                Aqui você pode criar novos labels e adicionar aos seus livros.
                Mantenha o seu gosto afiado e não perca tempo ao escolher um
                livro para reler.
              </p>

              <div className="mt-2">
                <LabelForm
                  onAddLabel={async () => {
                    await getLabels();
                  }}
                />
              </div>
            </div>

            {/* Conteúdo */}
            {labels.length > 0 ? (
              <div
                className="
            grid gap-3
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5
          "
              >
                {labels.map((l) => {
                  const isEditing = editingId === l.idLabel;

                  return (
                    <div
                      key={l.idLabel}
                      onDoubleClick={() => handleDoubleClick(l)}
                      className={`
                      ${getColors(l.idLabel as number)}
                      flex items-center justify-center
                      rounded-full px-3 py-2
                      cursor-pointer
                      text-xs font-semibold uppercase text-white
                      transition hover:scale-105 hover:brightness-110
                    `}
                    >
                      {isEditing ? (
                        <input
                          autoFocus
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={() => saveEdit(l.idLabel as number)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              saveEdit(l.idLabel as number);
                            if (e.key === "Escape") setEditingId(null);
                          }}
                          className="
                          w-full bg-transparent text-white text-xs
                          text-center outline-none
                          border-b border-white/40
                        "
                        />
                      ) : (
                        <>
                          <TagsIcon size={14} className="mr-1 shrink-0" />
                          {l.name}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Estado vazio */
              <div
                className="
          flex flex-col items-center justify-center
          py-10 text-center
        "
              >
                <TagsIcon size={28} className="mb-3 text-white/40" />
                <p className="text-sm text-white/60">
                  Você ainda não criou nenhuma label.
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Crie labels para organizar seus livros.
                </p>
              </div>
            )}
          </div>
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

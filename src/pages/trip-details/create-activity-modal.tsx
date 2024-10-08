import { Calendar, Tag, X } from "lucide-react";
import { Button } from "@components/Button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { z } from "zod";

// Esquema de validação com Zod
const createActivitySchema = z.object({
  title: z.string().min(1, "O título da atividade é obrigatório."),
  occurs_at: z.string().min(1, "A data e horário são obrigatórios."),
});

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();
  const [error, setError] = useState<string | null>(null); // Estado para mensagens de erro

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString() || "";
    const occurs_at = data.get("occurs_at")?.toString() || "";

    // Validação com Zod
    const validationResult = createActivitySchema.safeParse({
      title,
      occurs_at,
    });

    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message); // Exibe a mensagem de erro
      return;
    }

    setError(null); // Limpa o erro se a validação passar

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at,
    });

    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-slate-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button>
              <X
                className="size-5 text-slate-400"
                onClick={closeCreateActivityModal}
              />
            </button>
          </div>

          <p className="text-sm text-slate-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form className="space-y-3" onSubmit={createActivity}>
          {/* Campo de título da atividade */}
          <div className="flex h-14 items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-4">
            <Tag className="size-5 text-slate-400" />
            <input
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-slate-400"
              name="title"
              placeholder="Qual a atividade?"
            />
          </div>

          {/* Campo de data e horário */}
          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-4">
            <Calendar className="size-5 text-slate-400" />
            <input
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-slate-400"
              name="occurs_at"
              placeholder="Data e horário da atividade"
              type="datetime-local"
            />
          </div>

          {/* Exibe a mensagem de erro, se houver */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Botão de salvar */}
          <Button size="full" type="submit">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}

import { X, AtSign, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@components/Button";
import { z } from "zod";

// Esquema de validação para o email usando Zod
const emailSchema = z.object({
  email: z.string().email("Por favor, insira um email válido."),
});

interface InviteGuestsModalProps {
  closeGuestsModal: () => void;
  emailsToInvite: string[];
  addNewEmailToInvite: (
    event: FormEvent<HTMLFormElement>,
    email: string
  ) => void;
  removeEmailFromInvites: (email: string) => void;
}

export function InviteGuestsModal({
  closeGuestsModal,
  addNewEmailToInvite,
  emailsToInvite,
  removeEmailFromInvites,
}: InviteGuestsModalProps) {
  const [inputEmail, setInputEmail] = useState<string>(""); // Armazena o email digitado
  const [error, setError] = useState<string | null>(null); // Armazena o erro de validação

  // Função para validar e adicionar o novo email
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validação do email usando Zod
    const validationResult = emailSchema.safeParse({ email: inputEmail });

    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message); // Exibe o erro se a validação falhar
    } else if (emailsToInvite.includes(inputEmail)) {
      setError("Este email já foi adicionado."); // Verifica se o email já foi adicionado
    } else {
      setError(null); // Limpa o erro
      addNewEmailToInvite(event, inputEmail); // Chama a função para adicionar o email
      setInputEmail(""); // Limpa o campo de entrada
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-md bg-slate-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button>
              <X className="size-5 text-slate-400" onClick={closeGuestsModal} />
            </button>
          </div>

          <p className="text-sm text-slate-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => (
            <div
              className="flex items-center gap-2 rounded-md bg-slate-800 px-2.5 py-1.5"
              key={email}
            >
              <span className="text-slate-300">{email}</span>
              <button
                onClick={() => removeEmailFromInvites(email)}
                type="button"
              >
                <X className="size-4 text-slate-400" />
              </button>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-slate-800" />

        <form
          className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-2.5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-1 items-center gap-2 px-2">
            <AtSign className="size-5 text-slate-400" />
            <input
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-slate-400"
              name="email"
              onChange={(e) => setInputEmail(e.target.value)} // Atualiza o valor do input
              placeholder="Digite o email do convidado"
              type="email"
              value={inputEmail}
            />
          </div>

          <Button type="submit">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>

        {/* Exibe a mensagem de erro se houver */}
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}

import { User, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@components/Button";
import { z } from "zod";

// Esquema de validação usando Zod
const confirmTripSchema = z.object({
  name: z.string().min(3, "O nome é obrigatório."),
  email: z.string().email("Por favor, insira um e-mail válido."),
});

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
}: ConfirmTripModalProps) {
  const [inputName, setInputName] = useState<string>(""); // Estado para armazenar o nome
  const [inputEmail, setInputEmail] = useState<string>(""); // Estado para armazenar o email
  const [error, setError] = useState<string | null>(null); // Estado para armazenar o erro de validação

  // Função para validar e submeter o formulário
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validação com Zod
    const validationResult = confirmTripSchema.safeParse({
      name: inputName,
      email: inputEmail,
    });

    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message); // Exibe o erro se houver falha na validação
    } else {
      setError(null); // Limpa o erro
      setOwnerName(inputName); // Atualiza o estado do nome
      setOwnerEmail(inputEmail); // Atualiza o estado do email
      createTrip(event); // Chama a função de criação da viagem
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-slate-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button>
              <X
                className="size-5 text-slate-400"
                onClick={closeConfirmTripModal}
              />
            </button>
          </div>

          <p className="text-sm text-slate-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-slate-100">
              Florianópolis, Brasil
            </span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-slate-100">
              16 a 27 de Agosto de 2024
            </span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Campo de nome */}
          <div className="flex h-14 items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-4">
            <User className="size-5 text-slate-400" />
            <input
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-slate-400"
              name="name"
              onChange={(event) => setInputName(event.target.value)}
              placeholder="Seu nome completo"
              type="text"
              value={inputName}
            />
          </div>

          {/* Campo de email */}
          <div className="flex h-14 items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-4">
            <User className="size-5 text-slate-400" />
            <input
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-slate-400"
              name="email"
              onChange={(event) => setInputEmail(event.target.value)}
              placeholder="Seu e-mail pessoal"
              type="email"
              value={inputEmail}
            />
          </div>

          {/* Botão de envio */}
          <Button size="full" type="submit">
            Confirmar criação da viagem
          </Button>

          {/* Exibe a mensagem de erro, se houver */}
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}

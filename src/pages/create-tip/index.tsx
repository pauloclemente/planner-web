import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date";
import { InviteGuestsStep } from "./steps/invite-guests";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();
  const [destination, setDestination] = useState("");
  const [error, setError] = useState<string | null>(null); // Estado de erro

  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await api.post("/trips", {
      destination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;

    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-pattern bg-center bg-no-repeat">
      <div className="w-full max-w-3xl space-y-10 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img alt="blue planner" src="/logo.svg" />
          <p className="text-lg text-slate-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          {/* Componente de destino e data */}
          <DestinationAndDateStep
            closeGuestsInput={() => setIsGuestsInputOpen(false)} // Fechar a etapa de convidados
            eventStartAndEndDates={eventStartAndEndDates}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={() => setIsGuestsInputOpen(true)} // Abrir a etapa de convidados
            setDestination={setDestination} // Atualiza o estado do destino
            setError={setError} // Função para capturar os erros de validação
            setEventStartAndEndDates={setEventStartAndEndDates} // Atualiza o estado das datas
          />

          {/* Exibição de erro, se houver */}
          {error && <div className="text-sm text-red-500">{error}</div>}

          {/* Componente de convidados só abre após validação do destino e datas */}
          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={() => setIsConfirmTripModalOpen(true)} // Abrir modal de confirmação
              openGuestsModal={() => setIsGuestsModalOpen(true)} // Abrir modal de convidados
              setError={setError} // Função para capturar erros de validação
            />
          )}
        </div>

        <p className="text-sm text-slate-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br />
          com nossos{" "}
          <a className="text-slate-300 underline" href="/">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-slate-300 underline" href="/">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {/* Modal para convidar novos emails */}
      {isGuestsModalOpen && (
        <InviteGuestsModal
          addNewEmailToInvite={(event) => {
            event.preventDefault(); // Evitar que o formulário faça o refresh da página
            const data = new FormData(event.currentTarget);
            const email = data.get("email")?.toString();

            if (email && !emailsToInvite.includes(email)) {
              setEmailsToInvite((prevEmails) => [...prevEmails, email]); // Adiciona o email ao estado
            }

            event.currentTarget.reset();
          }}
          closeGuestsModal={() => setIsGuestsModalOpen(false)} // Fechar o modal de convidados
          emailsToInvite={emailsToInvite} // Lista de convidados atual
          removeEmailFromInvites={(emailToRemove) =>
            setEmailsToInvite(
              emailsToInvite.filter((email) => email !== emailToRemove)
            )
          }
        />
      )}

      {/* Modal de confirmação da viagem */}
      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={() => setIsConfirmTripModalOpen(false)} // Fechar o modal de confirmação
          createTrip={createTrip} // Função para criar a viagem
          setOwnerEmail={setOwnerEmail} // Atualiza o email do proprietário
          setOwnerName={setOwnerName} // Atualiza o nome do proprietário
        />
      )}
    </div>
  );
}

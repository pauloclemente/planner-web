import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { Button } from "@components/Button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { z } from "zod";

const today = new Date();

const destinationAndDateSchema = z.object({
  destination: z.string().min(1, "Por favor, informe o destino da viagem."),
  eventStartAndEndDates: z
    .object({
      from: z.date({ required_error: "A data de início é obrigatória." }),
      to: z.date({ required_error: "A data de término é obrigatória." }),
    })
    .refine(
      (data) => data.from && data.to && data.from <= data.to,
      "Selecione um intervalo de datas válido."
    )
    .refine(
      (data) => data.from >= today && data.to >= today,
      "As datas devem ser iguais ou posteriores à data atual."
    ),
});

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  setError: (error: string | null) => void;
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
  setError,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [destinationInput, setDestinationInput] = useState<string>("");

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null;

  function handleValidation() {
    const validationResult = destinationAndDateSchema.safeParse({
      destination: destinationInput, // Passa o valor do destino corretamente
      eventStartAndEndDates,
    });

    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message); // Passa o erro para CreateTripPage
    } else {
      setError(null); // Limpa o erro se a validação for bem-sucedida
      setDestination(destinationInput); // Atualiza o destino no componente pai
      openGuestsInput(); // Abre o próximo passo de convidados
    }
  }

  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          className="flex-1 bg-transparent text-lg outline-none placeholder:text-zinc-400"
          disabled={isGuestsInputOpen}
          onChange={(event) => setDestinationInput(event.target.value)}
          placeholder="Para onde você vai?"
          type="text"
        />
      </div>

      <button
        className="flex w-[240px] items-center gap-2 text-left"
        disabled={isGuestsInputOpen}
        onClick={openDatePicker}
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="w-40 flex-1 text-lg text-zinc-400">
          {displayedDate || "Quando"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button>
                  <X
                    className="size-5 text-zinc-400"
                    onClick={closeDatePicker}
                  />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              onSelect={setEventStartAndEndDates}
              selected={eventStartAndEndDates}
            />
          </div>
        </div>
      )}

      <div className="h-6 w-px bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button
          onClick={() => {
            handleValidation(); // Agora a função é chamada corretamente
          }}
        >
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}

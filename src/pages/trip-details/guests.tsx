import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "@components/Button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    api
      .get(`trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div
            className="flex items-center justify-between gap-4"
            key={participant.id}
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-slate-100">
                {participant.name ?? `Convidado ${index}`}
              </span>
              <span className="block truncate text-sm text-slate-400">
                {participant.email}
              </span>
            </div>

            {participant.is_confirmed ? (
              <CheckCircle2 className="size-5 shrink-0 text-sky-400" />
            ) : (
              <CircleDashed className="size-5 shrink-0 text-slate-400" />
            )}
          </div>
        ))}
      </div>

      <Button size="full" variant="secondary">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}

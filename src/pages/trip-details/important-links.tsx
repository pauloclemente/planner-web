import { Link2, Plus } from "lucide-react";
import { Button } from "@components/Button";

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-slate-100">
              Reserva do AirBnB
            </span>
            <a
              className="block truncate text-xs text-slate-400 hover:text-slate-200"
              href="/"
            >
              https://www.airbnb.com.br/rooms/10470001139028321098312093821903812038910
            </a>
          </div>

          <Link2 className="size-5 shrink-0 text-slate-400" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-slate-100">
              Reserva do AirBnB
            </span>
            <a
              className="block truncate text-xs text-slate-400 hover:text-slate-200"
              href="/"
            >
              https://www.airbnb.com.br/rooms/10470001139028321098312093821903812038910
            </a>
          </div>

          <Link2 className="size-5 shrink-0 text-slate-400" />
        </div>
      </div>

      <Button size="full" variant="secondary">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}

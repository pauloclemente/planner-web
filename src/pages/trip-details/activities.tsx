import { CircleCheck } from "lucide-react";
import { api } from "../../lib/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api
      .get(`trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities));
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities.map((category) => {
        return (
          <div className="space-y-2.5" key={category.date}>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-slate-300">
                Dia {format(category.date, "d")}
              </span>
              <span className="text-xs text-slate-500">
                {format(category.date, "EEEE", { locale: ptBR })}
              </span>
            </div>
            {category.activities.length > 0 ? (
              <div className="space-y-2.5">
                {category.activities.map((activity) => {
                  return (
                    <div className="space-y-2.5" key={activity.id}>
                      <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-2.5 shadow-shape">
                        <CircleCheck className="size-5 text-sky-300" />
                        <span className="text-slate-100">{activity.title}</span>
                        <span className="ml-auto text-sm text-slate-400">
                          {format(activity.occurs_at, "HH:mm")}h
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

import { Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";

export type AgendaItem = {
  id: string;
  label: string;
  completed: boolean;
};

export function DailyAgenda({ items }: { items: AgendaItem[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold tracking-tight">
          Daily Agenda{" "}
          <span className="text-muted-foreground">• 2025.04.23</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {items.map((item) => (
          <div
            className="flex items-start gap-3 rounded-md border bg-muted/20 p-3"
            key={item.id}
          >
            {/* Checkbox */}
            <Checkbox checked={item.completed} className="mt-0.5" />

            {/* Label */}
            <span className="flex-1 text-sm leading-snug">{item.label}</span>

            {/* Clock icon (right aligned) */}
            <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

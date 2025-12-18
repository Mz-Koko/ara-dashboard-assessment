import { BellRing } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export type UrgentUpdate = {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
};

const priorityLabel: Record<UrgentUpdate["priority"], string> = {
  high: "High",
  low: "Low",
  medium: "Medium",
};

export function UrgentUpdatesCard({ items }: { items: UrgentUpdate[] }) {
  if (!items.length) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold tracking-tight">
          Urgent Funnel Updates
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {items.map((item) => (
          <div className="rounded-lg border bg-muted/20 p-4" key={item.id}>
            <div className="flex items-start gap-3">
              {/* Correct icon + placement */}
              <BellRing className="mt-0.5 h-4 w-4 text-muted-foreground" />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.description}
                </p>

                {/* Buttons underneath text (matches mock) */}
                <div className="mt-3 flex items-center gap-2">
                  <Badge className="h-6 px-2 text-[11px]" variant="secondary">
                    {priorityLabel[item.priority]}
                  </Badge>

                  <Button
                    className="h-6 px-3 text-xs"
                    size="sm"
                    variant="outline"
                  >
                    Send Reminder
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

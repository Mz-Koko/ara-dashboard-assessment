import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export type CalendarEvent = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
};

const HOURS = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"];

export function DailyCalendar({ events }: { events: CalendarEvent[] }) {
  return (
    <Card className="min-h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          <span>Monday, October 26</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>

        <Button size="sm" variant="secondary">
          Today
        </Button>
      </CardHeader>

      <CardContent>
        <div className="relative grid grid-cols-[50px_1fr] gap-3">
          {/* Time rail */}
          <div className="space-y-6 text-[11px] text-muted-foreground">
            {HOURS.map((hour) => (
              <div className="h-6" key={hour}>
                {hour}
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative space-y-6">
            {HOURS.map((hour) => (
              <div
                className="h-7 border-t border-dashed border-muted"
                key={hour}
              />
            ))}

            {/* Events */}
            <div className="absolute inset-x-0 top-[160px] space-y-2">
              {events.map((event) => (
                <div
                  className="rounded-md bg-muted/40 px-3 py-1"
                  key={event.id}
                >
                  <p className="text-sm font-semibold">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.startTime} – {event.endTime}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import type { Message } from "~/components/dashboard/ai-assistant-panel";
import { AIAssistantPanel } from "~/components/dashboard/ai-assistant-panel";
import type { AgendaItem } from "~/components/dashboard/daily-agenda";
import { DailyAgenda } from "~/components/dashboard/daily-agenda";
import type { CalendarEvent } from "~/components/dashboard/daily-calendar";
import { DailyCalendar } from "~/components/dashboard/daily-calendar";
import { InsightsPlaceholder } from "~/components/dashboard/insights-placeholder";
import type { UrgentUpdate } from "~/components/dashboard/urgent-updates-card";
import { UrgentUpdatesCard } from "~/components/dashboard/urgent-updates-card";

interface DashboardPageProps {
  urgentUpdates: UrgentUpdate[];
  agenda: AgendaItem[];
  calendarEvents: CalendarEvent[];
  aiMessages: Message[];
}

export function DashboardPage({
  urgentUpdates,
  agenda,
  calendarEvents,
  aiMessages,
}: DashboardPageProps) {
  return (
    <div className="w-full px-4 py-4 lg:px-6">
      <div className="h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 p-2 overflow-hidden">
        <main className="min-h-0 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <UrgentUpdatesCard items={urgentUpdates} />
            <DailyAgenda items={agenda} />
          </div>

          <DailyCalendar events={calendarEvents} />
          <InsightsPlaceholder />
        </main>

        <div className="lg:sticky lg:top-6 h-full min-h-0">
          <AIAssistantPanel messages={aiMessages} />
        </div>
      </div>
    </div>
  );
}

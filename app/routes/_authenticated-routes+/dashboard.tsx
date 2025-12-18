import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";

import { DashboardPage } from "~/components/dashboard/dashboard-page";

type DashboardLoaderData = {
  urgentUpdates: Array<{
    id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
  }>;
  agenda: Array<{
    id: string;
    label: string;
    completed: boolean;
  }>;
  calendarEvents: Array<{
    id: string;
    title: string;
    startTime: string;
    endTime: string;
  }>;
  aiMessages: Array<{
    id: string;
    role: "assistant" | "user";
    content: string;
  }>;
};

export async function loader(_: LoaderFunctionArgs) {
  const data: DashboardLoaderData = {
    agenda: [
      {
        completed: false,
        id: "a1",
        label: "Review candidate profiles for Senior Software Engineer role",
      },
      {
        completed: false,
        id: "a2",
        label: "Schedule interview with candidate “Alex Johnson”",
      },
    ],
    aiMessages: [
      {
        content: "Hello! I’m your AI assistant. How can I help today?",
        id: "m1",
        role: "assistant",
      },
      {
        content: "Show me candidates for the Senior Software Engineer role.",
        id: "m2",
        role: "user",
      },
      {
        content:
          "I’ve filtered the pipeline. Would you like a summary of the top 3?",
        id: "m2",
        role: "assistant",
      },
    ],
    calendarEvents: [
      {
        endTime: "10:00",
        id: "e1",
        startTime: "09:00",
        title: "AI Candidate Screening",
      },
      {
        endTime: "11:30",
        id: "e2",
        startTime: "10:30",
        title: "Team Sync: Q4 Agentic Features",
      },
    ],
    urgentUpdates: [
      {
        description:
          "Awaiting offer acceptance for Senior Product Manager role.",
        id: "u1",
        priority: "high",
        title: "Offer pending for Sarah Miller",
      },
    ],
  };

  return data;
}

export default function DashboardRoute() {
  const loaderData = useLoaderData() as DashboardLoaderData;

  return (
    <DashboardPage
      agenda={loaderData.agenda}
      aiMessages={loaderData.aiMessages}
      calendarEvents={loaderData.calendarEvents}
      urgentUpdates={loaderData.urgentUpdates}
    />
  );
}

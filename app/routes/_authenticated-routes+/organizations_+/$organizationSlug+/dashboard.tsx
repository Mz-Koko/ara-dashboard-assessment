import { href, useLoaderData } from "react-router";

import type { Route } from "./+types/dashboard";
import { DashboardPage } from "~/components/dashboard/dashboard-page";
import { getInstance } from "~/features/localization/i18next-middleware.server";
import { getPageTitle } from "~/utils/get-page-title.server";

export function loader({ params, context }: Route.LoaderArgs) {
  const i18n = getInstance(context);
  const t = i18n.t.bind(i18n);

  return {
    agenda: [
      {
        completed: false,
        id: "task-1",
        label: "Review AI Candidate Profiles for Senior Software Engineer Role",
      },
      {
        completed: false,
        id: "task-2",
        label: "Schedule interview with candidate Alex Johnson",
      },
    ],
    aiMessages: [
      {
        content: "Hello! I’m your AI assistant. How can I help today?",
        role: "assistant" as const,
      },
      {
        content: "Show me candidates for the Senior Software Engineer role.",
        role: "user" as const,
      },
      {
        content:
          "I've filtered the pipeline for Senior Software Engineer candidates.\n" +
          "Alice Johnson is currently in the 'Applied' stage.\n" +
          "Would you like me to summarize her profile?",
        role: "assistant" as const,
      },
    ],
    breadcrumb: {
      title: t("organizations:dashboard.breadcrumb"),
      to: href("/organizations/:organizationSlug/dashboard", {
        organizationSlug: params.organizationSlug,
      }),
    },
    calendarEvents: [
      {
        endTime: "10:00",
        id: "event-1",
        startTime: "09:00",
        title: "AI Candidate Screening",
      },
      {
        endTime: "11:30",
        id: "event-2",
        startTime: "10:30",
        title: "Team Sync: Q4 Agentic Features",
      },
    ],
    pageTitle: getPageTitle(t, "organizations:dashboard.pageTitle"),

    // ✅ add dummy data for UI
    urgentUpdates: [
      {
        description:
          "Awaiting offer acceptance for the Senior Product Manager role. Deadline: EOD.",
        id: "offer-1",
        priority: "high" as const,
        title: "Offer Pending for Sarah Miller",
      },
    ],
  };
}

export const meta: Route.MetaFunction = ({ loaderData }) => [
  { title: loaderData?.pageTitle },
];

export default function OrganizationDashboardRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <DashboardPage
      agenda={data.agenda}
      aiMessages={data.aiMessages}
      calendarEvents={data.calendarEvents}
      urgentUpdates={data.urgentUpdates}
    />
  );
}

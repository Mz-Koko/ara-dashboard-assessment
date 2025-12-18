```md
# 📊 Dashboard Feature – Architecture & Data Flow

This PR implements the **Dashboard UI** based on the provided mockup.  
The implementation focuses on layout, composition, and UX decisions, using dummy data provided via React Router loaders.

No business logic or side effects are implemented yet.

This document outlines how I would implement this feature end-to-end in a real production environment.

---

## 1. Route Structure & Data Loading

The dashboard lives under the authenticated organization scope:

`/organizations/:organizationSlug/dashboard`

In production, the route loader would be responsible for:

- Authenticating the user
- Resolving the active organization
- Fetching all dashboard data in a single request boundary

**Loader responsibilities**

```ts
export async function loader({ params, context }: LoaderArgs) {
  const user = await requireUser(context);
  const organization = await requireOrganization(params.organizationSlug);

  return {
    urgentUpdates,
    agenda,
    calendar,
    insights,
    aiContext,
  };
}

This keeps:

UI components pure
Data fetching centralized
Streaming / partial rendering possible later.

## 2. Data Model & Persistence (Prisma)

Core tables (simplified)
model Organization {
id        String
name      String
members   OrganizationMember[]
dashboard DashboardConfig?
}

model DashboardEvent {
id             String
organizationId String
type           EventType
title          String
metadata       Json
createdAt      DateTime
}

model Task {
id             String
organizationId String
title          String
completed      Boolean
dueAt          DateTime?
}

model CalendarEvent {
id             String
organizationId String
title          String
startsAt       DateTime
endsAt         DateTime
}


Each card on the dashboard maps cleanly to a bounded data source, making it easy to:

* cache independently
* evolve independently
* reuse elsewhere (notifications, insights, AI)

## 3. Urgent Updates
Source

Urgent updates would be derived, not manually created.

Examples:

* Offer pending
* Interview feedback missing
* Candidate stuck in pipeline
* Implementation approach:
* Store domain events (DashboardEvent)
* Derive urgency using business rules
* Surface only top-priority items in the dashboard
* This avoids duplicating state and keeps urgency deterministic.

4. Agenda & Calendar

The agenda and calendar intentionally overlap in purpose but serve different UX needs.

Agenda: actionable tasks (checkbox driven)
Calendar: temporal context (meetings, interviews)

In production:

Tasks would be writable (actions → mutations)
Calendar events would sync from internal scheduling or external providers
Both are read-only on this screen to reduce cognitive load.

5. AI Assistant Panel

The AI panel is treated as a contextual assistant, not a chatbot.

Data flow

Loader fetches current dashboard context
Context is summarized server-side

Prompt is constructed from:

Organization state
Active candidates
Pending actions

AI responses are streamed or cached

Important design decision

Only the conversation area scrolls.
The panel itself is height-locked to prevent page scroll and maintain focus.

This makes the assistant feel persistent and intentional.

6. Component Design Philosophy

Components are stateless
No data fetching inside components
No hidden side effects
Layout constraints enforced at the page level

This ensures:

Easy testing
Predictable rendering
Safe refactors

7. What’s intentionally missing

The following are intentionally not implemented in this PR:

* Mutations / actions
* AI service calls
* Background jobs
* Real persistence
* The goal of this exercise was to demonstrate:
* UI composition
* Layout judgment
* Data boundary design
* Product thinking under ambiguity

8. Next steps (if this were production)

Add optimistic mutations for agenda tasks
Introduce AI context cachin
Add role-aware dashboard personalization
Stream AI response
Add analytics instrumentation

Closing

This implementation prioritizes:

* clarity over cleverness
* explicit boundaries
* scalability of both UI and data flow
* The dashboard is designed to evolve without rewriting core assumptions.
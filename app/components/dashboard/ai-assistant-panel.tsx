import {
  ArrowRightCircle,
  CalendarPlus,
  FileText,
  Send,
  Sparkles,
} from "lucide-react";
import type React from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";

export type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

export function AIAssistantPanel({ messages }: { messages: Message[] }) {
  return (
    <Card className="flex h-full flex-col">
      {/* Header */}
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Sparkles className="h-4 w-4 text-muted-foreground" />
          AI Assistant
        </CardTitle>
      </CardHeader>

      {/* Body */}
      <CardContent className="flex flex-1 flex-col overflow-hidden">
        {/* Conversation (scrolls) */}
        <ScrollArea className="flex-1 pr-2">
          <div className="space-y-6 text-sm">
            {messages.map((msg) => (
              <p
                className={
                  msg.role === "assistant"
                    ? "text-muted-foreground"
                    : "font-medium"
                }
                key={msg.id}
              >
                {msg.content}
              </p>
            ))}
          </div>
        </ScrollArea>

        {/* Bottom section */}
        <div className="mt-2 space-y-3">
          {/* Input */}
          <div className="space-y-2">
            <Input placeholder="Ask me anything..." />
            <Button className="w-full" variant="secondary">
              Send
            </Button>
          </div>

          <div className="h-px w-full bg-border" />

          {/* Contextual actions */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Contextual Actions
            </p>

            <div className="space-y-2">
              <ActionRow icon={CalendarPlus} label="Schedule Interview" />
              <ActionRow icon={FileText} label="Summarize Candidate" />
              <ActionRow icon={Send} label="Send To Marketplace" />
              <ActionRow icon={ArrowRightCircle} label="Move to Next Stage" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionRow({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      className="flex w-full items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm hover:bg-muted"
      type="button"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

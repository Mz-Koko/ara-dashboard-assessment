import { BarChart3, Target } from "lucide-react";

import { Card, CardContent } from "~/components/ui/card";

export function InsightsPlaceholder() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Target className="h-6 w-6" />
          <BarChart3 className="h-6 w-6" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-semibold tracking-tight">
            Insights coming soon
          </p>
          <p className="mx-auto max-w-sm text-xs text-muted-foreground">
            This area will surface AI-generated insights based on your daily
            activity.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

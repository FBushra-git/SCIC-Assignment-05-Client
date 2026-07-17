"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/auth-client";

import { DashboardBanner } from "./dashboard-banner";
import { DashboardCharts } from "./dashboard-charts";
import {
  CurrentRoadmapWidget,
  ProgressTrackerWidget,
  QuickActionsWidget,
  RecentActivityWidget,
  SuggestionsWidget,
} from "./dashboard-widgets";
import { useDashboard } from "./use-dashboard";

function DashboardLoading() {
  return (
    <div className="section-shell animate-pulse py-8 sm:py-10 lg:py-12">
      <div className="h-80 rounded-[2rem] bg-muted" />
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="h-96 rounded-[1.75rem] bg-muted lg:col-span-2" />
        <div className="h-96 rounded-[1.75rem] bg-muted" />
        <div className="h-80 rounded-[1.75rem] bg-muted lg:col-span-3" />
      </div>
    </div>
  );
}

export function DashboardWorkspace() {
  const router = useRouter();
  const session = authClient.useSession();
  const dashboard = useDashboard(Boolean(session.data?.user));

  useEffect(() => {
    if (!session.isPending && !session.data?.user) router.replace("/login");
  }, [router, session.data?.user, session.isPending]);

  if (session.isPending || (!session.data?.user && !session.error)) return <DashboardLoading />;
  if (!session.data?.user) return <DashboardLoading />;
  if (dashboard.isPending) return <DashboardLoading />;

  if (dashboard.isError || !dashboard.data) {
    return (
      <div className="section-shell grid min-h-[65svh] place-items-center py-16">
        <div className="glass-panel max-w-lg rounded-[2rem] p-8 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertCircle aria-hidden="true" className="size-6" />
          </span>
          <h1 className="mt-5 text-2xl font-bold">Your dashboard could not be loaded</h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            {dashboard.error instanceof Error ? dashboard.error.message : "Please try again."}
          </p>
          <Button className="mt-6 h-11 rounded-xl px-5" onClick={() => void dashboard.refetch()}>
            <RefreshCw aria-hidden="true" />
            Try again
          </Button>
        </div>
      </div>
    );
  }

  const data = dashboard.data;

  return (
    <div className="section-shell py-8 sm:py-10 lg:py-12">
      <DashboardBanner data={data} />

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CurrentRoadmapWidget data={data} />
        </div>
        <ProgressTrackerWidget data={data} />
        <SuggestionsWidget suggestions={data.suggestions} />
        <QuickActionsWidget />
        <div className="lg:col-span-2">
          <RecentActivityWidget activities={data.recentActivity} />
        </div>
      </div>

      <DashboardCharts analytics={data.analytics} />
    </div>
  );
}

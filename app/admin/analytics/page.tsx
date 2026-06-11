"use client";

import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useResources } from "@/hooks/use-resources";
import { hasCompleteMetadata } from "@/lib/resources";
import { TOPICS } from "@/lib/constants";

export default function AnalyticsPage() {
  const { resources, ready } = useResources();

  if (!ready) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Loading analytics...
      </div>
    );
  }

  const chartData = resources
    .filter((r) => r.status === "published")
    .slice(0, 8)
    .map((r) => ({
      name: r.title.length > 24 ? `${r.title.slice(0, 24)}…` : r.title,
      views: r.viewCount,
      downloads: r.downloadCount,
    }));

  const topicCounts = TOPICS.map((topic) => ({
    topic,
    count: resources.filter((r) => r.topics.includes(topic)).length,
  })).sort((a, b) => b.count - a.count);

  const completeCount = resources.filter(hasCompleteMetadata).length;
  const metadataPercent = Math.round((completeCount / resources.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="mt-1 text-muted-foreground">
            Mock dashboard using seed view/download counts.
          </p>
        </div>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/admin">Back to admin</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-xl">
          <CardHeader className="pb-2">
            <CardDescription>Total resources</CardDescription>
            <CardTitle className="text-3xl">{resources.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="rounded-xl">
          <CardHeader className="pb-2">
            <CardDescription>Complete metadata</CardDescription>
            <CardTitle className="text-3xl">{metadataPercent}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {completeCount} of {resources.length} resources
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardHeader className="pb-2">
            <CardDescription>Top topic</CardDescription>
            <CardTitle className="text-xl">{topicCounts[0]?.topic}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {topicCounts[0]?.count} resources tagged
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Views & downloads by resource</CardTitle>
          <CardDescription>Published resources (mock data from seed)</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 48 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                angle={-30}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="views" fill="var(--chart-1)" name="Views" radius={[4, 4, 0, 0]} />
              <Bar
                dataKey="downloads"
                fill="var(--chart-2)"
                name="Downloads"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Resources by topic</CardTitle>
          <CardDescription>Most-tagged topics across the catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {topicCounts.map(({ topic, count }) => (
              <li
                key={topic}
                className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm"
              >
                <span>{topic}</span>
                <span className="font-medium">{count}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

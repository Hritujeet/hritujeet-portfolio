"use client"

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookOpenIcon, FolderIcon, NotebookPenIcon } from "lucide-react"

type DashboardStats = {
  blogs: number
  projects: number
  devlogs: number
}

export function SectionCards({ stats }: { stats: DashboardStats }) {
  const cards = [
    { label: "Blog posts", value: stats.blogs, icon: BookOpenIcon, detail: "Published articles" },
    { label: "Projects", value: stats.projects, icon: FolderIcon, detail: "Portfolio projects" },
    { label: "Devlogs", value: stats.devlogs, icon: NotebookPenIcon, detail: "Build updates" },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-3 lg:px-6">
      {cards.map(({ label, value, icon: Icon, detail }) => (
        <Card key={label} className="@container/card">
          <CardHeader>
            <CardDescription>{label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {value}
            </CardTitle>
            <CardAction>
              <Icon className="size-5 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            {detail}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

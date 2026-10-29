import Link from "next/link"
import { clerkClient } from "@clerk/nextjs/server"
import { FolderPlus, NotebookPen, PenLine } from "lucide-react"
import { prisma } from "@/utils/db"
import { SectionCards } from "@/components/section-cards"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardPage() {
  const [blogs, projects, devlogs, comments] = await Promise.all([
    prisma.blogPost.count(),
    prisma.project.count(),
    prisma.devlog.count(),
    prisma.comment.count(),
  ])
  const users = await (await clerkClient()).users.getCount()

  const actions = [
    { href: "/dashboard/addBlog", label: "Add blog", icon: PenLine },
    { href: "/dashboard/addProject", label: "Add project", icon: FolderPlus },
    { href: "/dashboard/addDevlog", label: "Add devlog", icon: NotebookPen },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="px-4 lg:px-6">
        <p className="text-sm text-muted-foreground">Content overview</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Welcome back</h1>
      </div>
      <SectionCards stats={{ blogs, projects, devlogs, comments, users }} />
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            {actions.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={buttonVariants({ variant: "outline", className: "justify-start" })}>
                <Icon className="mr-2 size-4" />
                {label}
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

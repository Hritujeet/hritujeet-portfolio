import Link from "next/link"
import { FolderPlus, NotebookPen, PenLine } from "lucide-react"
import { prisma } from "@/utils/db"
import { SectionCards } from "@/components/section-cards"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default async function DashboardPage() {
  const [blogs, projects, devlogs] = await Promise.all([
    prisma.blogPost.count(),
    prisma.project.count(),
    prisma.devlog.count(),
  ])

  const actions = [
    { href: "/dashboard/addBlog", label: "Add blog", icon: PenLine },
    { href: "/dashboard/addProject", label: "Add project", icon: FolderPlus },
    { href: "/dashboard/addDevlog", label: "Add devlog", icon: NotebookPen },
  ]

  return (
    <div className="flex flex-1 flex-col gap-8">
      <SectionCards stats={{ blogs, projects, devlogs }} />
      <div className="grid gap-4 px-4 sm:grid-cols-3 lg:px-6">
        {actions.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="group">
            <Card className="h-full transition-colors group-hover:border-primary/40">
              <CardContent className="flex min-h-32 flex-col justify-between gap-6 p-5">
                <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                <span className="flex items-center justify-between font-medium">
                  {label}
                  <span aria-hidden="true" className="text-muted-foreground transition-colors group-hover:text-primary">→</span>
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

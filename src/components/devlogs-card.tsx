import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/utils/utils";

type DevlogsCardProps = {
  title: string;
  content: string;
  createdAt: Date | string;
};

export function DevlogsCard({
  title,
  content,
  createdAt,
}: DevlogsCardProps) {
  return (
    <Card className="h-full border-border/70 bg-card shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {formatDate(createdAt.toString())}
        </p>
        <CardTitle className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-5 whitespace-pre-line text-sm leading-relaxed">
          {content}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

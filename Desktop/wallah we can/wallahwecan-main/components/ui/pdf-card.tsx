import Link from "next/link"
import { Card, CardContent, CardFooter } from "./card" // PHASE 1 i18n fix: normalize import
import { Button } from "./button" // PHASE 1 i18n fix: normalize import
import { FileText } from "lucide-react" // Using FileText from Lucide React
import { cn } from "../../lib/utils" // PHASE 1 i18n fix: normalize import

interface PdfCardProps {
  title: string
  description: string
  href: string
  className?: string
}

export function PdfCard({ title, description, href, className }: PdfCardProps) {
  return (
    <Card className={cn("bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <FileText className="h-8 w-8 text-orange-600 dark:text-orange-500 mr-3" />
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{title}</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          asChild
          variant="outline"
          className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 dark:border-orange-500 dark:text-orange-500 dark:hover:bg-neutral-800 bg-transparent"
        >
          <Link href={href} target="_blank" rel="noopener noreferrer">
            Lire le PDF
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

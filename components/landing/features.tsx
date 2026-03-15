import {
  BarChart3,
  Database,
  Zap,
  Users,
  Bell,
  Lock,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const features = [
  {
    icon: Database,
    title: 'Connect any data source',
    description:
      'Plug in Postgres, MySQL, BigQuery, Snowflake, or any REST API in seconds. No data engineering required.',
  },
  {
    icon: BarChart3,
    title: 'Auto-generated dashboards',
    description:
      'KRBI inspects your schema and builds sensible KPI views instantly, ready to customize.',
  },
  {
    icon: Zap,
    title: 'Real-time updates',
    description:
      'Dashboards refresh automatically. See live metrics without manual refreshes or scheduled jobs.',
  },
  {
    icon: Users,
    title: 'Team collaboration',
    description:
      'Share dashboards, leave comments, and control who sees what — all inside one workspace.',
  },
  {
    icon: Bell,
    title: 'Smart alerts',
    description:
      'Set threshold alerts on any metric and receive Slack or email notifications when targets are hit.',
  },
  {
    icon: Lock,
    title: 'Enterprise security',
    description:
      'SOC 2 compliant. Row-level security, SSO, and audit logs keep your data safe at every layer.',
  },
]

export function Features() {
  return (
    <section id="features" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to report with confidence
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built for teams that need answers fast without a dedicated data team.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader className="pb-2">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart3 } from 'lucide-react'

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Left: copy */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
            Now in public beta
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            KPI & BI reporting,{' '}
            <span className="text-primary">without the complexity</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            KRBI connects to your data sources, generates clear dashboards, and delivers
            insights your whole team can act on — in minutes, not months.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/signup">
                Start for free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">See how it works</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            No credit card required · Free plan available
          </p>
        </div>

        {/* Right: graphic */}
        <div className="flex items-center justify-center">
          <div className="relative flex h-80 w-full max-w-md items-center justify-center rounded-2xl border bg-muted/30">
            <BarChart3 className="h-32 w-32 text-muted-foreground/30" strokeWidth={1} />
            {/* Decorative cards */}
            <div className="absolute left-4 top-4 rounded-xl border bg-background px-4 py-3 shadow-sm">
              <p className="text-xs text-muted-foreground">Revenue MTD</p>
              <p className="text-lg font-semibold">$84,230</p>
              <p className="text-xs text-green-500">↑ 12.4%</p>
            </div>
            <div className="absolute bottom-4 right-4 rounded-xl border bg-background px-4 py-3 shadow-sm">
              <p className="text-xs text-muted-foreground">Active Users</p>
              <p className="text-lg font-semibold">3,182</p>
              <p className="text-xs text-green-500">↑ 8.1%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
